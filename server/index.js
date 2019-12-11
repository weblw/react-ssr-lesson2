import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import {StaticRouter} from 'react-router-dom'
import App from '../src/app'
import store from '../src/store/store'
import {Provider} from 'react-redux'

const app=express()
app.use(express.static('public'))

app.get('*',(req,res)=>{
  // 渲染react页面
  const html=renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        {App}
      </StaticRouter>
    </Provider>   
  )
  console.log(html)
  res.send(
    `
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>React SSR</title>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
      <script src="/bundle_client.js"></script>
    </html>
    `
  )
})

app.listen(9098,()=>{
  console.log('启动在9098端口！！')
})