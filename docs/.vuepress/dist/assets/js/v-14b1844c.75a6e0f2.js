"use strict";(self.webpackChunkvuepress_custom=self.webpackChunkvuepress_custom||[]).push([[340],{1198:(e,n,s)=>{s.r(n),s.d(n,{data:()=>a});const a={key:"v-14b1844c",path:"/web/blog/%E5%A6%82%E4%BD%95%E5%85%8D%E8%B4%B9%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2.html",title:"搭建博客(方案：github + Hexo)",lang:"en-US",frontmatter:{},excerpt:"",headers:[],filePathRelative:"web/blog/如何免费搭建个人博客.md",git:{updatedTime:1638780646e3,contributors:[{name:"zhanghongan",email:"zhanghongan2021@163.com",commits:1}]}}},1477:(e,n,s)=>{s.r(n),s.d(n,{default:()=>L});var a=s(6252);const l=(0,a._)("h1",{id:"搭建博客-方案-github-hexo",tabindex:"-1"},[(0,a._)("a",{class:"header-anchor",href:"#搭建博客-方案-github-hexo","aria-hidden":"true"},"#"),(0,a.Uk)(" 搭建博客(方案：github + Hexo)")],-1),i=(0,a.Uk)("创建一个GitHub Pages site，具体可以参考"),r={href:"https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#creating-a-repository-for-your-site",target:"_blank",rel:"noopener noreferrer"},p=(0,a.Uk)("官方文档"),t=(0,a._)("p",null,"特别注意，创建的repository名字必须是user.github.io",-1),o=(0,a._)("p",null,"葡萄本人的是Irene20I0825，所以仓库的名字是Irene20I0825.github.io",-1),u=(0,a._)("p",null,[(0,a._)("img",{src:"https://github.com/Irene200825/Images/main/blog/Images/kN1yYVGtmAQ9XRT.png",alt:"创建仓库"})],-1),c=(0,a._)("p",null,"本地新建",-1),h=(0,a.Uk)("一个文件夹，执行以下命令，具体可以参考"),d={href:"https://hexo.io/zh-cn/index.html",target:"_blank",rel:"noopener noreferrer"},b=(0,a.Uk)("官方文档"),g=(0,a.uE)('<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> hexo-cli -g //下载安装hexo-cli之后，命令行的命令是hexo\n$ hexo init blog //创建博客项目\n$ <span class="token builtin class-name">cd</span> blog //进入博客项目\n$ hexo generate  //监视文件变动并立即重新生成静态文件\n$ hexo server //启动本地服务\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>随后浏览器打开http://localhost:4000/就可以进入自己的博客</p><p><img src="https://i.loli.net/2021/08/06/HJrptXLdCvYmUIk.png" alt="项目目录"></p><p><img src="https://i.loli.net/2021/08/07/61pYoBTcmwWatGk.png" alt="本地博客"></p>',4),m=(0,a.uE)('<p>把上一步生成的静态文件public中的内容同步到我们的仓库中</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ ssh-keygen -t rsa -C <span class="token string">&quot;Github的注册邮箱地址&quot;</span> //给github添加ssh\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>执行上面的命令，在返回结果的结果中找到.ssh/id_rsa.pub.文件位置，拷贝该文件内容</p>',3),_=(0,a.Uk)("点击进入"),k={href:"https://github.com/settings/keys",target:"_blank",rel:"noopener noreferrer"},v=(0,a.Uk)("页面"),x=(0,a.Uk)("，点击右上角的 new ssh key按钮，把拷贝的内容填入key的输入框中，点击Add SSH key按钮"),f=(0,a.uE)('<p>在项目中找到_config.yml文件，修改以下信息</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">deploy</span><span class="token punctuation">:</span> \n  <span class="token key atrule">type</span><span class="token punctuation">:</span> git\n  <span class="token key atrule">repo</span><span class="token punctuation">:</span> 填入你的仓库地址\n  <span class="token key atrule">branch</span><span class="token punctuation">:</span> 填入你仓库的分支名\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>执行部署命令</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ hexo deploy\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div>',4),y=(0,a._)("li",null,[(0,a._)("p",null,"部署成功后，浏览器输入https://user.github.io/，就可以访问你自己的博客啦~~~")],-1),E=(0,a.uE)('<hr><h1 id="新建博客" tabindex="-1"><a class="header-anchor" href="#新建博客" aria-hidden="true">#</a> 新建博客</h1><ol><li><p>新建一个md文件</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ hexo new <span class="token string">&quot;如何免费搭建个人博客&quot;</span> \n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li><li><p>在项目source/_posts目录下找到这个md文件，进行编辑</p><p>额外安利一个markdown编辑器：Typora，在文件-偏好设置-图像中可以设置上传服务PicGo。在该编辑器中导入图片会自动把图片上传到PicGo设置的图床上。</p><p><img src="https://i.loli.net/2021/08/06/sFfyEdQikMt6T24.png" alt="设置上传服务PicGo"></p></li><li><p>本地运行服务，查看博客</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ hexo server\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li><li><p>最后别忘记把更改内容同步到仓库</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ hexo generate\n$ hexo deploy\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ol><hr><h1 id="删除博客" tabindex="-1"><a class="header-anchor" href="#删除博客" aria-hidden="true">#</a> 删除博客</h1><ol><li><p>在source/_post中删除文件</p></li><li><p>更改内容同步到仓库</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ hexo generate\n$ hexo deploy\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ol><hr><h1 id="更换主题" tabindex="-1"><a class="header-anchor" href="#更换主题" aria-hidden="true">#</a> 更换主题</h1><p><img src="https://i.loli.net/2021/08/07/oaqIWfDVb6psPSY.png" alt="葡萄的博客"></p><p>上面这张图是葡萄现在的博客，是不是比最初的好看很多。我们可以搜索Hexo主题，选择一款自己喜欢的主题来装饰我们的博客。</p><p>葡萄选择使用了一款人气特高的icarus主题，整体风格简洁精致的同时兼容h5页面。</p><ol><li><p>在项目中执行以下命令：</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> hexo-theme-icarus\n$ hexo config theme icarus\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li><li><p>在_config.yml文件中把theme改为icarus</p></li><li><p>本地运行服务，查看博客</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ hexo server\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li><li><p>最后别忘记把更改内容同步到仓库</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ hexo generate\n$ hexo deploy\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ol><hr><h1 id="icarus主题配置" tabindex="-1"><a class="header-anchor" href="#icarus主题配置" aria-hidden="true">#</a> icarus主题配置</h1>',14),U=(0,a.Uk)("点击查看相关"),$={href:"https://ppoffice.github.io/hexo-theme-icarus/tags/Icarus%E7%94%A8%E6%88%B7%E6%8C%87%E5%8D%97/",target:"_blank",rel:"noopener noreferrer"},w=(0,a.Uk)("配置指南"),A=(0,a._)("hr",null,null,-1),B=(0,a._)("h1",{id:"文章添加评论",tabindex:"-1"},[(0,a._)("a",{class:"header-anchor",href:"#文章添加评论","aria-hidden":"true"},"#"),(0,a.Uk)(" 文章添加评论")],-1),I=(0,a.Uk)("点击进入"),D={href:"https://github.com/settings/applications/new",target:"_blank",rel:"noopener noreferrer"},H=(0,a.Uk)("页面"),G=(0,a.Uk)("，填写内容如下"),P=(0,a._)("p",null,[(0,a._)("img",{src:"https://i.loli.net/2021/08/07/fmX9GayD4StnA8O.png",alt:"Register a new OAuth application"})],-1),W=(0,a._)("li",null,[(0,a._)("p",null,"修改项目中的_config.icarus.yml文件的comment部分"),(0,a._)("p",null,[(0,a._)("img",{src:"https://i.loli.net/2021/08/07/8M195Nyoxa72PtE.png",alt:"配置"})]),(0,a._)("p",null,"注意：repo为评论仓库，仓库必须是开启issue的")],-1),C=(0,a._)("li",null,[(0,a._)("p",null,"Error:Bad credentials问题"),(0,a._)("p",null,[(0,a._)("img",{src:"https://i.loli.net/2021/08/07/EotaqQ2DCYA7Ufb.png",alt:"Error:Bad credentials"})]),(0,a._)("p",null,"可以打开浏览器控制台network，查看请求地址https://api.github.com/repos/owener/repo/issues，如果地址不对，很可能是配置中owner没有小写导致的")],-1),q=(0,a._)("li",null,[(0,a._)("p",null,"查看效果"),(0,a._)("p",null,[(0,a._)("img",{src:"https://i.loli.net/2021/08/07/NZfROC2IsPzw37H.png",alt:"效果"})])],-1),T=(0,a._)("hr",null,null,-1),Y=(0,a._)("h1",{id:"页面定制化",tabindex:"-1"},[(0,a._)("a",{class:"header-anchor",href:"#页面定制化","aria-hidden":"true"},"#"),(0,a.Uk)(" 页面定制化")],-1),O=(0,a._)("p",null,"如果在主题的基础上又额外的需求，比如雪花效果、添加动漫妹子、定制化的样式，可以修改主题的源码达到效果",-1),R=(0,a.Uk)("点击前往"),S={href:"https://github.com/ppoffice/hexo-theme-icarus",target:"_blank",rel:"noopener noreferrer"},z=(0,a.Uk)("icarus主题源码"),N=(0,a.Uk)("页面，下载源码放在themes中，名字修改为theme的值"),M=(0,a._)("p",null,[(0,a._)("img",{src:"https://i.loli.net/2021/08/06/Ms17RJTNhkBf5Ha.png",alt:"image-20210806200135395"})],-1),Q=(0,a._)("li",null,[(0,a._)("p",null,"修改对应的源码")],-1),X=(0,a._)("li",null,[(0,a._)("p",null,"本地运行服务，查看博客"),(0,a._)("div",{class:"language-bash ext-sh line-numbers-mode"},[(0,a._)("pre",{class:"language-bash"},[(0,a._)("code",null,"$ hexo server\n")]),(0,a._)("div",{class:"line-numbers"},[(0,a._)("span",{class:"line-number"},"1"),(0,a._)("br")])])],-1),Z=(0,a._)("hr",null,null,-1),J={},L=(0,s(3744).Z)(J,[["render",function(e,n){const s=(0,a.up)("OutboundLink");return(0,a.wg)(),(0,a.iD)(a.HY,null,[l,(0,a._)("ol",null,[(0,a._)("li",null,[(0,a._)("p",null,[i,(0,a._)("a",r,[p,(0,a.Wm)(s)])]),t,o,u]),(0,a._)("li",null,[c,(0,a._)("p",null,[h,(0,a._)("a",d,[b,(0,a.Wm)(s)])]),g]),(0,a._)("li",null,[m,(0,a._)("p",null,[_,(0,a._)("a",k,[v,(0,a.Wm)(s)]),x]),f]),y]),E,(0,a._)("p",null,[U,(0,a._)("a",$,[w,(0,a.Wm)(s)])]),A,B,(0,a._)("ol",null,[(0,a._)("li",null,[(0,a._)("p",null,[I,(0,a._)("a",D,[H,(0,a.Wm)(s)]),G]),P]),W,C,q]),T,Y,O,(0,a._)("ol",null,[(0,a._)("li",null,[(0,a._)("p",null,[R,(0,a._)("a",S,[z,(0,a.Wm)(s)]),N]),M]),Q,X]),Z],64)}]])},3744:(e,n)=>{n.Z=(e,n)=>{const s=e.__vccOpts||e;for(const[e,a]of n)s[e]=a;return s}}}]);