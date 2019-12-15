# 服务端渲染
- 1、目的：解决SPA项目，首屏渲染时间长，不利于SEO
- 2、解决思路：首屏请求时，服务端通过renderToString返回带html内容的数据，在浏览器端再通过hydrate注入js交互内容。最终在浏览器实现首屏SSR效果。
- 3、使用concurrently解决一次启动多个命令，提升开发体验。
- 4、在服务器端通过StaticRouter实现多页面SSR。
- 5、数据请求处理：client端通过window.__context附上server端获取的初始值，在server端，通过调用组件定义的loadData方法获取数据。
- 6、在server端通过封装promise解决多页面数据请求容错。
- 7、通过server端的proxy解决数据请求跨域问题。