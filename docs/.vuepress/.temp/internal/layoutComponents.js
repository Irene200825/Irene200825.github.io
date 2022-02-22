import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("/Users/zhanghongan/Documents/frontend/learn/blog/Irene200825.github.io/node_modules/@vuepress/theme-default/lib/client/layouts/404.vue")),
  "Layout": defineAsyncComponent(() => import("/Users/zhanghongan/Documents/frontend/learn/blog/Irene200825.github.io/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue")),
}
