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
import { NotFound } from './pages/NotFound';
import { AppRoute, VALID_PAGE_ROUTES } from './types/app';
import {
  IS_STAGING,
  OFFICIAL_SITE_ORIGIN,
  buildPageJsonLd,
  getPageSeoConfig,
} from './utils/seo';

const noop = () => {};

export { VALID_PAGE_ROUTES, IS_STAGING, OFFICIAL_SITE_ORIGIN };

export function prerenderRoute(route: AppRoute) {
  const { config, canonicalUrl, absoluteImageUrl, robotsContent } = getPageSeoConfig(route);
  const jsonLd = buildPageJsonLd(route);

  const appHtml = renderToString(
    <div className="min-h-screen flex flex-col bg-[#F5F4EF] text-[#292B27] antialiased selection:bg-[#C6A65B] selection:text-[#292B27] overflow-x-clip">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2.5 focus:bg-[#C6A65B] focus:text-[#292B27] focus:font-semibold focus:text-xs focus:uppercase focus:tracking-wider focus:rounded-[3px] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#343A24]"
      >
        Skip to main content
      </a>
      <Navbar currentPage={route} onNavigate={noop} onOpenContactModal={noop} />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {route === 'home' && (
          <Home onNavigate={noop} onOpenProjectModal={noop} onOpenContactModal={noop} />
        )}
        {route === 'about' && <About onNavigate={noop} onOpenContactModal={noop} />}
        {route === 'services' && <Services onNavigate={noop} onOpenContactModal={noop} />}
        {route === 'projects' && (
          <Projects onOpenProjectModal={noop} onOpenContactModal={noop} onNavigate={noop} />
        )}
        {route === 'contact' && <Contact />}
        {route === 'not-found' && <NotFound onNavigate={noop} />}
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
    robotsContent,
    jsonLdString: JSON.stringify(jsonLd),
  };
}
