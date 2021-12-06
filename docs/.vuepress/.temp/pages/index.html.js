export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "",
  "lang": "en-US",
  "frontmatter": {
    "home": true,
    "footer": "MIT Licensed | Copyright © 2021-present HongAn Zhang"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Vue",
      "slug": "vue",
      "children": []
    },
    {
      "level": 2,
      "title": "博客搭建",
      "slug": "博客搭建",
      "children": []
    },
    {
      "level": 2,
      "title": "python",
      "slug": "python",
      "children": []
    },
    {
      "level": 2,
      "title": "canvas",
      "slug": "canvas",
      "children": []
    },
    {
      "level": 2,
      "title": "博客搭建",
      "slug": "博客搭建-1",
      "children": []
    }
  ],
  "filePathRelative": "index.md",
  "git": {
    "updatedTime": 1638778022000,
    "contributors": [
      {
        "name": "zhanghongan",
        "email": "zhanghongan2021@163.com",
        "commits": 1
      }
    ]
  }
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
