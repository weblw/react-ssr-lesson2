// 首页逻辑
// import axios from 'axios'
// actionTypes
const GET_LIST = 'INDEX/GET_LIST'

const defaultState = {
  list: []
}

// actionCreator
const changeList = list => ({
  type: GET_LIST,
  list
})

export const getIndexList = server => {
  return (dispatch, getState, $axios) => {
    return $axios.get('/api/course/list').then(res => {
      const { list } = res.data
      console.log(list)
      dispatch(changeList(list))
    })
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      const newState = {
        ...state,
        list: action.list
      }
      return newState
    default:
      return state
  }
}
