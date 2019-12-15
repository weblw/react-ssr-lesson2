import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../store/user'

function User(props){
  useEffect(()=>{
    if(!props.info.name){
      // 客户端数据请求
      props.getUserList()
    }    
  },[])
  return <div>
    <h1>
      你好{props.info.name}，你最棒的是{props.info.best}。
    </h1>
  </div>
}
User.loadData=(store)=>{
  return store.dispatch(getUserList())
}
export default connect(
  state=>({info:state.user.info}),
  {getUserList}
)(User)