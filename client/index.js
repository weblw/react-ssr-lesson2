import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter,Route} from 'react-router-dom'
import routes from '../src/app'
import {getClientStore} from '../src/store/store'
import {Provider} from 'react-redux'
import Header from '../src/component/Header'

const Page=(
  <Provider store={getClientStore()}>
    <BrowserRouter>
      <Header></Header>
      {routes.map(route=><Route {...route}></Route>)}
    </BrowserRouter>
  </Provider>
)


// 注水，渲染到页面
ReactDom.hydrate(Page,document.getElementById('root'))