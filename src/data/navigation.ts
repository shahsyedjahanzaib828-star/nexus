import { services, type Service } from './services';
import { blogPosts, type BlogPost } from './blog';

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

/** Curated insights for nav dropdown — existing article URLs only. */
export const insightNavSlugs = [
	'weboc-psw-registration-pakistan-guide',
	'fbr-tax-filing-compliance-penalties-pakistan',
	'property-due-diligence-checklist-karachi-pakistan',
	'pre-arrest-bail-and-post-arrest-bail-pakistan-guide'
] as const;

export const insightNavLabels: Record<(typeof insightNavSlugs)[number], string> = {
	'weboc-psw-registration-pakistan-guide': 'Latest insight',
	'fbr-tax-filing-compliance-penalties-pakistan': 'Business / FBR insight',
	'property-due-diligence-checklist-karachi-pakistan': 'Property insight',
	'pre-arrest-bail-and-post-arrest-bail-pakistan-guide': 'Litigation insight'
};

/** Short labels for compact footer — links unchanged. */
export const footerPracticeLabels: Record<(typeof practiceAreaSlugs)[number], string> = {
	'litigation-lawyer-karachi': 'Litigation',
	'property-lawyer-karachi': 'Property',
	'trademark-registration-pakistan': 'Trademark & IP'
};

export const footerBusinessLabels: Record<(typeof businessServiceSlugs)[number], string> = {
	'secp-company-registration-karachi': 'Corporate',
	'fbr-tax-filing-services-karachi': 'Tax & FBR',
	'weboc-registration-consultant-karachi': 'WeBOC'
};

/** Nav dropdown display labels — service URLs unchanged. */
export const navBusinessLabels: Record<(typeof businessServiceSlugs)[number], string> = {
	'secp-company-registration-karachi': 'Corporate & Company Setup',
	'fbr-tax-filing-services-karachi': 'Tax & FBR',
	'weboc-registration-consultant-karachi': 'Import, Export & Trade / WeBOC'
};

/** Homepage featured practices — max three, existing service pages. */
export const featuredServiceSlugs = [
	'litigation-lawyer-karachi',
	'fbr-tax-filing-services-karachi',
	'secp-company-registration-karachi'
] as const;

const bySlug = (slug: string) => services.find((service) => service.slug === slug);
const postBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);

export const practiceAreaServices = practiceAreaSlugs.map((slug) => bySlug(slug)).filter(Boolean) as Service[];
export const businessServices = businessServiceSlugs.map((slug) => bySlug(slug)).filter(Boolean) as Service[];
export const featuredServices = featuredServiceSlugs.map((slug) => bySlug(slug)).filter(Boolean) as Service[];

export const insightNavPosts = insightNavSlugs
	.map((slug) => {
		const post = postBySlug(slug);
		return post ? { ...post, navLabel: insightNavLabels[slug] } : null;
	})
	.filter(Boolean) as (BlogPost & { navLabel: string })[];

export function isPracticeAreaSlug(slug: string) {
	return (practiceAreaSlugs as readonly string[]).includes(slug);
}

export function isBusinessServiceSlug(slug: string) {
	return (businessServiceSlugs as readonly string[]).includes(slug);
}

export function isInsightSlug(slug: string) {
	return (insightNavSlugs as readonly string[]).includes(slug);
}
