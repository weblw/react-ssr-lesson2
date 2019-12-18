import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div>
      <Link to="/">首页</Link> |<Link to="/about"> 关于页面</Link> |
      <Link to="/user"> 用户中心</Link> |<Link to="/adssad"> 不存在</Link>
    </div>
  )
}
