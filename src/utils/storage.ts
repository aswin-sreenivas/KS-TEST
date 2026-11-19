/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Safe Client-Side Storage Helpers
 * NOTE: Enquiries stored in localStorage remain on the visitor's browser only.
 */

export interface StoredEnquiry {
  ref: string;
  fullName: string;
  phone: string;
  email: string;
  serviceRequired: string;
  projectLocation: string;
  message: string;
  submittedAt: string;
}

const ENQUIRIES_STORAGE_KEY = 'ksa_enquiries';
const MAX_STORED_ENQUIRIES = 50;

function isValidStoredEnquiry(item: unknown): item is StoredEnquiry {
  if (!item || typeof item !== 'object') return false;
  const record = item as Record<string, unknown>;
  return (
    typeof record.ref === 'string' &&
    typeof record.fullName === 'string' &&
    typeof record.submittedAt === 'string'
  );
}

export function loadStoredEnquiries(): StoredEnquiry[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return [];
    }
    const raw = window.localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidStoredEnquiry);
  } catch {
    return [];
  }
}

export function saveStoredEnquiry(enquiry: StoredEnquiry): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    const existing = loadStoredEnquiries();
    const updated = [...existing, enquiry].slice(-MAX_STORED_ENQUIRIES);
    window.localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch {
    return false;
  }
}
