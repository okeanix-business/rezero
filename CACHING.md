# Publishing updates

After changing episode data, run `node generate-site.js`. The generator now
automatically versions every local CSS and JavaScript reference in every HTML
page, including the home page, extra episodes, and character search.

For changes that do not need page generation, run `node version-assets.js` before
publishing. Upload the changed assets **and** updated HTML together. Versions are
derived from file contents, so unchanged assets keep their cached URLs. Missing
local CSS or JavaScript files stop versioning with an error.

The live domain uses GitHub Pages. On September 11, 2026, both HTML and JavaScript
responses returned `Cache-Control: max-age=600`. Asset versions prevent a refreshed
page from reusing an older asset, but cannot change HTML already in a browser cache
or update a tab that stays open. Allow the existing 10-minute freshness window
after deployment, then reload. A hard refresh can help an affected user immediately.

GitHub Pages does not support configuring response headers through `_headers`,
`.htaccess`, or HTML cache-control meta tags. If immediate HTML revalidation is
required, configure a hosting provider or reverse proxy that supports
`Cache-Control: no-cache` for HTML and avoids serving stale HTML at its CDN.
No service worker is registered by this site's current source.
