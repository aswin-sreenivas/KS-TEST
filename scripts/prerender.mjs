import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const ssrEntryPath = path.join(rootDir, '.prerender-dist', 'entry-prerender.js');
const templatePath = path.join(distDir, 'index.html');

function escapeHtmlAttr(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function replaceMetaContent(html, selectorAttr, selectorName, newContent) {
  const escapedContent = escapeHtmlAttr(newContent);
  const pattern = new RegExp(
    `(<meta\\b[^>]*${selectorAttr}=["']${selectorName}["'][^>]*\\bcontent=["'])([^"']*)(["'][^>]*>)`,
    'i'
  );
  if (!pattern.test(html)) {
    throw new Error(`Missing meta tag for ${selectorAttr}="${selectorName}" in dist/index.html`);
  }
  return html.replace(pattern, `$1${escapedContent}$3`);
}

function replaceTagById(html, tag, id, attr, newValue) {
  const escaped = escapeHtmlAttr(newValue);
  const pattern = new RegExp(
    `(<${tag}\\b[^>]*id=["']${id}["'][^>]*\\b${attr}=["'])([^"']*)(["'][^>]*>)`,
    'i'
  );
  if (!pattern.test(html)) {
    throw new Error(`Missing <${tag} id="${id}"> with ${attr} attribute in dist/index.html`);
  }
  return html.replace(pattern, `$1${escaped}$3`);
}

async function main() {
  if (!fs.existsSync(templatePath)) {
    throw new Error('Client build output dist/index.html not found before prerendering.');
  }
  if (!fs.existsSync(ssrEntryPath)) {
    throw new Error('SSR build output .prerender-dist/entry-prerender.js not found.');
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf8');
  const ssrModule = await import(pathToFileURL(ssrEntryPath).href);
  const { prerenderRoute, VALID_PAGE_ROUTES } = ssrModule;

  const routeOutputPaths = {
    home: path.join(distDir, 'index.html'),
    about: path.join(distDir, 'about', 'index.html'),
    services: path.join(distDir, 'services', 'index.html'),
    projects: path.join(distDir, 'projects', 'index.html'),
    contact: path.join(distDir, 'contact', 'index.html'),
  };

  for (const route of VALID_PAGE_ROUTES) {
    const rendered = prerenderRoute(route);
    let pageHtml = templateHtml;

    pageHtml = pageHtml.replace(
      /<title>[\s\S]*?<\/title>/i,
      () => `<title>${escapeHtmlText(rendered.title)}</title>`
    );
    pageHtml = replaceMetaContent(pageHtml, 'name', 'description', rendered.description);
    pageHtml = replaceTagById(pageHtml, 'link', 'canonical-url', 'href', rendered.canonicalUrl);
    pageHtml = replaceTagById(pageHtml, 'meta', 'og-url', 'content', rendered.canonicalUrl);
    pageHtml = replaceMetaContent(pageHtml, 'property', 'og:title', rendered.title);
    pageHtml = replaceMetaContent(pageHtml, 'property', 'og:description', rendered.description);
    pageHtml = replaceMetaContent(pageHtml, 'property', 'og:image', rendered.imageUrl);
    pageHtml = replaceMetaContent(pageHtml, 'property', 'og:image:secure_url', rendered.imageUrl);
    pageHtml = replaceMetaContent(pageHtml, 'property', 'og:image:alt', rendered.imageAlt);
    pageHtml = replaceMetaContent(pageHtml, 'name', 'twitter:title', rendered.title);
    pageHtml = replaceMetaContent(pageHtml, 'name', 'twitter:description', rendered.description);
    pageHtml = replaceMetaContent(pageHtml, 'name', 'twitter:image', rendered.imageUrl);
    pageHtml = replaceMetaContent(pageHtml, 'name', 'twitter:image:alt', rendered.imageAlt);

    const safeJsonLd = rendered.jsonLdString.replace(/<\/script/gi, '<\\/script');
    pageHtml = pageHtml.replace(
      /<script id="structured-data-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/i,
      () => `<script id="structured-data-jsonld" type="application/ld+json">\n    ${safeJsonLd}\n    </script>`
    );

    if (!/<div id="root"><\/div>/i.test(pageHtml)) {
      throw new Error('Could not locate <div id="root"></div> mount point in dist/index.html.');
    }
    pageHtml = pageHtml.replace(
      /<div id="root"><\/div>/i,
      () => `<div id="root">${rendered.appHtml}</div>`
    );

    // Verify every local asset referenced in prerendered HTML exists inside dist/
    const assetMatches = pageHtml.match(/(?:href|src|srcSet)="(\/assets\/[^"]+)"/g) || [];
    for (const attrMatch of assetMatches) {
      const relPath = attrMatch.replace(/^(?:href|src|srcSet)="|"/g, '');
      const absAssetPath = path.join(distDir, relPath.slice(1));
      if (!fs.existsSync(absAssetPath)) {
        throw new Error(`Prerendered asset missing from dist/: ${relPath} (route: ${route})`);
      }
    }

    const outPath = routeOutputPaths[route];
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, pageHtml, 'utf8');
    console.log(`Prerendered /${route === 'home' ? '' : `${route}/`} -> ${path.relative(rootDir, outPath)} (${rendered.canonicalUrl})`);
  }
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
