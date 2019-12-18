import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getIndexList } from '../store/index'

function Index(props) {
  const [count, setCount] = useState(1)
  useEffect(() => {
    if (!props.list.length) {
      // 客户端数据请求
      props.getIndexList()
    }
  }, [])
  const btnStyle = {
    clolr: 'blue',
    cursor: 'pointer',
    marginLeft: '50px'
  }
  return (
    <div>
      <h1>Hello {props.title}!!</h1>
      <h2>我现在是number:{count}</h2>
      <button onClick={() => setCount(count + 1)} style={btnStyle}>
        ADD
      </button>
      <hr />
      <ul>
        {props.list.map(item => {
          return <li key={item.id}>{item.name}</li>
        })}
      </ul>
    </div>
  )
}
Index.loadData = store => {
  return store.dispatch(getIndexList())
}
export default connect(state => ({ list: state.index.list }), { getIndexList })(
  Index
)
