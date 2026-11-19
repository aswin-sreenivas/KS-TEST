/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Static Prerender Entry Point for Independent Page HTML Generation
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { PageRoute, VALID_PAGE_ROUTES } from './types/app';
import { buildPageJsonLd, getPageSeoConfig } from './utils/seo';

const noop = () => {};

export { VALID_PAGE_ROUTES };

export function prerenderRoute(route: PageRoute) {
  const { config, canonicalUrl, absoluteImageUrl } = getPageSeoConfig(route);
  const jsonLd = buildPageJsonLd(route);

  const appHtml = renderToString(
    <div className="min-h-screen flex flex-col bg-[#F5F4EF] text-[#292B27] antialiased selection:bg-[#C6A65B] selection:text-[#292B27]">
      <Navbar currentPage={route} onNavigate={noop} onOpenContactModal={noop} />
      <main className="flex-1">
        {route === 'home' && (
          <Home onNavigate={noop} onOpenProjectModal={noop} onOpenContactModal={noop} />
        )}
        {route === 'about' && <About onNavigate={noop} onOpenContactModal={noop} />}
        {route === 'services' && <Services onNavigate={noop} onOpenContactModal={noop} />}
        {route === 'projects' && (
          <Projects onOpenProjectModal={noop} onOpenContactModal={noop} />
        )}
        {route === 'contact' && <Contact />}
      </main>
      <Footer onNavigate={noop} />
      <WhatsAppButton />
    </div>
  );

  return {
    route,
    appHtml,
    title: config.title,
    description: config.description,
    canonicalUrl,
    imageUrl: absoluteImageUrl,
    imageAlt: config.imageAlt,
    jsonLdString: JSON.stringify(jsonLd),
  };
}
