# 服务端渲染

- 1、目的：解决 SPA 项目，首屏渲染时间长，不利于 SEO
- 2、解决思路：首屏请求时，服务端通过 renderToString 返回带 html 内容的数据，在浏览器端再通过 hydrate 注入 js 交互内容。最终在浏览器实现首屏 SSR 效果。
- 3、使用 concurrently 解决一次启动多个命令，提升开发体验。
- 4、在服务器端通过 StaticRouter 实现多页面 SSR。
- 5、数据请求处理：client 端通过 window.\_\_context 附上 server 端获取的初始值，在 server 端，通过调用组件定义的 loadData 方法获取数据。
- 6、在 server 端通过封装 promise 解决多页面数据请求容错。
- 7、通过 server 端的 proxy 解决数据请求跨域问题。
- 8、通过 thunk.withExtraArgument 传递 axios 实例，在客户端和服务端访问不同 baseURL
- 9、客户端通过 style-loader 编译 css，在服务端通过 isomorphic-style-loader 编译 css
- 10、在服务端通过传入 context 对象，404 页面通过在 staticContext 上添加 statuscode，
  在服务端通过 context.statuscode 获取传递的 code，Redirect 页面通过 context.action 判断，如果是重定向页面，通过 res.redirect(301, context.url)重定向到目标页。
- 11、通过 HtmlWebpackPlugin 打包 index.csr.html，在 server 端通过判断开启 csrRednder，
  在 client 端，通过判断 window.\_\_context 全局变量来区分 csr 和 ssr 渲染，csr 渲染使用
  ReactDom.render(),ssr 渲染时采用 ReactDom.hydrate()。
- 12、通过 css module 方式实现组件内 css。通过高阶组件，在 props.staticContext 存在时，往
  props.staticContext.css 中 push 组件 styles.\_getCss()，在 server 端通过 context.css 拿到组件记录的 styles，通过字符串模板中的 style 标签，在服务端渲染组件内 css。
- 13、使用 hoist-non-react-statics 在高阶组件中传递组件中的静态方法，完善 withStyle 高阶组件。
- 14、使用 puppeteer 实现实现简单 SEO 优化。
- 15、prerender 参考文档：
  https://www.jianshu.com/p/840f8f233af5
- 16、prerender-spa-plugin 参考文档：
  https://segmentfault.com/a/1190000018182165?utm_source=tag-newest
