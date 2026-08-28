import sharp from 'sharp';
import { blogPosts } from '../../data/blog';
import { services } from '../../data/services';

const pages = new Map([
	['home', { label: 'LEGAL PRACTITIONER & CORPORATE CONSULTANT', title: 'Jahanzaib Legal Services', subtitle: 'Legal, corporate, tax & litigation counsel in Karachi, Pakistan.' }],
	['blog', { label: 'LEGAL INSIGHTS FROM KARACHI', title: 'Jahanzaib Legal Insights', subtitle: 'Practical guidance on tax, company law, trademarks & compliance.' }],
	['about', { label: 'ABOUT THE PRACTICE', title: 'About Jahanzaib Legal Services', subtitle: 'Karachi-based legal practitioner & corporate consultant.' }],
	['services', { label: 'PRACTICE AREAS', title: 'Legal Services in Karachi', subtitle: 'Litigation, property, corporate, tax, trade & trademark counsel.' }],
	['contact', { label: 'CONTACT', title: 'Contact Jahanzaib Legal Services', subtitle: 'Phone, WhatsApp, email and enquiry form · Karachi, Pakistan.' }],
	['terms', { label: 'TERMS OF USE', title: 'Terms of Use', subtitle: 'Website terms for Jahanzaib Legal Services · Karachi, Pakistan.' }],
	...services.map((service) => [service.slug, { label: service.label.toUpperCase(), title: service.heading, subtitle: 'Jahanzaib Legal Services · Karachi, Pakistan.' }] as const),
	...blogPosts.map((post) => [post.slug, { label: post.label.toUpperCase(), title: post.title, subtitle: 'Legal insight from Jahanzaib Legal Services · Karachi.' }] as const)
]);

export function getStaticPaths() {
	return [...pages.keys()].map((slug) => ({ params: { slug } }));
}

const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Wrap on word boundaries so long legal headings stay readable instead of being truncated.
function wrap(text: string, maxChars: number, maxLines: number) {
	const lines: string[] = [];
	let line = '';
	for (const word of text.split(/\s+/)) {
		const candidate = line ? `${line} ${word}` : word;
		if (candidate.length > maxChars && line) {
			lines.push(line);
			line = word;
			if (lines.length === maxLines) break;
		} else {
			line = candidate;
		}
	}
	if (lines.length < maxLines && line) lines.push(line);
	if (lines.length === maxLines) {
		const last = lines[maxLines - 1];
		const consumed = lines.join(' ');
		if (consumed.length < text.length) lines[maxLines - 1] = `${last.slice(0, maxChars - 1).trimEnd()}…`;
	}
	return lines;
}

export async function GET({ params }: { params: { slug?: string } }) {
	const page = pages.get(params.slug ?? 'home') ?? pages.get('home')!;
	const titleLines = wrap(page.title, 30, 3);
	const titleStartY = titleLines.length === 3 ? 268 : titleLines.length === 2 ? 300 : 330;
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#0c0c0c"/>
<circle cx="1050" cy="-20" r="260" fill="none" stroke="#f45a27" stroke-opacity=".22" stroke-width="70"/>
<circle cx="1020" cy="10" r="180" fill="none" stroke="#f45a27" stroke-opacity=".12" stroke-width="2"/>
<rect x="72" y="68" width="66" height="66" rx="33" fill="#f45a27"/>
<text x="105" y="113" text-anchor="middle" font-family="Georgia,serif" font-size="38" fill="#0c0c0c">§</text>
<text x="72" y="196" font-family="Arial,sans-serif" font-size="18" font-weight="700" letter-spacing="4" fill="#f45a27">${escapeXml(page.label)}</text>
${titleLines.map((line, index) => `<text x="72" y="${titleStartY + index * 66}" font-family="Georgia,serif" font-size="58" font-weight="700" fill="#ffffff">${escapeXml(line)}</text>`).join('\n')}
<text x="72" y="472" font-family="Arial,sans-serif" font-size="24" fill="#dcdad6">${escapeXml(page.subtitle)}</text>
<line x1="72" y1="518" x2="1128" y2="518" stroke="#ffffff" stroke-opacity=".18"/>
<text x="72" y="563" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="#ffffff">Jahanzaib Legal Services</text>
<text x="1128" y="563" text-anchor="end" font-family="Arial,sans-serif" font-size="20" fill="#f45a27">03343108863 · Karachi</text>
</svg>`;

	const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();

	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' }
	});
}
