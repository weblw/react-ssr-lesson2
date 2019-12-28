import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getIndexList } from '../store/index'
import styles from './Index.css'
import withStyles from '../withStyles'

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
    <div className={styles.container}>
      <h1 className={styles.title}>Hello {props.title}!!</h1>
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

// let NewIndex = connect(state => ({ list: state.index.list }), { getIndexList })(
//   withStyles(Index, styles)
// )
// NewIndex.loadData = store => {
//   return store.dispatch(getIndexList())
// }
// export default NewIndex

Index.loadData = store => {
  return store.dispatch(getIndexList())
}
export default connect(state => ({ list: state.index.list }), { getIndexList })(
  withStyles(Index, styles)
)
