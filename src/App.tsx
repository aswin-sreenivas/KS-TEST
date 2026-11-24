/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Corporate Website Application Root
 */

import React, { useState, useEffect, useCallback, Suspense, lazy, startTransition } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Home } from './pages/Home';
import { PROJECTS, ProjectItem } from './data/company';
import {
  AppRoute,
  PageRoute,
  ServiceCategory,
  getRoutePath,
  parseProjectIdFromPathname,
  parseRouteFromLocation,
} from './types/app';
import { ArrowUp } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { updatePageSeo } from './utils/seo';
import { getLoadedPageComponent, preloadPageComponent } from './utils/pageLoader';

const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));
const ProjectLightbox = lazy(() =>
  import('./components/ProjectLightbox').then((m) => ({ default: m.ProjectLightbox }))
);
const ContactModal = lazy(() =>
  import('./components/ContactModal').then((m) => ({ default: m.ContactModal }))
);

function resolveInitialLocation(): { route: AppRoute; project: ProjectItem | null } {
  if (typeof window === 'undefined') {
    return { route: 'home', project: null };
  }
  const projectSlug = parseProjectIdFromPathname(window.location.pathname);
  if (projectSlug) {
    const matched = PROJECTS.find((p) => p.id === projectSlug);
    if (matched) {
      return { route: 'projects', project: matched };
    }
    return { route: 'not-found', project: null };
  }
  return {
    route: parseRouteFromLocation(window.location.pathname, window.location.hash),
    project: null,
  };
}

function scrollToSectionWithRetry(sectionId: string, attemptsLeft = 10) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  if (attemptsLeft > 0) {
    window.setTimeout(() => scrollToSectionWithRetry(sectionId, attemptsLeft - 1), 80);
  }
}

export default function App() {
  const [initialState] = useState(resolveInitialLocation);
  const [currentPage, setCurrentPage] = useState<AppRoute>(initialState.route);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(initialState.project);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactDefaultService, setContactDefaultService] = useState<ServiceCategory | ''>('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Synchronize browser history (popstate) and hash changes
  useEffect(() => {
    const applyRouteState = (next: { route: AppRoute; project: ProjectItem | null }) => {
      startTransition(() => {
        setCurrentPage(next.route);
        setSelectedProject(next.project);
      });

      const hashId = window.location.hash.replace(/^#/, '');
      if (next.route === 'services' && hashId) {
        scrollToSectionWithRetry(hashId);
      }
    };

    const syncRoute = () => {
      const next = resolveInitialLocation();
      if (next.route !== 'home' && !getLoadedPageComponent(next.route)) {
        void preloadPageComponent(next.route).finally(() => applyRouteState(next));
        return;
      }
      applyRouteState(next);
    };

    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  // Dynamically update document title, canonical URL, robots directives, OG & Twitter metadata
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

  const handleNavigate = useCallback((page: PageRoute, hashSection?: string) => {
    const commitNavigation = () => {
      startTransition(() => {
        setSelectedProject(null);
        setCurrentPage(page);
      });
      const targetPath = getRoutePath(page, hashSection);
      const currentFull = `${window.location.pathname}${window.location.hash}`;

      if (currentFull !== targetPath) {
        try {
          window.history.pushState(null, '', targetPath);
        } catch {
          window.location.hash = hashSection || page;
        }
      }

      if (hashSection) {
        scrollToSectionWithRetry(hashSection);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    if (page !== 'home' && !getLoadedPageComponent(page)) {
      void preloadPageComponent(page).finally(commitNavigation);
      return;
    }

    commitNavigation();
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
    if (parseProjectIdFromPathname(window.location.pathname)) {
      try {
        window.history.pushState(null, '', getRoutePath('projects'));
      } catch {
        // Ignore history errors in restricted frames
      }
    }
  }, []);

  const handleEnquireFromLightbox = useCallback(
    (project: ProjectItem) => {
      setSelectedProject(null);
      if (project.category === 'construction') {
        setContactDefaultService('Construction');
      } else if (project.category === 'survey') {
        setContactDefaultService('Survey');
      } else {
        setContactDefaultService('3D Design');
      }
      handleNavigate('contact');
    },
    [handleNavigate]
  );

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
      <div className="min-h-screen flex flex-col bg-[#F5F4EF] text-[#292B27] antialiased selection:bg-[#C6A65B] selection:text-[#292B27] overflow-x-clip">
        {/* Skip to Main Content Accessibility Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2.5 focus:bg-[#C6A65B] focus:text-[#292B27] focus:font-semibold focus:text-xs focus:uppercase focus:tracking-wider focus:rounded-[3px] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#343A24]"
        >
          Skip to main content
        </a>

        {/* Global Navigation */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenContactModal={() => handleOpenContactModal()}
        />

        {/* Main Content Router */}
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {currentPage === 'home' && (
            <Home
              onNavigate={handleNavigate}
              onOpenProjectModal={setSelectedProject}
              onOpenContactModal={handleOpenContactModal}
            />
          )}

          {currentPage !== 'home' && (() => {
            const PreloadedAbout = getLoadedPageComponent('about');
            const PreloadedServices = getLoadedPageComponent('services');
            const PreloadedProjects = getLoadedPageComponent('projects');
            const PreloadedContact = getLoadedPageComponent('contact');
            const PreloadedNotFound = getLoadedPageComponent('not-found');

            if (currentPage === 'about' && PreloadedAbout) {
              return (
                <PreloadedAbout
                  onNavigate={handleNavigate}
                  onOpenContactModal={() => handleOpenContactModal()}
                />
              );
            }
            if (currentPage === 'services' && PreloadedServices) {
              return (
                <PreloadedServices
                  onNavigate={handleNavigate}
                  onOpenContactModal={handleOpenContactModal}
                  onOpenProjectModal={setSelectedProject}
                />
              );
            }
            if (currentPage === 'projects' && PreloadedProjects) {
              return (
                <PreloadedProjects
                  onOpenProjectModal={setSelectedProject}
                  onOpenContactModal={() => handleOpenContactModal()}
                  onNavigate={handleNavigate}
                />
              );
            }
            if (currentPage === 'contact' && PreloadedContact) {
              return <PreloadedContact />;
            }
            if (currentPage === 'not-found' && PreloadedNotFound) {
              return <PreloadedNotFound onNavigate={handleNavigate} />;
            }

            return (
              <Suspense
                fallback={
                  <div className="min-h-[85vh] pt-40 pb-24 text-center text-xs uppercase tracking-widest text-[#595B53]">
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
                    onOpenProjectModal={setSelectedProject}
                  />
                )}
                {currentPage === 'projects' && (
                  <Projects
                    onOpenProjectModal={setSelectedProject}
                    onOpenContactModal={() => handleOpenContactModal()}
                    onNavigate={handleNavigate}
                  />
                )}
                {currentPage === 'contact' && <Contact />}
                {currentPage === 'not-found' && <NotFound onNavigate={handleNavigate} />}
              </Suspense>
            );
          })()}
        </main>

        {/* Corporate Footer */}
        <Footer onNavigate={handleNavigate} />

        {/* Floating WhatsApp Action Button */}
        <WhatsAppButton />

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            type="button"
            onClick={handleScrollToTop}
            className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 min-w-[44px] min-h-[44px] w-11 h-11 rounded-[2px] bg-[#343A24] text-[#C6A65B] border border-[#C6A65B]/35 flex items-center justify-center hover:bg-[#242918] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A65B]"
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
              onEnquireProject={handleEnquireFromLightbox}
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
        {/* Vercel Speed Insights (React / Vite) */}
        <SpeedInsights
          route={currentPage === 'not-found' ? '/404' : getRoutePath(currentPage)}
        />
      </div>
    </ErrorBoundary>
  );
}
