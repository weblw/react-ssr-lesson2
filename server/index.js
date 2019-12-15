import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import {StaticRouter,matchPath,Route} from 'react-router-dom'
import routes from '../src/app'
import {getServerStore} from '../src/store/store'
import {Provider} from 'react-redux'
import Header from '../src/component/Header'
const store=getServerStore()
const app=express()
app.use(express.static('public'))
import httpProxy from 'http-proxy'
// 代理请求到后台
var proxy=httpProxy.createProxyServer({changeOrigin:true})
app.all('/api/*',function(req,res,next){
  console.log(req.path)
  proxy.web(req,res,{target:'http://localhost:9090',changeOrigin:true})
})

app.get('*',(req,res)=>{
  // 获取根据路由渲染出来的组件，并且拿到lodaData方法
  let promises=[]
  routes.some(route=>{
    const match=matchPath(req.path,route)
    if(match){
      const {loadData}=route.component
      if(loadData){
        promises.push(loadData(store))
      }
    }
  })
  // 重新封装promise，避免一个请求出错终端程序
  let newPromises=[]
  promises.forEach(promise=>{
    let newPromise=new Promise((resolve,reject)=>{
      promise.then(
        resolve(promise)
      ).catch(()=>{
        console.log('有页面出错了')
      })
    })
    newPromises.push(newPromise)
  })
  Promise.all(newPromises).then(()=>{
    // 渲染react页面
    const html=renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <Header></Header>
          {routes.map(route=><Route {...route}></Route>)}
        </StaticRouter>
      </Provider>   
    )
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
  }).catch(()=>{
    console.log('所有页面都错了')
  })
})

app.listen(9098,()=>{
  console.log('启动在9098端口！！')
})