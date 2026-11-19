/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Corporate Website Application Root (Refined Standard)
 */

import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Home } from './pages/Home';
import { PROJECTS, ProjectItem } from './data/company';
import { PageRoute, ServiceCategory, getRoutePath, parseRouteFromLocation } from './types/app';
import { ArrowUp } from 'lucide-react';
import { updatePageSeo } from './utils/seo';

const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const ProjectLightbox = lazy(() =>
  import('./components/ProjectLightbox').then((m) => ({ default: m.ProjectLightbox }))
);
const ContactModal = lazy(() =>
  import('./components/ContactModal').then((m) => ({ default: m.ContactModal }))
);

function getInitialRoute(): PageRoute {
  if (typeof window === 'undefined') return 'home';
  return parseRouteFromLocation(window.location.pathname, window.location.hash);
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialRoute);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactDefaultService, setContactDefaultService] = useState<ServiceCategory | ''>('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Synchronize browser history (popstate) and legacy hash changes
  useEffect(() => {
    const syncRoute = () => {
      setCurrentPage(parseRouteFromLocation(window.location.pathname, window.location.hash));
    };

    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  // Dynamically update document title, canonical URL, Open Graph & Twitter card metadata
  useEffect(() => {
    if (selectedProject) {
      updatePageSeo('projects', {
        title: `${selectedProject.title} | Architectural Project – K S Associates`,
        description: selectedProject.description,
        image: selectedProject.image,
      });
    } else {
      updatePageSeo(currentPage);
    }
  }, [currentPage, selectedProject]);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = useCallback((page: PageRoute) => {
    setCurrentPage(page);
    const targetPath = getRoutePath(page);
    if (window.location.pathname !== targetPath || window.location.hash) {
      try {
        window.history.pushState(null, '', targetPath);
      } catch {
        window.location.hash = page;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenContactModal = useCallback((service?: ServiceCategory) => {
    setContactDefaultService(service || '');
    setIsContactModalOpen(true);
  }, []);

  const handleCloseContactModal = useCallback(() => {
    setIsContactModalOpen(false);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Lightbox project index cycling
  const handleNextProject = useCallback(() => {
    setSelectedProject((current) => {
      if (!current || PROJECTS.length === 0) return null;
      const currentIndex = PROJECTS.findIndex((p) => p.id === current.id);
      if (currentIndex === -1) return PROJECTS[0];
      return PROJECTS[(currentIndex + 1) % PROJECTS.length];
    });
  }, []);

  const handlePrevProject = useCallback(() => {
    setSelectedProject((current) => {
      if (!current || PROJECTS.length === 0) return null;
      const currentIndex = PROJECTS.findIndex((p) => p.id === current.id);
      if (currentIndex === -1) return PROJECTS[0];
      return PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
    });
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[#F5F4EF] text-[#292B27] antialiased selection:bg-[#C6A65B] selection:text-[#292B27]">
        {/* Global Navigation */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenContactModal={() => handleOpenContactModal()}
        />

        {/* Main Content Router */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <Home
              onNavigate={handleNavigate}
              onOpenProjectModal={setSelectedProject}
              onOpenContactModal={handleOpenContactModal}
            />
          )}

          {currentPage !== 'home' && (
            <Suspense
              fallback={
                <div className="pt-40 pb-24 text-center text-xs uppercase tracking-widest text-[#77786F]">
                  Loading Section...
                </div>
              }
            >
              {currentPage === 'about' && (
                <About
                  onNavigate={handleNavigate}
                  onOpenContactModal={() => handleOpenContactModal()}
                />
              )}
              {currentPage === 'services' && (
                <Services
                  onNavigate={handleNavigate}
                  onOpenContactModal={handleOpenContactModal}
                />
              )}
              {currentPage === 'projects' && (
                <Projects
                  onOpenProjectModal={setSelectedProject}
                  onOpenContactModal={() => handleOpenContactModal()}
                />
              )}
              {currentPage === 'contact' && <Contact />}
            </Suspense>
          )}
        </main>

        {/* Corporate Footer */}
        <Footer onNavigate={handleNavigate} />

        {/* Floating WhatsApp Action Button */}
        <WhatsAppButton />

        {/* Back to Top Button with 2px radius and restrained styling */}
        {showBackToTop && (
          <button
            type="button"
            onClick={handleScrollToTop}
            className="fixed bottom-6 left-6 z-40 w-9 h-9 rounded-[2px] bg-[#343A24] text-[#C6A65B] border border-[#C6A65B]/30 flex items-center justify-center hover:bg-[#242918] transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A65B]"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Interactive Project Lightbox with Drawings & 3D Sheets */}
        {selectedProject && (
          <Suspense fallback={null}>
            <ProjectLightbox
              project={selectedProject}
              onClose={handleCloseLightbox}
              onNavigateNext={handleNextProject}
              onNavigatePrev={handlePrevProject}
            />
          </Suspense>
        )}

        {/* Global Quick Contact & Consultation Modal */}
        {isContactModalOpen && (
          <Suspense fallback={null}>
            <ContactModal
              isOpen={isContactModalOpen}
              onClose={handleCloseContactModal}
              defaultService={contactDefaultService}
            />
          </Suspense>
        )}
      </div>
    </ErrorBoundary>
  );
}
