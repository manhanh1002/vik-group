'use strict'
const fs = require('fs').promises
const path = require('path')
let fetchFn = globalThis.fetch
try { if (!fetchFn) { const nf = require('node-fetch'); fetchFn = nf.default || nf } } catch (e) {}
if (!fetchFn) { console.error('Fetch API unavailable. Use Node 18+ hoặc cài node-fetch'); process.exit(1) }
const API_BASE = 'https://resources.smax.ai/wp-json/wp/v2'
async function fetchAll(endpoint) {
  const perPage = 100
  let page = 1
  let results = []
  for (;;) {
    const url = `${API_BASE}/${endpoint}?per_page=${perPage}&page=${page}`
    const res = await fetchFn(url, { headers: { Accept: 'application/json' } })
    if (!res.ok) { throw new Error(`HTTP ${res.status} for ${url}`) }
    const arr = await res.json()
    if (!Array.isArray(arr) || arr.length === 0) break
    results = results.concat(arr)
    const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '0', 10)
    if (!totalPages || page >= totalPages) break
    page += 1
  }
  return results
}
function stripTags(html) {
  if (!html) return ''
  const s = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const entities = { '&nbsp;': ' ', '&amp;': '&', '&quot;': '"', '&#39;': "'", '&lt;': '<', '&gt;': '>' }
  return s.replace(/&nbsp;|&amp;|&quot;|&#39;|&lt;|&gt;/g, m => entities[m] || m).trim()
}
function escAttr(str) {
  if (!str) return ''
  return String(str).replace(/"/g, '&quot;')
}
function fmtDateVi(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })
}
function htmlLayout({ title, description, body }) {
  return [
    '<!DOCTYPE html>',
    '<html lang="vi">',
    '<head>',
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${title}</title>`,
    `<meta name="description" content="${escAttr(description)}">`,
    '</head>',
    '<body>',
    body,
    '</body>',
    '</html>'
  ].join('\n')
}
function articleNews(item) {
  const t = item && item.title && item.title.rendered ? item.title.rendered : ''
  const descRaw = item && item.excerpt && item.excerpt.rendered ? item.excerpt.rendered : ''
  const desc = stripTags(descRaw)
  const d = fmtDateVi(item && item.date ? item.date : '')
  const timeBlock = d ? `<p><time datetime="${escAttr(item.date)}">${d}</time></p>` : ''
  const body = [
    '<main>',
    '<article>',
    `<h1>${t}</h1>`,
    timeBlock,
    (item && item.content && item.content.rendered) ? item.content.rendered : '',
    '</article>',
    '</main>'
  ].join('\n')
  return htmlLayout({ title: t, description: desc || t, body })
}
function articleRecruitment(item) {
  const t = item && item.title && item.title.rendered ? item.title.rendered : ''
  const descRaw = item && item.excerpt && item.excerpt.rendered ? item.excerpt.rendered : ''
  const desc = stripTags(descRaw)
  const d = fmtDateVi(item && item.date ? item.date : '')
  const timeBlock = d ? `<p><time datetime="${escAttr(item.date)}">${d}</time></p>` : ''
  const m = item && item.meta ? item.meta : {}
  const rows = []
  function addRow(label, value) {
    if (value === undefined || value === null) return
    const s = String(value).trim()
    if (!s) return
    rows.push(`<div><strong>${label}:</strong> ${s}</div>`)
  }
  addRow('Trạng thái', m.job_status_text)
  addRow('Mức lương', m.job_salary)
  addRow('Địa điểm', m.job_location)
  addRow('Loại hình', m.job_type)
  addRow('Cấp bậc', m.job_level)
  addRow('Số lượng', m.job_quantity)
  if (m.job_deadline) {
    const dl = fmtDateVi(m.job_deadline)
    if (dl) rows.push(`<div><strong>Hạn nộp:</strong> ${dl}</div>`)
  }
  addRow('Email nộp CV', m.job_contact_email)
  if (m.job_apply_url) {
    const url = String(m.job_apply_url).trim()
    if (url) rows.push(`<div><strong>Link nộp CV:</strong> <a href="${escAttr(url)}">${url}</a></div>`)
  }
  const metaBlock = rows.length ? `<section>${rows.join('\n')}</section>` : ''
  const body = [
    '<main>',
    '<article>',
    `<h1>${t}</h1>`,
    timeBlock,
    metaBlock,
    (item && item.content && item.content.rendered) ? item.content.rendered : '',
    '</article>',
    '</main>'
  ].join('\n')
  return htmlLayout({ title: t, description: desc || t, body })
}
function newsIndexHTML(items) {
  const listItems = items.map(item => {
    const t = item.title && item.title.rendered ? item.title.rendered : ''
    const slug = item.slug
    const descRaw = item.excerpt && item.excerpt.rendered ? item.excerpt.rendered : ''
    const desc = stripTags(descRaw)
    const d = fmtDateVi(item.date)
    return `
      <article class="news-item">
        <h2><a href="/tin-tuc/${slug}">${t}</a></h2>
        ${d ? `<p class="date"><time datetime="${escAttr(item.date)}">${d}</time></p>` : ''}
        <div class="excerpt">${desc}</div>
      </article>`
  }).join('\n')
  const body = `
    <main>
      <h1>Tin tức</h1>
      <div class="news-list">
        ${listItems}
      </div>
    </main>`
  return htmlLayout({ title: 'Tin tức', description: 'Danh sách tin tức mới nhất', body })
}
function recruitmentIndexHTML(items) {
  const listItems = items.map(item => {
    const t = item.title && item.title.rendered ? item.title.rendered : ''
    const slug = item.slug
    const m = item.meta || {}
    const jobCat = escAttr(m.job_category || '')
    const jobStatus = escAttr(m.job_status || '')
    return `
      <div class="job-item" data-job-category="${jobCat}" data-job-status="${jobStatus}">
        <h3><a href="/tuyen-dung/${slug}">${t}</a></h3>
        <div><strong>Địa điểm:</strong> ${m.job_location || ''}</div>
        <div><strong>Loại hình:</strong> ${m.job_type || ''}</div>
        <div><strong>Trạng thái:</strong> ${m.job_status_text || ''}</div>
      </div>`
  }).join('\n')
  const body = `
    <main>
      <h1>Tuyển dụng</h1>
      <div class="job-list">
        ${listItems}
      </div>
    </main>`
  return htmlLayout({ title: 'Tuyển dụng', description: 'Cơ hội nghề nghiệp hấp dẫn', body })
}
function generateSitemap(news, jobs) {
  const BASE_URL = 'https://resources.smax.ai' // Placeholder domain
  const urls = [
    { loc: BASE_URL + '/', lastmod: new Date().toISOString() },
    { loc: BASE_URL + '/tin-tuc/', lastmod: new Date().toISOString() },
    { loc: BASE_URL + '/tuyen-dung/', lastmod: new Date().toISOString() }
  ]
  news.forEach(item => {
    urls.push({
      loc: `${BASE_URL}/tin-tuc/${item.slug}`,
      lastmod: item.modified ? new Date(item.modified).toISOString() : new Date().toISOString()
    })
  })
  jobs.forEach(item => {
    urls.push({
      loc: `${BASE_URL}/tuyen-dung/${item.slug}`,
      lastmod: item.modified ? new Date(item.modified).toISOString() : new Date().toISOString()
    })
  })
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`
}
async function ensureDir(dir) { await fs.mkdir(dir, { recursive: true }) }
async function writeFileSafely(filePath, html) { await ensureDir(path.dirname(filePath)); await fs.writeFile(filePath, html, 'utf8') }
async function generate() {
  const news = await fetchAll('tin-tuc')
  const jobs = await fetchAll('recruitments')
  // Detail pages
  for (const item of news) {
    const fp = path.join(process.cwd(), 'dist', 'tin-tuc', item.slug, 'index.html')
    const html = articleNews(item)
    await writeFileSafely(fp, html)
  }
  for (const item of jobs) {
    const fp = path.join(process.cwd(), 'dist', 'tuyen-dung', item.slug, 'index.html')
    const html = articleRecruitment(item)
    await writeFileSafely(fp, html)
  }
  // Index pages
  await writeFileSafely(path.join(process.cwd(), 'dist', 'tin-tuc', 'index.html'), newsIndexHTML(news))
  await writeFileSafely(path.join(process.cwd(), 'dist', 'tuyen-dung', 'index.html'), recruitmentIndexHTML(jobs))
  // Sitemap
  await writeFileSafely(path.join(process.cwd(), 'dist', 'sitemap.xml'), generateSitemap(news, jobs))
}
generate().catch(err => { console.error(err && err.stack ? err.stack : String(err)); process.exitCode = 1 })
