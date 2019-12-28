const express = require('express')
const puppeteer = require('puppeteer')
// /api开头的
const axios = require('axios')
const app = express()

async function test() {
  console.log('截图')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://e.xitu.io/')
  await page.screenshot({ path: 'gold.png' })
  await browser.close()
}
// test()

const urlCache = {}
app.get('*', async (req, res) => {
  if (req.url == '/favicon.ico') {
    // 对SEO无影响
    return res.send({ code: 0 })
  }
  console.log(req.url)
  // 遍历所有路由，都写成html文件，或者都缓存上
  // 根据url加缓存
  // 缓存过多 lru缓存算法
  if (urlCache[req.url]) {
    return res.send(urlCache[req.url])
  }
  const url = 'http://localhost:9098' + req.url
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: ['networkidle0']
  })
  const html = await page.content()
  await browser.close()
  urlCache[req.url] = html
  res.send(html)
})

app.listen(8081, () => {
  console.log('ssr server start')
})
