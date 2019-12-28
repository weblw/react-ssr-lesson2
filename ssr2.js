const express = require('express')
const app = express()

app.get('*', async (req, res) => {
  if (req.url == '/favicon.ico') {
    // 对SEO无影响
    return res.send({ code: 0 })
  }
  console.log(req.url)
  const redirectUrl =
    'http://localhost:3000/render?url=http://localhost:9098' + req.url
  res.redirect(redirectUrl)
})

app.listen(8082, () => {
  console.log('ssr2 server start')
})
