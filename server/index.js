import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import { StaticRouter, matchPath, Route, Switch } from 'react-router-dom'
import routes from '../src/app'
import { getServerStore } from '../src/store/store'
import { Provider } from 'react-redux'
import Header from '../src/component/Header'
const store = getServerStore()
const app = express()
app.use(express.static('public'))

import httpProxy from 'http-proxy'
// 代理请求到后台
var proxy = httpProxy.createProxyServer({ changeOrigin: true })
app.all('/api/*', function(req, res, next) {
  console.log(req.path)
  proxy.web(req, res, { target: 'http://localhost:9090', changeOrigin: true })
})

app.get('*', (req, res) => {
  // 获取根据路由渲染出来的组件，并且拿到lodaData方法
  let promises = []
  routes.some(route => {
    const match = matchPath(req.path, route)
    if (match) {
      const { loadData } = route.component
      if (loadData) {
        let promise = new Promise((resolve, reject) => {
          // 强制规避报错 可以打印错误日志
          loadData(store)
            .then(resolve)
            .catch(resolve)
        })
        promises.push(promise)
      }
    }
  })
  Promise.all(promises)
    .then(() => {
      const context = {}
      // 渲染react页面
      const html = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Header></Header>
            <Switch>
              {routes.map(route => (
                <Route {...route}></Route>
              ))}
            </Switch>
          </StaticRouter>
        </Provider>
      )
      console.log('context', context)
      if (context.statuscode) {
        res.status(context.statuscode)
      }
      if (context.action === 'REPLACE') {
        res.redirect(301, context.url)
      }
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
        <script>
          window.__context=${JSON.stringify(store.getState())}
        </script>
        <script src="/bundle_client.js"></script>
      </html>
      `
      )
    })
    .catch(e => {
      console.log(e, '所有页面都错了')
    })
})

app.listen(9098, () => {
  console.log('启动在9098端口！！')
})
