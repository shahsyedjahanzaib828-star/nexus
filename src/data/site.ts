/**
 * Site configuration for SEO, contact, and entity identity.
 *
 * Production origin:
 * - Prefer PUBLIC_SITE_URL when a custom domain is connected (no trailing slash).
 * - Falls back to the current Vercel deployment URL until a domain is supplied.
 * Do not invent a custom domain name here.
 *
 * Entity rules:
 * - Only publish facts that are verified in this project.
 * - Do not invent street addresses, bar enrollment, degrees, awards, or reviews.
 * - Optional future fields may be filled later without rewriting schema architecture.
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

/**
 * Stable JSON-LD @id fragments. Keep these stable across deploys so entity graphs
 * continue to resolve. Do not invent competing IDs for the same entity.
 */
export const entityIds = {
	organization: `${site.url}/#legal-service`,
	person: `${site.url}/#professional`,
	website: `${site.url}/#website`
} as const;

/**
 * Practitioner identity — only verified given name is published.
 * Optional fields stay empty until the practice supplies verified values.
 */
export const practitioner = {
	/** Public display name. Do not invent a surname or fuller legal name. */
	name: 'Jahanzaib',
	givenName: 'Jahanzaib',
	jobTitle: site.tagline,
	description:
		`${site.tagline} at ${site.name}, based in ${site.city}, ${site.region}, ${site.country}. ` +
		'Handles litigation and corporate, tax, property, trade and intellectual property matters for individuals and businesses.',
	/** Absolute About URL is set when building schema. */
	path: '/about',
	/**
	 * Future verified fields (leave unset until confirmed):
	 * familyName, honorificPrefix, image, hasCredential, alumniOf, award
	 */
	image: '' as string,
	sameAs: [] as readonly string[]
} as const;

/**
 * Practice / organization identity.
 * City-level location only — no streetAddress until a verified office address exists.
 */
export const organization = {
	name: site.name,
	alternateName: `${site.name} | ${site.tagline}`,
	description:
		`${site.name} is a ${site.city}-based legal practice serving individuals, families, founders and businesses. ` +
		`Work covers civil, criminal and family litigation; property and construction matters; SECP company registration; ` +
		`FBR and SRB tax compliance; WeBOC import and export registration; and trademark protection through IPO Pakistan. ` +
		`The practice appears before courts and authorities in ${site.region} and handles advisory work for clients across ${site.country}.`,
	telephone: `+92${site.phone.slice(1)}`,
	email: site.email,
	/**
	 * Future verified fields (leave unset until confirmed):
	 * streetAddress, postalCode, geo, openingHours, googleBusinessProfile
	 */
	streetAddress: '' as string,
	postalCode: '' as string,
	sameAs: [] as readonly string[],
	knowsAbout: [
		'Civil Litigation',
		'Criminal Defense',
		'Family Law',
		'Corporate Law',
		'Tax Filing',
		'Real Estate Law',
		'Trademark Registration',
		'WeBOC Registration',
		'SECP Company Registration'
	] as readonly string[]
} as const;

export const phoneHref = `tel:+92${site.phone.slice(1)}`;
export const whatsappHref = `https://wa.me/92${site.phone.slice(1)}`;
export const mailHref = `mailto:${site.email}`;

/** Absolute URL with no trailing slash (including the site root). */
export function absoluteUrl(path = '/'): string {
	if (!path || path === '/') return site.url;
	const normalized = path.startsWith('/') ? path : `/${path}`;
	return `${site.url}${normalized.replace(/\/+$/, '')}`;
}

/** City-level PostalAddress only — never invent street or geo coordinates. */
export function locationAddress() {
	return {
		'@type': 'PostalAddress' as const,
		addressLocality: site.city,
		addressRegion: site.region,
		addressCountry: 'PK'
	};
}

export function areaServedNodes() {
	return [
		{ '@type': 'City' as const, name: site.city },
		{ '@type': 'State' as const, name: site.region },
		{ '@type': 'Country' as const, name: site.country }
	];
}

/** Omit empty optional string/array fields from schema objects. */
export function withOptionalFields<T extends Record<string, unknown>>(base: T, optional: Record<string, unknown>): T {
	const next: Record<string, unknown> = { ...base };
	for (const [key, value] of Object.entries(optional)) {
		if (value === undefined || value === null || value === '') continue;
		if (Array.isArray(value) && value.length === 0) continue;
		next[key] = value;
	}
	return next as T;
}
