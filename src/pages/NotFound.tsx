/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – 404 Page Not Found View
 */

import React from 'react';
import { PageRoute, getRoutePath } from '../types/app';
import { ArrowLeft, Home, Mail, Compass } from 'lucide-react';

interface NotFoundProps {
  onNavigate?: (page: PageRoute) => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigate }) => {
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: PageRoute
  ) => {
    if (onNavigate) {
      event.preventDefault();
      onNavigate(page);
    }
  };

  return (
    <div className="w-full pt-28 pb-24">
      <section className="bg-[#343A24] text-white py-16 sm:py-20 mb-14 border-b border-[#C6A65B]/20">
        <div className="corporate-container">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#C6A65B]">
              <Compass className="w-4 h-4" />
              <span>Error 404 · Route Unavailable</span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-heading font-semibold text-white tracking-tight">
              Page Not Found
            </h1>
            <p className="text-base text-white/85 leading-relaxed">
              The page or project link you requested could not be found on K S Associates.
            </p>
          </div>
        </div>
      </section>

      <div className="corporate-container">
        <div className="max-w-2xl bg-white p-8 sm:p-10 rounded-[2px] border border-[#292B27]/12 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-[#343A24]">
              Where would you like to go next?
            </h2>
            <p className="text-sm text-[#4A4D46] leading-relaxed">
              The URL may have changed or been mistyped. Return to our homepage to explore our construction, land surveying, and 3D architectural design services, or reach our engineering office directly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={getRoutePath('home')}
              onClick={(e) => handleLinkClick(e, 'home')}
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#343A24] text-[#C6A65B] hover:bg-[#242918] font-semibold text-xs uppercase tracking-wider rounded-[3px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </a>

            <a
              href={getRoutePath('contact')}
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F5F4EF] text-[#292B27] hover:bg-[#ECEAE2] border border-[#292B27]/15 font-semibold text-xs uppercase tracking-wider rounded-[3px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
            >
              <Mail className="w-4 h-4 text-[#C6A65B]" />
              <span>Contact Our Office</span>
            </a>

            <a
              href={getRoutePath('projects')}
              onClick={(e) => handleLinkClick(e, 'projects')}
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 text-[#343A24] hover:text-[#C6A65B] font-semibold text-xs uppercase tracking-wider rounded-[3px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>View Projects</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
