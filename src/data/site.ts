/**
 * Site configuration for SEO and contact.
 *
 * Production origin:
 * - Prefer PUBLIC_SITE_URL when a custom domain is connected (no trailing slash).
 * - Falls back to the current Vercel deployment URL until a domain is supplied.
 * Do not invent a custom domain name here.
 */
const configuredOrigin = (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SITE_URL
	? String(import.meta.env.PUBLIC_SITE_URL)
	: ''
).replace(/\/+$/, '');

export const site = {
	url: configuredOrigin || 'https://nexus-alpha-ten-66.vercel.app',
	name: 'Jahanzaib Legal Services',
	tagline: 'Legal Practitioner & Corporate Consultant',
	phone: '03343108863',
	email: 'shahsyedjahanzaib828@gmail.com',
	city: 'Karachi',
	region: 'Sindh',
	country: 'Pakistan'
} as const;

/**
 * Primary local relevance for schema and on-page copy.
 * Court work is Karachi/Sindh; advisory work may serve clients elsewhere in Pakistan.
 * Do not list cities as if they were branch offices.
 */
export const primaryServiceAreas = [site.city] as const;

export const phoneHref = `tel:+92${site.phone.slice(1)}`;
export const whatsappHref = `https://wa.me/92${site.phone.slice(1)}`;
export const mailHref = `mailto:${site.email}`;

/** Absolute URL with no trailing slash (except the site root). */
export function absoluteUrl(path = '/'): string {
	if (!path || path === '/') return `${site.url}/`;
	const normalized = path.startsWith('/') ? path : `/${path}`;
	return `${site.url}${normalized.replace(/\/+$/, '')}`;
}
