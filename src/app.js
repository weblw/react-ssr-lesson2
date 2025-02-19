import React from 'react'
import {Route} from 'react-router-dom'

import Index from './container/Index'
import About from './container/About'
import User from './container/User'


// export default (
//   <div>
//     <Route path='/' exact component={Index}></Route>
//     <Route path='/about' exact component={About}></Route>
//   </div>  
// )

// 改造成js配置
export default[
  {
    path:'/',
    component:Index,
    exact:true,
    key:'index'
  },
  {
    path:'/about',
    component:About,
    exact:true,
    key:'about'
  },
  {
    path:'/user',
    component:User,
    exact:true,
    key:'user'
  }
]