/** Escape HTML, then turn markdown-style [label](/path) or [label](https://...) into links. */
export function linkify(
	text: string,
	className = 'font-semibold text-[#a83009] underline-offset-2 hover:underline',
): string {
	const escaped = text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
	return escaped.replace(
		/\[([^\]]+)\]\((https:\/\/[^\s)]+|\/[a-z0-9\-\/]+)\)/gi,
		(_match, label: string, href: string) => {
			const extra = href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : '';
			return `<a href="${href}" class="${className}"${extra}>${label}</a>`;
		},
	);
}
