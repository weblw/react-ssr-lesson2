import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../store/user'
import { Redirect } from 'react-router-dom'

function User(props) {
  useEffect(() => {
    if (!props.info.name) {
      // 客户端数据请求
      props.getUserList()
    }
  }, [])
  // 没有登录跳转到登录页面 判断cookie 判断localStorage
  return <Redirect to="/about"></Redirect>
  // return <div>
  //   <h1>
  //     你好{props.info.name}，你最棒的是{props.info.best}。
  //   </h1>
  // </div>
}
User.loadData = store => {
  return store.dispatch(getUserList())
}
export default connect(state => ({ info: state.user.info }), { getUserList })(
  User
)
