// 模拟接口
let express=require('express')
const app=new express()

app.get('/api/course/list',(req,res)=>{
  // res.header('Access-Control-Allow-Origin','*')
  // res.header('Access-Control-Allow-Method','GET,POST,DELETE,PUT')
  // res.header('Content-Type',"application/json;charset=utf-8")
  res.json({
    code:0,
    list:[
      {name:'全栈工程师',id:1},
      {name:'高级前端',id:2},
      {name:'中级前端',id:3},
      {name:'入门前端',id:4}
    ]
  })
})
app.get('/api/course/user',(req,res)=>{
  // res.header('Access-Control-Allow-Origin','*')
  // res.header('Access-Control-Allow-Method','GET,POST,DELETE,PUT')
  // res.header('Content-Type',"application/json;charset=utf-8")
  res.json({
    code:0,
    info:{name:'李伟',best:'写代码'}    
  })
})

app.listen(9090,()=>{
  console.log('mock 数据准备就绪')
})