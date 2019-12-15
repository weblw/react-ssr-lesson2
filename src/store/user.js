// 首页逻辑
import axios from 'axios'
// actionTypes
const USER_INFO='USER/USER_INFO'

const defaultState={
  info:{}
}

// actionCreator
const getUser=info=>({
  type:USER_INFO,
  info
})

export const getUserList=server=>{
  return (dispatch,getState,axiosInstance)=>{
    return axios.get('http://localhost:9098/api/course/user')
      .then(res=>{
        const {info}=res.data
        dispatch(getUser(info))
      })
  }
}

export default (state=defaultState,action)=>{
  switch(action.type){
    case USER_INFO:
      const newState={
        ...state,
        info:action.info
      }
      console.log(newState) 
      return newState
    default:
      return state
  }
}