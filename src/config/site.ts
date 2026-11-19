/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Centralized Deployment, Staging & Form Configuration
 */

export const OFFICIAL_SITE_ORIGIN = 'https://ksassociatesengineeringconstructionsurvey.com';

/**
 * Toggle to `false` once ready for public Google / Bing indexing.
 * While `true`, every prerendered page outputs `noindex, nofollow` and `robots.txt` disallows all crawlers.
 */
export const IS_STAGING = true;

/**
 * Replace `YOUR_FORM_ID` with your live Formspree form ID (e.g. https://formspree.io/f/abcdwxyz).
 */
export const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
