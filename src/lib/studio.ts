// Cranky Mike's Repair Studio — shared details used across the studio pages.

/**
 * Text-message number for the studio, e.g. '206-555-0123'.
 * While this is empty, the site hides every "text Mike" button on the live
 * site (and shows a dashed reminder box when running locally).
 */
export const STUDIO_PHONE: string = '';

export const STUDIO_AREA = 'Wallingford, Seattle';

export const STUDIO_PAGES = [
  { to: '/repair-studio', label: 'ABOUT', end: true },
  { to: '/repair-studio/repairs', label: 'REPAIRS' },
  { to: '/repair-studio/custom-builds', label: 'CUSTOM BUILDS' },
  { to: '/repair-studio/for-sale', label: 'FOR SALE' },
  { to: '/repair-studio/faq', label: 'FAQ' },
  { to: '/repair-studio/contact', label: 'CONTACT' },
];

/** sms: link to the studio number, optionally with a pre-filled message. Null until a number is set. */
export function smsHref(body?: string): string | null {
  const digits = STUDIO_PHONE.replace(/[^\d+]/g, '');
  if (!digits) return null;
  // "?&body=" is understood by both iOS and Android messaging apps
  return body ? `sms:${digits}?&body=${encodeURIComponent(body)}` : `sms:${digits}`;
}
