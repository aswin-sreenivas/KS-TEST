/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Corporate Footer
 */

import React from 'react';
import { Logo } from './Logo';
import { COMPANY_INFO, SERVICES } from '../data/company';
import { PageRoute, getRoutePath } from '../types/app';
import { preloadPageComponent } from '../utils/pageLoader';
import { Phone, Mail, MapPin, FileText, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute, hashSection?: string) => void;
}

const FOOTER_NAV_ITEMS: ReadonlyArray<{ id: PageRoute; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#343A24] text-white pt-16 pb-24 md:pb-12 border-t border-[#C6A65B]/20">
      <div className="corporate-container">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Info & Identity */}
          <div className="lg:col-span-5 space-y-4">
            <Logo variant="light" size="md" showTagline={true} />
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-md pt-1">
              {COMPANY_INFO.name} delivers multidisciplinary civil engineering, precision land surveying,
              and architectural 3D design solutions across Kerala, grounded in meticulous planning,
              structural integrity, and quality execution.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-white/75">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-[#C6A65B] shrink-0" />
                <span>
                  <strong className="text-white font-medium">GSTIN:</strong>{' '}
                  <span className="font-numeric text-[#C6A65B] font-bold">{COMPANY_INFO.gstin}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A65B] shrink-0" />
                <span>Documented Subcontract Structural Civil Experience (Tuneri, Kerala)</span>
              </div>
            </div>
          </div>

          {/* Core Services with direct section anchor links */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="font-heading text-sm font-semibold text-white tracking-wider uppercase">
              Primary Services
            </h2>
            <ul className="space-y-1 text-xs sm:text-[13px]">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href={getRoutePath('services', s.id)}
                    onMouseEnter={() => {
                      void preloadPageComponent('services');
                    }}
                    onFocus={() => {
                      void preloadPageComponent('services');
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('services', s.id);
                    }}
                    className="min-h-[44px] py-2 text-white/80 hover:text-[#C6A65B] transition-colors flex items-center gap-2 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A65B]"
                  >
                    <span className="text-[#C6A65B] font-numeric text-[11px] font-bold">
                      {s.number}
                    </span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <a
                  href={getRoutePath('projects')}
                  onMouseEnter={() => {
                    void preloadPageComponent('projects');
                  }}
                  onFocus={() => {
                    void preloadPageComponent('projects');
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('projects');
                  }}
                  className="min-h-[44px] py-2 text-white/80 hover:text-[#C6A65B] transition-colors flex items-center gap-1.5 text-left text-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A65B]"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#C6A65B]" />
                  <span>Selected Projects Archive</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="font-heading text-sm font-semibold text-white tracking-wider uppercase">
              Navigation
            </h2>
            <ul className="space-y-1 text-xs sm:text-[13px]">
              {FOOTER_NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={getRoutePath(item.id)}
                    onMouseEnter={() => {
                      void preloadPageComponent(item.id);
                    }}
                    onFocus={() => {
                      void preloadPageComponent(item.id);
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.id);
                    }}
                    className="min-h-[44px] py-2 text-white/80 hover:text-white transition-colors text-left inline-flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A65B]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Contact Info */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="font-heading text-sm font-semibold text-white tracking-wider uppercase">
              Office
            </h2>
            <div className="space-y-2.5 text-xs text-white/80">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="min-h-[44px] flex items-start gap-2.5 py-1 hover:text-[#C6A65B] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C6A65B] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-white/65 uppercase">Call</div>
                  <span className="font-numeric text-white text-[13px] font-bold">
                    {COMPANY_INFO.displayPhone}
                  </span>
                </div>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                  COMPANY_INFO.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-start gap-2.5 py-1 hover:text-[#25D366] transition-colors"
              >
                <div className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5 flex items-center justify-center font-bold text-xs">
                  WA
                </div>
                <div>
                  <div className="text-[10px] text-white/65 uppercase">WhatsApp</div>
                  <span className="font-numeric text-[#25D366] text-[13px] font-bold">
                    {COMPANY_INFO.displayWhatsApp}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="min-h-[44px] flex items-start gap-2.5 py-1 hover:text-[#C6A65B] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#C6A65B] shrink-0 mt-0.5" />
                <div className="break-all">
                  <div className="text-[10px] text-white/65 uppercase">Email</div>
                  <span className="text-white">{COMPANY_INFO.email}</span>
                </div>
              </a>

              <div className="flex items-start gap-2.5 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#C6A65B] shrink-0 mt-0.5" />
                <div className="leading-relaxed text-[11px]">
                  <div className="text-[10px] text-white/65 uppercase">Address</div>
                  <span>{COMPANY_INFO.address.line1}, {COMPANY_INFO.address.landmark}</span>
                  <br />
                  <span>{COMPANY_INFO.address.postOffice}, {COMPANY_INFO.address.city} – {COMPANY_INFO.address.pincode}</span>
                  <br />
                  <span className="text-[#C6A65B]">{COMPANY_INFO.address.state}, {COMPANY_INFO.address.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/70 gap-4">
          <p className="text-center md:text-left">
            © {currentYear} <strong className="text-white font-medium">K S Associates</strong>. All rights reserved. Engineering Construction & Surveying.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px]">
            <span>GSTIN: {COMPANY_INFO.gstin}</span>
            <span aria-hidden="true" className="text-white/25">·</span>
            <span>Feroke, Calicut, Kerala</span>
            <span aria-hidden="true" className="text-white/25">·</span>
            <span>
              Website built by <strong className="text-[#C6A65B] font-medium">ShadowStack.web</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
