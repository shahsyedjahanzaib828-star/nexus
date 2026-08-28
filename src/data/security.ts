/**
 * Security headers for HTML documents.
 *
 * Keep the HTTP Content-Security-Policy value in vercel.json in sync with
 * `contentSecurityPolicyHeader` below. Layout emits `contentSecurityPolicyMeta`
 * so local `astro preview` can be checked. Meta CSP cannot include
 * frame-ancestors (browsers ignore it on <meta>); clickjacking protection in
 * production is the Vercel header plus X-Frame-Options: DENY.
 *
 * Why style-src includes 'unsafe-inline':
 * astro.config.mjs sets build.inlineStylesheets: 'always', so every page ships
 * one inlined <style> block (Tailwind + component CSS). There is no external
 * stylesheet to hash, and per-page style hashes would churn on every CSS tweak.
 *
 * Why script-src does NOT include 'unsafe-inline' or 'unsafe-eval':
 * JSON-LD is type=application/ld+json (not executed as JS). The only executable
 * script is /enquiry-form.js, loaded from this origin.
 */
const cspDirectives = [
	"default-src 'self'",
	"base-uri 'self'",
	"object-src 'none'",
	"form-action 'self' mailto:",
	"script-src 'self'",
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self'",
	"font-src 'self'",
	"connect-src 'self'",
	'upgrade-insecure-requests'
] as const;

/** Meta-tag CSP (no frame-ancestors — invalid/ignored in <meta>). */
export const contentSecurityPolicyMeta = cspDirectives.join('; ');

/** HTTP header CSP used in vercel.json. */
export const contentSecurityPolicyHeader = [
	"default-src 'self'",
	"base-uri 'self'",
	"object-src 'none'",
	"frame-ancestors 'none'",
	"form-action 'self' mailto:",
	"script-src 'self'",
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self'",
	"font-src 'self'",
	"connect-src 'self'",
	'upgrade-insecure-requests'
].join('; ');

export const permissionsPolicy = [
	'accelerometer=()',
	'autoplay=()',
	'camera=()',
	'display-capture=()',
	'encrypted-media=()',
	'fullscreen=()',
	'geolocation=()',
	'gyroscope=()',
	'magnetometer=()',
	'microphone=()',
	'midi=()',
	'payment=()',
	'picture-in-picture=()',
	'publickey-credentials-get=()',
	'screen-wake-lock=()',
	'sync-xhr=()',
	'usb=()',
	'xr-spatial-tracking=()',
	'interest-cohort=()',
	'browsing-topics=()'
].join(', ');
