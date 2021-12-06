<template><h1 id="搭建博客-方案-github-hexo" tabindex="-1"><a class="header-anchor" href="#搭建博客-方案-github-hexo" aria-hidden="true">#</a> 搭建博客(方案：github + Hexo)</h1>
<ol>
<li>
<p>创建一个GitHub Pages site，具体可以参考<a href="https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#creating-a-repository-for-your-site" target="_blank" rel="noopener noreferrer">官方文档<OutboundLink/></a></p>
<p>特别注意，创建的repository名字必须是user.github.io</p>
<p>葡萄本人的是Irene20I0825，所以仓库的名字是Irene20I0825.github.io</p>
<p><img src="https://github.com/Irene200825/Images/main/blog/Images/kN1yYVGtmAQ9XRT.png" alt="创建仓库"></p>
</li>
<li>
<p>本地新建</p>
<p>一个文件夹，执行以下命令，具体可以参考<a href="https://hexo.io/zh-cn/index.html" target="_blank" rel="noopener noreferrer">官方文档<OutboundLink/></a></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> hexo-cli -g //下载安装hexo-cli之后，命令行的命令是hexo
$ hexo init blog //创建博客项目
$ <span class="token builtin class-name">cd</span> blog //进入博客项目
$ hexo generate  //监视文件变动并立即重新生成静态文件
$ hexo server //启动本地服务
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>随后浏览器打开http://localhost:4000/就可以进入自己的博客</p>
<p><img src="https://i.loli.net/2021/08/06/HJrptXLdCvYmUIk.png" alt="项目目录"></p>
<p><img src="https://i.loli.net/2021/08/07/61pYoBTcmwWatGk.png" alt="本地博客"></p>
</li>
<li>
<p>把上一步生成的静态文件public中的内容同步到我们的仓库中</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ssh-keygen -t rsa -C <span class="token string">"Github的注册邮箱地址"</span> //给github添加ssh
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>执行上面的命令，在返回结果的结果中找到.ssh/id_rsa.pub.文件位置，拷贝该文件内容</p>
<p>点击进入<a href="https://github.com/settings/keys" target="_blank" rel="noopener noreferrer">页面<OutboundLink/></a>，点击右上角的 new ssh key按钮，把拷贝的内容填入key的输入框中，点击Add SSH key按钮</p>
<p>在项目中找到_config.yml文件，修改以下信息</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">deploy</span><span class="token punctuation">:</span> 
  <span class="token key atrule">type</span><span class="token punctuation">:</span> git
  <span class="token key atrule">repo</span><span class="token punctuation">:</span> 填入你的仓库地址
  <span class="token key atrule">branch</span><span class="token punctuation">:</span> 填入你仓库的分支名
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>执行部署命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ hexo deploy
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li>
<li>
<p>部署成功后，浏览器输入https://user.github.io/，就可以访问你自己的博客啦~~~</p>
</li>
</ol>
<hr>
<h1 id="新建博客" tabindex="-1"><a class="header-anchor" href="#新建博客" aria-hidden="true">#</a> 新建博客</h1>
<ol>
<li>
<p>新建一个md文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ hexo new <span class="token string">"如何免费搭建个人博客"</span> 
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li>
<li>
<p>在项目source/_posts目录下找到这个md文件，进行编辑</p>
<p>额外安利一个markdown编辑器：Typora，在文件-偏好设置-图像中可以设置上传服务PicGo。在该编辑器中导入图片会自动把图片上传到PicGo设置的图床上。</p>
<p><img src="https://i.loli.net/2021/08/06/sFfyEdQikMt6T24.png" alt="设置上传服务PicGo"></p>
</li>
<li>
<p>本地运行服务，查看博客</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ hexo server
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li>
<li>
<p>最后别忘记把更改内容同步到仓库</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ hexo generate
$ hexo deploy
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
</ol>
<hr>
<h1 id="删除博客" tabindex="-1"><a class="header-anchor" href="#删除博客" aria-hidden="true">#</a> 删除博客</h1>
<ol>
<li>
<p>在source/_post中删除文件</p>
</li>
<li>
<p>更改内容同步到仓库</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ hexo generate
$ hexo deploy
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
</ol>
<hr>
<h1 id="更换主题" tabindex="-1"><a class="header-anchor" href="#更换主题" aria-hidden="true">#</a> 更换主题</h1>
<p><img src="https://i.loli.net/2021/08/07/oaqIWfDVb6psPSY.png" alt="葡萄的博客"></p>
<p>上面这张图是葡萄现在的博客，是不是比最初的好看很多。我们可以搜索Hexo主题，选择一款自己喜欢的主题来装饰我们的博客。</p>
<p>葡萄选择使用了一款人气特高的icarus主题，整体风格简洁精致的同时兼容h5页面。</p>
<ol>
<li>
<p>在项目中执行以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> hexo-theme-icarus
$ hexo config theme icarus
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
<li>
<p>在_config.yml文件中把theme改为icarus</p>
</li>
<li>
<p>本地运行服务，查看博客</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ hexo server
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li>
<li>
<p>最后别忘记把更改内容同步到仓库</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ hexo generate
$ hexo deploy
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
</ol>
<hr>
<h1 id="icarus主题配置" tabindex="-1"><a class="header-anchor" href="#icarus主题配置" aria-hidden="true">#</a> icarus主题配置</h1>
<p>点击查看相关<a href="https://ppoffice.github.io/hexo-theme-icarus/tags/Icarus%E7%94%A8%E6%88%B7%E6%8C%87%E5%8D%97/" target="_blank" rel="noopener noreferrer">配置指南<OutboundLink/></a></p>
<hr>
<h1 id="文章添加评论" tabindex="-1"><a class="header-anchor" href="#文章添加评论" aria-hidden="true">#</a> 文章添加评论</h1>
<ol>
<li>
<p>点击进入<a href="https://github.com/settings/applications/new" target="_blank" rel="noopener noreferrer">页面<OutboundLink/></a>，填写内容如下</p>
<p><img src="https://i.loli.net/2021/08/07/fmX9GayD4StnA8O.png" alt="Register a new OAuth application"></p>
</li>
<li>
<p>修改项目中的_config.icarus.yml文件的comment部分</p>
<p><img src="https://i.loli.net/2021/08/07/8M195Nyoxa72PtE.png" alt="配置"></p>
<p>注意：repo为评论仓库，仓库必须是开启issue的</p>
</li>
<li>
<p>Error:Bad credentials问题</p>
<p><img src="https://i.loli.net/2021/08/07/EotaqQ2DCYA7Ufb.png" alt="Error:Bad credentials"></p>
<p>可以打开浏览器控制台network，查看请求地址https://api.github.com/repos/owener/repo/issues，如果地址不对，很可能是配置中owner没有小写导致的</p>
</li>
<li>
<p>查看效果</p>
<p><img src="https://i.loli.net/2021/08/07/NZfROC2IsPzw37H.png" alt="效果"></p>
</li>
</ol>
<hr>
<h1 id="页面定制化" tabindex="-1"><a class="header-anchor" href="#页面定制化" aria-hidden="true">#</a> 页面定制化</h1>
<p>如果在主题的基础上又额外的需求，比如雪花效果、添加动漫妹子、定制化的样式，可以修改主题的源码达到效果</p>
<ol>
<li>
<p>点击前往<a href="https://github.com/ppoffice/hexo-theme-icarus" target="_blank" rel="noopener noreferrer">icarus主题源码<OutboundLink/></a>页面，下载源码放在themes中，名字修改为theme的值</p>
<p><img src="https://i.loli.net/2021/08/06/Ms17RJTNhkBf5Ha.png" alt="image-20210806200135395"></p>
</li>
<li>
<p>修改对应的源码</p>
</li>
<li>
<p>本地运行服务，查看博客</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ hexo server
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li>
</ol>
<hr>
</template>
