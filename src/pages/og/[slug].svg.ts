import { blogPosts } from '../../data/blog';

const pages = new Map([
	['home', { label: 'LEGAL PRACTITIONER & CORPORATE CONSULTANT', title: 'Advocate Jahanzaib', subtitle: 'Legal, corporate, tax & litigation counsel in Karachi, Pakistan.' }],
	['blog', { label: 'LEGAL INSIGHTS FROM KARACHI', title: 'The Advocate Jahanzaib Blog', subtitle: 'Practical guidance on tax, company law, trademarks & compliance.' }],
	...blogPosts.map((post) => [post.slug, { label: post.label.toUpperCase(), title: post.title, subtitle: 'Legal insight from Advocate Jahanzaib · Karachi, Pakistan.' }])
]);

export function getStaticPaths() {
	return [...pages.keys()].map((slug) => ({ params: { slug } }));
}

export function GET({ params }: { params: { slug?: string } }) {
	const page = pages.get(params.slug ?? 'home') ?? pages.get('home')!;
	const title = page.title.length > 48 ? `${page.title.slice(0, 45)}...` : page.title;
	const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#163a2a"/>
<circle cx="1050" cy="-20" r="260" fill="none" stroke="#d5e767" stroke-opacity=".22" stroke-width="70"/>
<circle cx="1020" cy="10" r="180" fill="none" stroke="#d5e767" stroke-opacity=".12" stroke-width="2"/>
<rect x="72" y="68" width="66" height="66" rx="33" fill="#d5e767"/>
<text x="105" y="113" text-anchor="middle" font-family="Georgia,serif" font-size="38" fill="#163a2a">§</text>
<text x="72" y="208" font-family="Arial,sans-serif" font-size="18" font-weight="700" letter-spacing="4" fill="#d5e767">${escapeXml(page.label)}</text>
<text x="72" y="330" font-family="Georgia,serif" font-size="62" font-weight="700" fill="#ffffff">${escapeXml(title)}</text>
<text x="72" y="404" font-family="Arial,sans-serif" font-size="25" fill="#c4d0c5">${escapeXml(page.subtitle)}</text>
<line x1="72" y1="510" x2="1128" y2="510" stroke="#ffffff" stroke-opacity=".18"/>
<text x="72" y="555" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="#ffffff">Advocate Jahanzaib</text>
<text x="1128" y="555" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="#d5e767">03343108863 · Karachi</text>
</svg>`;

	return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8', 'Cache-Control': 'public, max-age=86400' } });
}
