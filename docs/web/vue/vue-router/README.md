---
lang: zh-CN
title: vue-router源码阅读笔记
description: vue-router源码阅读笔记
---

VueRouter构造器最主要的两点：1.创建matcher对象    2.创建history对象

## matcher

matcher实现 match、addRoutes、addRoute、getRoutes的方法

```js

export type Matcher = {
  //调用createRouteMap方法实现以下方法
  addRoutes: (routes: Array<RouteConfig>) => void;
  addRoute: (parentNameOrRoute: string | RouteConfig, route?: RouteConfig) => void;
  getRoutes: () => Array<RouteRecord>;
  
  //传入Location通过规则匹配返回route
  match: (raw: RawLocation, current?: Route, redirectedFrom?: Location) => Route;
};
```

### createRouteMap

> routes  递归调用实现=>   pathList、pathMap、 nameMap   
>
> addRoutes、addRoute、getRoutes 使用同样的方法，把新增内容加入pathList、pathMap、 nameMap

```js
pathList = ['path1', 'path2','alias1']
pathMap = {
  path1: {
    //record1
  },
  path2: {
    //record2
  },
  alias1: {
    //record1 匹配上path的路径
  },
}

nameMap = {
  name1: {
    //record1  
  },
  name2: {
    //record2
  }
}


 const record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions), //匹配规则
    components: route.components || { default: route.component },
    alias: route.alias
      ? typeof route.alias === 'string'
        ? [route.alias]
        : route.alias
      : [],
    instances: {},
    enteredCbs: {},
    name,
    parent,
    matchAs, //
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props:
      route.props == null
        ? {}
        : route.components
        ? route.props
        : { default: route.props },
  }
```

### match

>  传入Location通过规则匹配，从pathList、pathMap、nameMap找到record，封装成route返回

```js
//举例
location = {
   hash: "",
   params: {id: '1'},
   path: "/items/:id/logs",
   name: '',
   query: {}
}


if (name) {
      const record = nameMap[name]
      ...//params结合record.regex中的keys，给path进行赋值，生成完整的path = /items/1/logs
       return _createRoute(record, location, redirectedFrom)
}else{
    //循环pathList
     for (let i = 0; i < pathList.length; i++) {
        const path = pathList[i]
        const record = pathMap[path]
        //匹配规则成功，获取对应的值  
         if (matchRoute(record.regex, location.path, location.params)) {
          return _createRoute(record, location, redirectedFrom)
        }
     }         
}


//_createRoute生成的对象
const route: Route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query,
    params: location.params || {},
    fullPath: (path || '/') + stringify(query) + hash,
    matched: record ? formatMatch(record) : []
  }

//formatMatch方法
function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}
```

## history

根据mode的值，对应不同的实现方式，HTML5History 和  HashHistory

### HashHistory ：使用 URL hash 值来作路由

```js
//go
window.history.go(n)

//replace
    //supportsPushState
window.history.replaceState(key, '', url)
    //else
window.location.replace(url)


//push
     //supportsPushState
 window.history.pushState({ key }, '', url)
     //else
window.location.hash = path

```

### HTML5History：依赖 HTML5 History API 

```js
//go
window.history.go(n)

//replace
window.history.replaceState(key, '', url)

//push
 window.history.pushState({ key }, '', url)

```

pushState：向当前浏览器会话的历史堆栈中添加一个状态（state）

replaceState: 修改当前历史记录实体

### transitionTo

> push、replace会执行transitionTo方法，前进后退go通过监听popstate事件执行transitionTo方法

###### 方法内容：

1. 通过matcher中的match获取将要跳转的route 
2. 根据当前的route和要跳转的route比较，实现导航守卫
3. 把route的值赋值给history.current

### router-view组件

> 在路由改变时，router-view渲染显示路由对应的内容。`render` 函数、Babel 插件用于在 Vue 中使用 JSX 语法

```js
render (_, { props, children, parent, data }) {
     const h = parent.$createElement
     const route = parent.$route
     const matched = route.matched[depth]
     const component = matched && matched.components[name]
     return h(component, data, children)
}
```

## transitionTo导航守卫的实现

### 1.执行resolveQueue方法

传入current.route.matched和要跳转的route.matched ，获取updated, deactivated, activated方法。当前的路径队列和要跳转的路径队列进行对比，`updated`相同的部分，`activated`要跳转的不一样的部分，`deactivated`为当前的不一样的部分（要销毁的部分）。

```js
function resolveQueue (
  current: Array<RouteRecord>,
  next: Array<RouteRecord>
): {
  updated: Array<RouteRecord>,
  activated: Array<RouteRecord>,
  deactivated: Array<RouteRecord>
} {
  let i
  const max = Math.max(current.length, next.length)
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}
```

### 2.收集守卫队列

| 守卫队列位置     | 方法                                                  |
| ---------------- | ----------------------------------------------------- |
| 路由实例注册     | beforeEach、beforeResolve、afterEach                  |
| 路由配置注册     | beforeEnter                                           |
| 组件内的路由守卫 | beforeRouteLeave、beforeRouteUpdate、beforeRouteEnter |

获取对应的路由守卫，按下列顺序放入queue中

```js

const queue: Array<?NavigationGuard> = [].concat(
      // in-component leave guards
      extractLeaveGuards(deactivated),//deactivated（要被摧毁的组件）的beforeRouteLeave   
      // global before hooks
      this.router.beforeHooks,//全局的beforeEach
      // in-component update hooks
      extractUpdateHooks(updated),//updated的beforeRouteUpdate
      // in-config enter guards
      activated.map(m => m.beforeEnter),//activated的beforeEnter
      // async components
      resolveAsyncComponents(activated)//activated的异步组件
    )
```

### 3.执行runQueue方法

1. 迭代器模式来保证遍历队列时每一步都是可控的，fn的第二个参数使迭代器进入下一步，不调用就不会进入下一步

2. 队列完成后执行对应的回调函数，cb为结束时调用的回调函数

```js
/**
 * 函数核心思想：
 * 1. 迭代器模式来保证遍历队列时每一步都是可控的
 * 2. 队列完成后执行对应的回调函数
 * @param {*} queue 
 * @param {*} fn 需要执行的守卫队列
 * @param {*} cb 迭代器函数，守卫队列的每一个守卫都去执行迭代器函数
 */
export function runQueue (queue: Array<?NavigationGuard>, fn: Function, cb: Function) {
  const step = index => {
    // 队列里已经没有内容可以执行了，那就代表队列执行完成了
    if (index >= queue.length) {
      cb()
    } else {
      // 如果队列内容存在就执行迭代函数
      if (queue[index]) {
        fn(queue[index], () => {
          step(index + 1)
        })
      } else {
        // 什么也没有那就到下一步了
        step(index + 1)
      }
    }
  }
  // 启动函数
  step(0)
}
```

### 4.fn方法

```js
  const iterator = (hook: NavigationGuard, next) => {
      try {
        hook(route, current, (to: any) => {
          if (to === false) {
            // next(false) -> abort navigation, ensure current URL
            this.ensureURL(true)
            abort(createNavigationAbortedError(current, route))
          } else if (isError(to)) {
            this.ensureURL(true)
            abort(to)
          } else if (
            typeof to === 'string' ||
            (typeof to === 'object' &&
              (typeof to.path === 'string' || typeof to.name === 'string'))
          ) {
            // next('/') or next({ path: '/' }) -> redirect
            abort(createNavigationRedirectedError(current, route))
            if (typeof to === 'object' && to.replace) {
              this.replace(to)
            } else {
              this.push(to)
            }
          } else {
            // confirm transition and pass on the value
            next(to)
          }
        })
      } catch (e) {
        abort(e)
      }
    }
```

## scrollBehavior

注意: 这个功能只在支持 `history.pushState` 的浏览器中可用。

### scrollRestoration

阻止页面自动滚动恢复行为，防止自动恢复页面位置。

```js
 // Prevent browser scroll behavior on History popstate
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }
```

### 监听popstate事件触发saveScrollPosition

**需要注意的是调用`history.pushState()`或`history.replaceState()`不会触发`popstate`事件。**只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在Javascript代码中调用`history.back()`或者`history.forward()`方法）

key为历史堆栈的state,保存位置至positionStore

```js
 positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
```

### 监听popstate或者hashchange事件触发handleScroll

滚动到原来的位置

```js
 const behavior = router.options.scrollBehavior
 const position = getScrollPosition()//获取位置
 const shouldScroll = behavior.call(//执行scrollBehavior方法
      router,
      to,
      from,
      isPop ? position : null
  )
 ...
 window.scrollTo(position.x, position.y)//滚动
```

## 参考链接

官网API：https://router.vuejs.org/zh/api/#router-addroute

vue-router源码：https://github.com/vuejs/vue-router