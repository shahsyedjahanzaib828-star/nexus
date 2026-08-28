/**
 * Security headers for HTML documents.
 *
 * Keep the Content-Security-Policy value in vercel.json in sync with
 * `contentSecurityPolicy` below. Vercel applies the HTTP header in production;
 * Layout also emits a matching meta CSP so local `astro preview` can be checked.
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
export const contentSecurityPolicy = [
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
