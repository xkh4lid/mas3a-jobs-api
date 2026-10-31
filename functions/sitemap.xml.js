const ORIGIN = 'https://mas3a.pages.dev';
const escapeXml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export async function onRequestGet({ env }) {
  const urls = [{ loc: ORIGIN + '/', lastmod: null }];
  // The current jobs table has no slug field. Do not publish invented job URLs.
  // Only add job URLs after a verified, publicly routable canonical path exists.
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(({ loc, lastmod }) => '  <url><loc>' + escapeXml(loc) + '</loc>' +
      (lastmod ? '<lastmod>' + escapeXml(lastmod) + '</lastmod>' : '') + '</url>').join('\n') +
    '\n</urlset>\n';
  return new Response(xml, { status: 200, headers: {
    'Content-Type': 'application/xml; charset=utf-8',
    'Cache-Control': 'public, max-age=300'
  } });
}
