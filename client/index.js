import React from 'react'
import ReactDom from 'react-dom'

import App from '../src/app'

// 注水，渲染到页面
ReactDom.hydrate(App,document.getElementById('root'))