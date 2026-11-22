// RFC 9116 security.txt, generated at build time from site.config.mjs.
// Expires is set about 11 months ahead, so rebuild and redeploy at least once a year.
import { SITE } from '../../../site.config.mjs';

export function GET({ site }) {
  const expires = new Date(Date.now() + 330 * 24 * 60 * 60 * 1000).toISOString().replace(/\.\d{3}Z$/, 'Z');
  const body = [
    `Contact: mailto:${SITE.securityEmail}`,
    `Expires: ${expires}`,
    'Preferred-Languages: en',
    `Canonical: ${new URL('/.well-known/security.txt', site).href}`,
    `Policy: ${new URL('/security/', site).href}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
