import type { APIRoute } from 'astro';
import { site } from '../data/site';

const body = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
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
