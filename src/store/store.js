// 存储入口
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import indexReducer from './index'
import userReducer from './user'
import axios from 'axios'

const reducer = combineReducers({
  index: indexReducer,
  user: userReducer
})

const clientAxios = axios.create({
  baseURL: '/'
})
const serverAxios = axios.create({
  baseURL: 'http://localhost:9090'
})

// const store=createStore(reducer,applyMiddleware(thunk))

// export default store
export const getClientStore = () => {
  const defaultState = window.__context ? window.__context : {}
  return createStore(
    reducer,
    defaultState,
    applyMiddleware(thunk.withExtraArgument(clientAxios))
  )
}
export const getServerStore = () => {
  return createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(serverAxios))
  )
}
