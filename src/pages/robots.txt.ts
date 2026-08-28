import type { APIRoute } from 'astro';
import { site } from '../data/site';

/**
 * Permissive robots for legitimate search and AI search crawlers.
 * Specific Allow groups do not Disallow anything; they make Googlebot, Bingbot,
 * OAI-SearchBot and GPTBot explicit without overriding User-agent: *.
 */
const body = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Meta-FacebookExternalHit
Allow: /

Sitemap: ${site.url}/sitemap-index.xml
`;

export const GET: APIRoute = () =>
	new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
