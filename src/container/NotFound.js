import React from 'react'
import { Route } from 'react-router-dom'

function Status({ code, children }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
          staticContext.statuscode = code
        }
        return children
      }}
    ></Route>
  )
}

function NotFound(props) {
  // 渲染了这个组件，就给staticContext赋值
  return (
    <Status code={404}>
      <h1>页面不存在</h1>
      <img id="img" src="/404.jpg" />
    </Status>
  )
}

export default NotFound
