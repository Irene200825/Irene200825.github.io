import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/","",["/index.html","/index.md"]],
  ["v-14b1844c","/web/blog/%E5%A6%82%E4%BD%95%E5%85%8D%E8%B4%B9%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2.html","搭建博客(方案：github + Hexo)",["/web/blog/如何免费搭建个人博客.html","/web/blog/%E5%A6%82%E4%BD%95%E5%85%8D%E8%B4%B9%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2","/web/blog/如何免费搭建个人博客.md","/web/blog/%E5%A6%82%E4%BD%95%E5%85%8D%E8%B4%B9%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2.md"]],
  ["v-8c9b2bba","/web/webSocket/%E5%8A%A8%E6%80%81%E6%95%B0%E6%8D%AE%E8%8E%B7%E5%8F%96%E6%96%B9%E6%A1%88%EF%BC%9ASSE%E3%80%81WebSoket.html","",["/web/webSocket/动态数据获取方案：SSE、WebSoket.html","/web/webSocket/%E5%8A%A8%E6%80%81%E6%95%B0%E6%8D%AE%E8%8E%B7%E5%8F%96%E6%96%B9%E6%A1%88%EF%BC%9ASSE%E3%80%81WebSoket","/web/webSocket/动态数据获取方案：SSE、WebSoket.md","/web/webSocket/%E5%8A%A8%E6%80%81%E6%95%B0%E6%8D%AE%E8%8E%B7%E5%8F%96%E6%96%B9%E6%A1%88%EF%BC%9ASSE%E3%80%81WebSoket.md"]],
  ["v-35ecbcc5","/web/canvas/canvas%E5%8A%A8%E7%94%BB.html","",["/web/canvas/canvas动画.html","/web/canvas/canvas%E5%8A%A8%E7%94%BB","/web/canvas/canvas动画.md","/web/canvas/canvas%E5%8A%A8%E7%94%BB.md"]],
  ["v-43659eb2","/web/canvas/%E5%9B%BE%E5%BD%A2%E5%BC%80%E5%8F%91%E5%8F%82%E6%95%B0.html","",["/web/canvas/图形开发参数.html","/web/canvas/%E5%9B%BE%E5%BD%A2%E5%BC%80%E5%8F%91%E5%8F%82%E6%95%B0","/web/canvas/图形开发参数.md","/web/canvas/%E5%9B%BE%E5%BD%A2%E5%BC%80%E5%8F%91%E5%8F%82%E6%95%B0.md"]],
  ["v-cc43df18","/web/python/%E7%BB%99%E8%80%81%E5%A6%B9%E6%95%B4%E7%90%86%E7%9A%84python%E7%AC%94%E8%AE%B0%E4%B8%80.html","给老妹整理的python笔记一",["/web/python/给老妹整理的python笔记一.html","/web/python/%E7%BB%99%E8%80%81%E5%A6%B9%E6%95%B4%E7%90%86%E7%9A%84python%E7%AC%94%E8%AE%B0%E4%B8%80","/web/python/给老妹整理的python笔记一.md","/web/python/%E7%BB%99%E8%80%81%E5%A6%B9%E6%95%B4%E7%90%86%E7%9A%84python%E7%AC%94%E8%AE%B0%E4%B8%80.md"]],
  ["v-66c1032a","/web/vue-router/","vue-router源码阅读笔记",["/web/vue-router/index.html","/web/vue-router/README.md"]],
  ["v-3706649a","/404.html","",["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, title, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta: { title },
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
