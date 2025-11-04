import fs from 'fs'
import path from 'path'

const siteUrl = 'https://dataflow.zone'
const outPath = path.resolve('public', 'sitemap.xml')

// Simple sitemap generator: includes homepage and any files inside content/blogs
async function buildSitemap() {
  const urls = new Set()
  urls.add('/')

  const blogsDir = path.resolve('src', 'content', 'blogs')
  try {
    const items = await fs.promises.readdir(blogsDir)
    for (const item of items) {
      if (item.endsWith('.md') || item.endsWith('.mdx')) {
        const slug = item.replace(/\.mdx?$|index\.mdx?$|index\.md?$/i, '').replace(/\s+/g, '-').toLowerCase()
        if (slug && slug !== '') {
          urls.add(`/blogs/${slug}`)
        }
      }
    }
  } catch (err) {
    // If folder not found, skip
    console.warn('Could not read blogs folder for sitemap:', err.message)
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...urls]
    .map((u) => `  <url>\n    <loc>${siteUrl}${u}</loc>\n  </url>`)
    .join('\n')}\n</urlset>`

  await fs.promises.mkdir(path.dirname(outPath), { recursive: true })
  await fs.promises.writeFile(outPath, xml, 'utf8')
  console.log('Sitemap written to', outPath)
}

buildSitemap().catch((e) => {
  console.error('Sitemap generation failed:', e)
  process.exit(1)
})
