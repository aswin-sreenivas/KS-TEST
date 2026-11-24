/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Synchronous Route Component Registry & Preloader
 */

import type { ComponentType } from 'react';
import { AppRoute, PageRoute } from '../types/app';
import { ProjectItem } from '../data/company';
import { ServiceCategory } from '../types/app';

export interface AboutModuleProps {
  onNavigate: (page: PageRoute, hashSection?: string) => void;
  onOpenContactModal: () => void;
}

export interface ServicesModuleProps {
  onNavigate: (page: PageRoute, hashSection?: string) => void;
  onOpenContactModal: (service?: ServiceCategory) => void;
  onOpenProjectModal?: (project: ProjectItem) => void;
}

export interface ProjectsModuleProps {
  onOpenProjectModal: (project: ProjectItem) => void;
  onOpenContactModal: () => void;
  onNavigate?: (page: PageRoute, hashSection?: string) => void;
}

export interface NotFoundModuleProps {
  onNavigate?: (page: PageRoute) => void;
}

type LazyRouteKey = Exclude<AppRoute, 'home'>;

const loadedComponents: Partial<{
  about: ComponentType<AboutModuleProps>;
  services: ComponentType<ServicesModuleProps>;
  projects: ComponentType<ProjectsModuleProps>;
  contact: ComponentType<Record<string, never>>;
  'not-found': ComponentType<NotFoundModuleProps>;
}> = {};

const pendingLoads = new Map<LazyRouteKey, Promise<void>>();

export function getLoadedPageComponent<K extends LazyRouteKey>(route: K) {
  return loadedComponents[route];
}

export function preloadPageComponent(route: AppRoute): Promise<void> {
  if (route === 'home' || loadedComponents[route]) {
    return Promise.resolve();
  }

  const existing = pendingLoads.get(route);
  if (existing) {
    return existing;
  }

  let loader: Promise<void>;
  if (route === 'about') {
    loader = import('../pages/About').then((m) => {
      loadedComponents.about = m.About;
    });
  } else if (route === 'services') {
    loader = import('../pages/Services').then((m) => {
      loadedComponents.services = m.Services;
    });
  } else if (route === 'projects') {
    loader = import('../pages/Projects').then((m) => {
      loadedComponents.projects = m.Projects;
    });
  } else if (route === 'contact') {
    loader = import('../pages/Contact').then((m) => {
      loadedComponents.contact = m.Contact;
    });
  } else {
    loader = import('../pages/NotFound').then((m) => {
      loadedComponents['not-found'] = m.NotFound;
    });
  }

  pendingLoads.set(route, loader);
  return loader.finally(() => {
    pendingLoads.delete(route);
  });
}
