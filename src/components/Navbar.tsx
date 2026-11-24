/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Corporate Navigation Bar
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/company';
import { AppRoute, PageRoute, getRoutePath } from '../types/app';
import { useDialogBehavior } from '../hooks/useDialogBehavior';
import { Phone, Menu, X, MessageSquare } from 'lucide-react';

interface NavbarProps {
  currentPage: AppRoute;
  onNavigate: (page: PageRoute, hashSection?: string) => void;
  onOpenContactModal?: () => void;
}

const NAV_LINKS: ReadonlyArray<{ id: PageRoute; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenContactModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useDialogBehavior(isMobileMenuOpen, closeMobileMenu, drawerRef);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId: PageRoute) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
  };

  const isTransparent = !isScrolled && currentPage === 'home';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          isTransparent
            ? 'bg-gradient-to-b from-[#242918]/85 via-[#242918]/40 to-transparent py-3.5 sm:py-5'
            : 'bg-[#343A24] border-b border-[#C6A65B]/20 py-3 shadow-sm'
        }`}
      >
        <div className="corporate-container">
          <div className="flex items-center justify-between gap-2">
            {/* Official Logo */}
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="min-h-[44px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A65B] rounded-[2px]"
              aria-label="K S Associates – Return to Homepage"
            >
              <Logo
                variant="light"
                size={isScrolled ? 'sm' : 'md'}
                showTagline={true}
              />
            </button>

            {/* Desktop Navigation Links */}
            <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <a
                    key={link.id}
                    href={getRoutePath(link.id)}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`min-h-[44px] inline-flex items-center px-1 text-[13px] tracking-normal font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A65B] ${
                      isActive
                        ? 'text-[#C6A65B] font-semibold'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-1 shrink-0">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="min-w-[44px] min-h-[44px] p-2.5 flex items-center justify-center text-[#C6A65B] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A65B] rounded-[2px]"
                aria-label={`Call K S Associates on ${COMPANY_INFO.displayPhone}`}
                title={`Call ${COMPANY_INFO.displayPhone}`}
              >
                <Phone className="w-5 h-5" />
              </a>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-expanded={isMobileMenuOpen}
                aria-controls={isMobileMenuOpen ? 'mobile-nav-drawer' : undefined}
                className="min-w-[44px] min-h-[44px] p-2.5 flex items-center justify-center text-white hover:text-[#C6A65B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A65B] rounded-[2px]"
                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 md:hidden"
          onClick={closeMobileMenu}
        >
          <div
            id="mobile-nav-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="fixed top-0 right-0 w-[85%] max-w-sm h-full bg-[#343A24] text-white p-6 shadow-xl flex flex-col justify-between border-l border-[#C6A65B]/20 overflow-y-auto focus:outline-none"
          >
            <div>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <Logo variant="light" size="sm" showTagline={false} />
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="min-w-[44px] min-h-[44px] p-2 flex items-center justify-center text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A65B] rounded-[2px]"
                  aria-label="Close navigation"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav aria-label="Mobile Menu Links" className="space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = currentPage === link.id;
                  return (
                    <a
                      key={link.id}
                      href={getRoutePath(link.id)}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.id);
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      className={`min-h-[44px] flex items-center w-full text-left text-base font-heading py-3 transition-colors border-b border-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A65B] ${
                        isActive
                          ? 'text-[#C6A65B] font-semibold pl-3 border-l-2 border-l-[#C6A65B]'
                          : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3 text-xs text-white/80">
              <div>
                <p className="font-semibold text-white mb-0.5">Office Location:</p>
                <p>{COMPANY_INFO.address.line1}, {COMPANY_INFO.address.landmark}</p>
                <p>{COMPANY_INFO.address.city} – {COMPANY_INFO.address.pincode}</p>
              </div>

              <div className="space-y-1">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="min-h-[44px] flex items-center gap-2 text-[#C6A65B] hover:underline py-1"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>
                    Call: <strong className="font-numeric text-white">{COMPANY_INFO.displayPhone}</strong>
                  </span>
                </a>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                    COMPANY_INFO.whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center gap-2 text-[#25D366] hover:underline py-1"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>
                    WhatsApp: <strong className="font-numeric">{COMPANY_INFO.displayWhatsApp}</strong>
                  </span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  if (onOpenContactModal) {
                    onOpenContactModal();
                  } else {
                    handleNavClick('contact');
                  }
                }}
                className="min-h-[44px] w-full py-3 px-4 bg-[#C6A65B] text-[#292B27] font-semibold text-center rounded-[3px] uppercase tracking-wider text-xs hover:bg-[#DECA8D] transition-colors"
              >
                Discuss Your Project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
