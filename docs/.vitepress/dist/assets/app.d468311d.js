import{Z as p,s as o,$ as u,a0 as c,a1 as l,a2 as d,a3 as f,a4 as m,a5 as h,a6 as A,a7 as y,a8 as g,a9 as P,d as v,u as w,j as C,y as R,aa as _,ab as b,ac as D}from"./chunks/framework.23b60374.js";import{t as r}from"./chunks/theme.89001aef.js";const E={extends:r,Layout:()=>p(r.Layout,null,{}),enhanceApp({app:e,router:t,siteData:a}){}};function i(e){if(e.extends){const t=i(e.extends);return{...t,...e,async enhanceApp(a){t.enhanceApp&&await t.enhanceApp(a),e.enhanceApp&&await e.enhanceApp(a)}}}return e}const s=i(E),L=v({name:"VitePressApp",setup(){const{site:e}=w();return C(()=>{R(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),_(),b(),D(),s.setup&&s.setup(),()=>p(s.Layout)}});async function T(){const e=x(),t=j();t.provide(c,e);const a=l(e.route);return t.provide(d,a),t.component("Content",f),t.component("ClientOnly",m),Object.defineProperties(t.config.globalProperties,{$frontmatter:{get(){return a.frontmatter.value}},$params:{get(){return a.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:t,router:e,siteData:h}),{app:t,router:e,data:a}}function j(){return A(L)}function x(){let e=o,t;return y(a=>{let n=g(a);return n?(e&&(t=n),(e||t===n)&&(n=n.replace(/\.js$/,".lean.js")),o&&(e=!1),P(()=>import(n),[])):null},s.NotFound)}o&&T().then(({app:e,router:t,data:a})=>{t.go().then(()=>{u(t.route,a.site),e.mount("#app")})});export{T as createApp};
