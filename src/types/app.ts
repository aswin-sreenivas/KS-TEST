/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Shared Application Route & Service Types
 */

export type PageRoute = 'home' | 'about' | 'services' | 'projects' | 'contact';

export type ServiceCategory = 'Construction' | 'Survey' | '3D Design';

export const VALID_PAGE_ROUTES: readonly PageRoute[] = [
  'home',
  'about',
  'services',
  'projects',
  'contact',
] as const;

export const ROUTE_PATHS: Record<PageRoute, string> = {
  home: '/',
  about: '/about/',
  services: '/services/',
  projects: '/projects/',
  contact: '/contact/',
};

export function isValidPageRoute(value: string): value is PageRoute {
  return (VALID_PAGE_ROUTES as readonly string[]).includes(value);
}

export function getRoutePath(route: PageRoute): string {
  return ROUTE_PATHS[route];
}

export function parseRouteFromLocation(pathname: string, hash: string): PageRoute {
  const pathSegment = pathname.replace(/^\/+|\/+$/g, '').split('/')[0].toLowerCase();
  if (isValidPageRoute(pathSegment)) {
    return pathSegment;
  }

  const hashSegment = hash.replace(/^#\/?/, '').split('?')[0].split('/')[0].toLowerCase();
  if (isValidPageRoute(hashSegment)) {
    return hashSegment;
  }

  return 'home';
}
