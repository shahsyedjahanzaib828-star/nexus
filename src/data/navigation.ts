import { services, type Service } from './services';

/** Contentious / court-facing work — shown under “Practice Areas” in primary nav. */
export const practiceAreaSlugs = [
	'litigation-lawyer-karachi',
	'property-lawyer-karachi',
	'trademark-registration-pakistan'
] as const;

/** Corporate, tax and trade compliance — shown under “Business Services” in primary nav. */
export const businessServiceSlugs = [
	'secp-company-registration-karachi',
	'fbr-tax-filing-services-karachi',
	'weboc-registration-consultant-karachi'
] as const;

const bySlug = (slug: string) => services.find((service) => service.slug === slug);

export const practiceAreaServices = practiceAreaSlugs.map((slug) => bySlug(slug)).filter(Boolean) as Service[];
export const businessServices = businessServiceSlugs.map((slug) => bySlug(slug)).filter(Boolean) as Service[];

export function isPracticeAreaSlug(slug: string) {
	return (practiceAreaSlugs as readonly string[]).includes(slug);
}

export function isBusinessServiceSlug(slug: string) {
	return (businessServiceSlugs as readonly string[]).includes(slug);
}
