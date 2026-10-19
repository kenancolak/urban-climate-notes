# Urban Climate Notes

React version of the Urban Climate Notes research and science communication site.

## Development

```sh
npm install
npm run dev
```

Create a production build with `npm run build` and preview it locally with `npm run preview`.

The site uses static, path-based URLs for its pages and articles. The two long-form note files remain the content source; the React renderer removes their Quarto front matter and adapts image captions and figure attributes for Markdown rendering.

The production build pre-renders each page with its own metadata and structured data, creates `robots.txt` and `sitemap.xml`, and generates WebP versions of note images. Previous Quarto `.html` URLs are retained as redirects to the new canonical URLs.

## Deployment

GitHub Pages serves the `gh-pages` branch. To publish a new version, run `npm run build`, then copy the contents of `dist` to the root of `gh-pages` and push that branch. GitHub's Pages deployment workflow publishes each update to `gh-pages`. The build uses the domain root and includes `CNAME` for `kenancolak.com`.

For the GoDaddy DNS configuration, add A records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`. Optionally add AAAA records for `@` pointing to `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, and `2606:50c0:8003::153`.
