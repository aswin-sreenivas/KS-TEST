/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Shared Application Route & Service Types
 */

export type PageRoute = 'home' | 'about' | 'services' | 'projects' | 'contact';
export type AppRoute = PageRoute | 'not-found';

export type ServiceCategory = 'Construction' | 'Survey' | '3D Design';
export type ServiceSectionId = 'construction' | 'survey' | '3d-design';

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

export function getRoutePath(route: PageRoute, hashSection?: string): string {
  const basePath = ROUTE_PATHS[route];
  if (!hashSection) return basePath;
  const normalizedHash = hashSection.startsWith('#') ? hashSection : `#${hashSection}`;
  return `${basePath}${normalizedHash}`;
}

export function parseProjectIdFromPathname(pathname: string): string | null {
  const segments = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (segments.length === 2 && segments[0].toLowerCase() === 'projects') {
    return segments[1];
  }
  return null;
}

export function parseRouteFromLocation(pathname: string, hash: string): AppRoute {
  const segments = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);

  if (segments.length === 0) {
    const hashSegment = hash.replace(/^#\/?/, '').split('?')[0].split('/')[0].toLowerCase();
    if (isValidPageRoute(hashSegment)) {
      return hashSegment;
    }
    return 'home';
  }

  const firstSegment = segments[0].toLowerCase();

  if (firstSegment === 'projects' && segments.length <= 2) {
    return 'projects';
  }

  if (segments.length === 1 && isValidPageRoute(firstSegment)) {
    return firstSegment;
  }

  return 'not-found';
}
