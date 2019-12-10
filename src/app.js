import React,{useState} from 'react'

function App(params){
  const [count,setCount]=useState(1)
  const btnStyle={
    clolr:'blue',
    cursor:'pointer',
    marginLeft:'50px'
  }
  return (
    <div>
      <h1>Hello {params.title}!!</h1>
      <h2>我现在是number:{count}</h2>
      <button onClick={()=>setCount(count+1)} style={btnStyle}>ADD</button>
    </div>
  )
}

export default <App title='React SSR 初次尝试'></App>