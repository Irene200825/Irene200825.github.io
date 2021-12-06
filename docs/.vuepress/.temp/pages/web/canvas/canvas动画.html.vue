<template><h3 id="作者-放荡不羁的bug" tabindex="-1"><a class="header-anchor" href="#作者-放荡不羁的bug" aria-hidden="true">#</a> 作者：放荡不羁的bug</h3>
<h2 id="_1-什么是canvas" tabindex="-1"><a class="header-anchor" href="#_1-什么是canvas" aria-hidden="true">#</a> 1. 什么是canvas</h2>
<ol>
<li><code>canvas</code> 是一个可以使用脚本(通常为 <code>JavaScript</code> 来绘制图形的 <code>HTML</code> 元素.例如,它可以用于绘制图表、制作图片构图或者制作简单的(以及不那么简单的)动画.</li>
<li><code>&lt;canvas&gt;</code> 最早由Apple引入<code>WebKit</code>，用于<code>Mac OS X</code> 的 <code>Dashboard</code>，随后被各个浏览器实现。如今，所有主流的浏览器都支持它。</li>
<li><strong>Canvas API</strong> 提供了一个通过 <code>JavaScript</code> 和 <code>HTML</code> 的 <code>canvas</code> 元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。</li>
</ol>
<h2 id="_2-canvas绘制动画方式" tabindex="-1"><a class="header-anchor" href="#_2-canvas绘制动画方式" aria-hidden="true">#</a> 2. canvas绘制动画方式</h2>
<h3 id="_2-1-webgl" tabindex="-1"><a class="header-anchor" href="#_2-1-webgl" aria-hidden="true">#</a> 2.1. webGL</h3>
<ul>
<li><code>WebGL</code>是基于<code>OpenGL ES 2.0</code>的Web标准，可以通过<code>HTML5 Canvas</code>元素作为DOM接口访问。</li>
<li><code>WebGL</code>可以看做是将<code>OpenGL ES</code>（<code>OpenGL for Embedded Systems</code>，<code>OpenGL</code>嵌入式版本，针对手机、游戏机等设备相对较轻量级的版本）移植到了网页平台</li>
</ul>
<h3 id="_2-2-three-js" tabindex="-1"><a class="header-anchor" href="#_2-2-three-js" aria-hidden="true">#</a> 2.2. Three.js</h3>
<ul>
<li><code>Three.js</code>封装了底层的图形接口，使得程序员能够在无需掌握繁冗的图形学知识的情况下，也能用简单的代码实现三维场景的渲染。</li>
<li>由于<code>Three.js</code>是<code>WebGL</code>的上层封装，所以几乎所有<code>WebGL</code>支持的浏览器<code>Three.js</code>都能够支持</li>
</ul>
<h2 id="_3-three-js实现动画关键核心内容" tabindex="-1"><a class="header-anchor" href="#_3-three-js实现动画关键核心内容" aria-hidden="true">#</a> 3. Three.js实现动画关键核心内容</h2>
<h3 id="_3-1-场景-scene" tabindex="-1"><a class="header-anchor" href="#_3-1-场景-scene" aria-hidden="true">#</a> 3.1. 场景 (scene)</h3>
<p><code>Three.js</code>中场景的概念类似于一个无限大的容器，在场景中，所有的内容（相机、灯光、物体等）都会在其内部布局，它在程序开始的时候实例化，后续除了更新内容没有复杂操作（类似于一间房间的装修，当房子做好后，装修基本上不会对房子结构做出很大改变），所以它的生成也非常简单：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> scene <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Scene</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>执行之后，我们的世界空间就生成了，如果想向世界空间中添加物品时，需要使用 <code>add</code> 函数即可：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>物品对象<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="_3-2-渲染器-renderer" tabindex="-1"><a class="header-anchor" href="#_3-2-渲染器-renderer" aria-hidden="true">#</a> 3.2. 渲染器（Renderer）</h3>
<p>当我们创建世界时，需要将我们造出来的物品一个个放入这个世界，但是这个世界是静态的，无法感知有物品添加，所以我们需要不断刷新这个世界才能获取到最新的状态</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> renderer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>WebGLRenderer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// mainCanvas为canvasid</span>
    canvas<span class="token operator">:</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"mainCanvas"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>如果我们想刷新这个世界状态，我们就可以调用渲染器的 <code>render</code> 方法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> 当前视角摄像机<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="_3-2-相机-camera" tabindex="-1"><a class="header-anchor" href="#_3-2-相机-camera" aria-hidden="true">#</a> 3.2. 相机 (camera)</h3>
<p>世界生成之后，是一个完全封闭的空间，从外部无法观察到其中的内容，所以我们需要一个眼睛代替我们去看这个世界，那么相机就担负了这个责任。</p>
<h4 id="_3-2-1-什么是照相机" tabindex="-1"><a class="header-anchor" href="#_3-2-1-什么是照相机" aria-hidden="true">#</a> 3.2.1. 什么是照相机</h4>
<p>我们使用<code>Three.js</code>创建的场景是三维的，而通常情况下显示屏是二维的，那么三维的场景如何显示到二维的显示屏上呢？照相机就是这样一个抽象，它定义了三维空间到二维屏幕的投影方式，用“照相机”这样一个类比，可以使我们直观地理解这一投影方式。</p>
<p>而针对投影方式的不同，照相机又分为正交投影照相机与透视投影照相机。我们需要为自己的程序选择合适的照相机。</p>
<p><img src="https://i.loli.net/2021/08/12/IHNMstDPoK4epC3.png" alt="camera"></p>
<h4 id="_3-2-2-正交投影照相机" tabindex="-1"><a class="header-anchor" href="#_3-2-2-正交投影照相机" aria-hidden="true">#</a> 3.2.2. 正交投影照相机</h4>
<p>正交投影照相机的视角是一个矩形，它的初始化参数分别为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> camera <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span><span class="token function">OrthographicCamera</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> right<span class="token punctuation">,</span> top<span class="token punctuation">,</span> bottom<span class="token punctuation">,</span> near<span class="token punctuation">,</span> far<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>对于这些参数，下图给出了很形象的表示</p>
<p><img src="https://i.loli.net/2021/08/12/RxzalMXSKcBAoiu.jpg" alt="orthCamera"></p>
<p>上图中，灰色的部分是视景体，也就是我们通过照相机能够看到的区域，我们可以通过设置 <code>near</code> 和 <code>far</code> 控制照相机视距，而通过设置 <code>top</code> 、<code>bottom</code>、<code>left</code>、<code>right</code>，来设置视野大小，在正交投影照相机中，视野的宽高比决定了看到的东西的形状（比如上下高度越大，看到的物体越矮；左右宽度越大，看到的物体越瘦），所以尽量保证宽高比与 <code>canvas</code> 相同。</p>
<h4 id="_3-2-3-透视投影照相机" tabindex="-1"><a class="header-anchor" href="#_3-2-3-透视投影照相机" aria-hidden="true">#</a> 3.2.3. 透视投影照相机</h4>
<p>透视投影照相机的视角更接近于人类的视角，它的可视区域是一个梯形，它的初始化参数为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> camera <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span><span class="token function">PerspectiveCamera</span><span class="token punctuation">(</span>fov<span class="token punctuation">,</span> aspect<span class="token punctuation">,</span> near<span class="token punctuation">,</span> far<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>其视角见下图：</p>
<p><img src="https://i.loli.net/2021/08/12/NwjKkg3WGFIAXpl.jpg" alt="persCamera"></p>
<p>其中 <code>fov</code> 是视景体竖直方向上的张角（是角度制而非弧度制）如侧视图所示</p>
<p><code>aspect</code>等于<code>width / height</code>，是照相机水平方向和竖直方向长度的比值，通常设为 <code>canvas</code> 的横纵比例</p>
<p><code>near</code> 和 <code>far</code> 分别是照相机到视景体最近、最远的距离，均为正值，且<code>far</code>应大于<code>near</code></p>
<h4 id="_3-2-4-如何放置摄像机" tabindex="-1"><a class="header-anchor" href="#_3-2-4-如何放置摄像机" aria-hidden="true">#</a> 3.2.4. 如何放置摄像机</h4>
<p>既然了解了这两个摄像机，那我们应该怎么放置它呢？</p>
<p>其实它和我们现实中的摄像机是一样的，如果我们需要拍摄一张固定场景的时候，我们会将摄像机固定在支架上，然后对着需要拍摄场景就可以了。</p>
<p>而我们创造的世界是可以悬空的，所以我们只需要设置相机的坐标轴就能固定住，然后告诉摄像机看向哪里就可以开始摄影。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 设置相机在坐标位置 (8, 8, 8)</span>
camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 设置相机看向坐标原点 (0, 0, 0)</span>
camera<span class="token punctuation">.</span><span class="token function">lookAt</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Vector3</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 将摄像机放入创建的世界</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>camera<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 刷新当前世界</span>
renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> camera<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="_3-2-图形-geometry" tabindex="-1"><a class="header-anchor" href="#_3-2-图形-geometry" aria-hidden="true">#</a> 3.2. 图形(geometry)</h3>
<p>此时我们有了可看见的视角，但是此时场景内并没有物品，<code>Three.js</code>给了我们很方便的接口创建各种图形，其创建方法如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">THREE</span><span class="token punctuation">.</span><span class="token function">Mesh</span><span class="token punctuation">(</span>geometry<span class="token punctuation">,</span> material<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>其中 <code>geometry</code> 是图形类型，创建方法如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">THREE</span><span class="token punctuation">.</span><span class="token function">Geometry</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><code>Three.js</code> 提供了多种创建图形方式，每一种图形有不同参数：</p>
<p><img src="D:\projects\文章\文章\resource\geometry.jpg" alt="geometry"></p>
<p>具体可见 <a href="http://www.yanhuangxueyuan.com/Three.js_course/geometry.html" target="_blank" rel="noopener noreferrer">几何体对象(三维建模)<OutboundLink/></a></p>
<p>将图形放入世界中的方法与相机相同：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 创建一个正方体，boxMataterial为正方体材料，后续会提到</span>
<span class="token keyword">let</span> box <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>BoxGeometry</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> boxMaterial<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 正方体添加到场景中</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>box<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 刷新世界</span>
renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> camera<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_3-2-材料-material" tabindex="-1"><a class="header-anchor" href="#_3-2-材料-material" aria-hidden="true">#</a> 3.2. 材料(material)</h3>
<p>在上面我们介绍了创建三维图形，但创建出来后，并不能直接显示，就好像一个篮球，我们是通过篮球外皮才能知道篮球是圆的，同理我们需要用一种材料去描述形状，而<code>Three.js</code>给我们提供了多种材料：</p>
<h4 id="_3-2-1-基本材质" tabindex="-1"><a class="header-anchor" href="#_3-2-1-基本材质" aria-hidden="true">#</a> 3.2.1. 基本材质</h4>
<p>使用基本材质（<code>BasicMaterial</code>）的物体，渲染后物体的颜色始终为该材质的颜色，而不会由于光照产生明暗、阴影效果。如果没有指定材质的颜色，则颜色是随机的。其构造函数是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">THREE</span><span class="token punctuation">.</span><span class="token function">MeshBasicMaterial</span><span class="token punctuation">(</span>opt<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>最后显示效果如下图所示：</p>
<p><img src="https://i.loli.net/2021/08/12/I4l2F8BkexWnYDb.jpg" alt="baseMaterial"></p>
<h4 id="_3-2-2-lambert材质" tabindex="-1"><a class="header-anchor" href="#_3-2-2-lambert材质" aria-hidden="true">#</a> 3.2.2. Lambert材质</h4>
<p>Lambert材质（<code>MeshLambertMaterial</code>）是符合Lambert光照模型的材质。Lambert光照模型的主要特点是只考虑漫反射而不考虑镜面反射的效果，因而对于金属、镜子等需要镜面反射效果的物体就不适应，对于其他大部分物体的漫反射效果都是适用的。其构造函数为：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>THREE.MeshLambertMaterial(opt)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>加上光照后显示效果如下图：</p>
<p><img src="https://i.loli.net/2021/08/12/niYgcfZoQwJ3mz5.jpg" alt="lambertMaterial"></p>
<h4 id="_3-2-3-phong材质" tabindex="-1"><a class="header-anchor" href="#_3-2-3-phong材质" aria-hidden="true">#</a> 3.2.3. Phong材质</h4>
<p>Phong材质（<code>MeshPhongMaterial</code>）是符合Phong光照模型的材质。和Lambert不同的是，Phong模型考虑了镜面反射的效果，因此对于金属、镜面的表现尤为适合。其构造函数为：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>THREE.MeshPhongMaterial(opt)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>加上光照后显示效果如下图：</p>
<p><img src="https://i.loli.net/2021/08/12/NhovRg9TplJL86O.jpg" alt="phoneMaterial"></p>
<h4 id="_3-2-4-法相材质" tabindex="-1"><a class="header-anchor" href="#_3-2-4-法相材质" aria-hidden="true">#</a> 3.2.4. 法相材质</h4>
<p>法向材质可以将材质的颜色设置为其法向量的方向，有时候对于调试很有帮助，法向材质的设定很简单，甚至不用设置任何参数：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">THREE</span><span class="token punctuation">.</span><span class="token function">MeshNormalMaterial</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>加上光照后显示效果如下图：</p>
<p><img src="https://i.loli.net/2021/08/12/uD64wrOFUsXpRPk.jpg" alt="normalMaterial"></p>
<h4 id="_3-2-5-材质的纹理贴图" tabindex="-1"><a class="header-anchor" href="#_3-2-5-材质的纹理贴图" aria-hidden="true">#</a> 3.2.5. 材质的纹理贴图</h4>
<p>有时候，我们却希望使用图像作为材质。这时候，就需要导入图像作为纹理贴图，并添加到相应的材质中。Three.js也为我们提供了便利的方法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> texture <span class="token operator">=</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>ImageUtils<span class="token punctuation">.</span><span class="token function">loadTexture</span><span class="token punctuation">(</span><span class="token string">'../img/0.png'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> material <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshLambertMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    map<span class="token operator">:</span> texture
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>此时我们可以看到效果：</p>
<p><img src="https://i.loli.net/2021/08/12/OmxqTHZdGFWyfVh.jpg" alt="imageMaterial"></p>
<h3 id="_3-3-光照" tabindex="-1"><a class="header-anchor" href="#_3-3-光照" aria-hidden="true">#</a> 3.3. 光照</h3>
<p>我们加入了几何体后，会发现完全看不到东西，因为我们创建的世界是没有光的，神说要有光，于是 <code>Three.js</code> 给了我们创造光的工具，在<code>Three.js</code> 中，光分为四类：环境光、点光源、平行光以及聚光灯</p>
<h4 id="_3-3-1-环境光" tabindex="-1"><a class="header-anchor" href="#_3-3-1-环境光" aria-hidden="true">#</a> 3.3.1. 环境光</h4>
<p>环境光是指场景整体的光照效果，是由于场景内若干光源的多次反射形成的亮度一致的效果，通常用来为整个场景指定一个基础亮度。因此，环境光没有明确的光源位置，在各处形成的亮度也是一致的，它类似于我们阴天的光线，没有确定光源，但是能照亮物体，所以能够当做辅助光源使用。</p>
<p><img src="https://i.loli.net/2021/08/12/bvmTVWsJYpjPNFA.jpg" alt="ambientLight"></p>
<p>而它的生成也很简单：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> light <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>AmbientLight</span><span class="token punctuation">(</span>hex<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>其中 <code>hex</code> 为光的颜色</p>
<h4 id="_3-3-2-点光源" tabindex="-1"><a class="header-anchor" href="#_3-3-2-点光源" aria-hidden="true">#</a> 3.3.2. 点光源</h4>
<p>点光源是不计光源大小，可以看作一个点发出的光源。点光源照到不同物体表面的亮度是线性递减的，因此，离点光源距离越远的物体会显得越暗。它类似于灯泡的光，光从一个定点开始四散，灯光强度随着距离逐渐减小。</p>
<p><img src="https://i.loli.net/2021/08/12/L6YilJ1j2h4eGQ5.jpg" alt="pointLight"></p>
<p>其生成方法为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> light <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>PointLight</span><span class="token punctuation">(</span>hex<span class="token punctuation">,</span> intensity<span class="token punctuation">,</span> distance<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>其中 <code>hex</code> 为光源颜色；<code>intensity</code> 为亮度，默认为1，表示100%亮度；<code>distance</code> 为最远照射距离，默认为0。</p>
<h4 id="_3-3-3-平行光" tabindex="-1"><a class="header-anchor" href="#_3-3-3-平行光" aria-hidden="true">#</a> 3.3.3.平行光</h4>
<p>平行光类似于我们感受到的太阳光，虽然太阳光一定程度上是点光源，但我们距离够远，体积够小，所以我们感受到的光照是平行的，它对于任意平行的平面，平行光照射的亮度都是相同的，而与平面所在位置无关</p>
<p><img src="https://i.loli.net/2021/08/12/nVedKmBMJkqAavR.jpg" alt="directionalLight"></p>
<p>其生成方法为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> light <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>DirectionalLight</span><span class="token punctuation">(</span>hex<span class="token punctuation">,</span> intensity<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>其中 <code>hex</code> 为光源颜色；<code>intensity</code> 为亮度，默认为1，表示100%亮度；</p>
<h4 id="_3-3-2-聚光灯" tabindex="-1"><a class="header-anchor" href="#_3-3-2-聚光灯" aria-hidden="true">#</a> 3.3.2. 聚光灯</h4>
<p>聚光灯是一种特殊的点光源，它能够朝着一个方向投射光线。聚光灯投射出的是类似圆锥形的光线，这与我们现实中看到的聚光灯是一致的</p>
<p><img src="https://github.com/Irene200825/Images/main/blog/Images/spotLight.jpg" alt="11"></p>
<p>其生成方法为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> light <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>SpotLight</span><span class="token punctuation">(</span>hex<span class="token punctuation">,</span> intensity<span class="token punctuation">,</span> distance<span class="token punctuation">,</span> angle<span class="token punctuation">,</span> exponent<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>其中 <code>hex</code> 为光源颜色；<code>intensity</code> 为亮度，默认为1，表示100%亮度；<code>distance</code> 为最远照射距离，默认为0；<code>angle</code> 为聚光灯的张角，最大为<code>Math.PI/2</code> 默认为 <code>Math.PI/3</code> ; <code>exponent</code> 为强光偏离 <code>target</code> 衰减指数，默认为10；</p>
<p>在生成聚光灯后，我们需要告诉聚光灯的中心点 <code>target</code> :</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>light.target.position.set(x2, y2, z2);
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>此时聚光灯焦点将会指向该点，如果我们想让聚光灯跟随着一个物体移动，可以将 <code>target</code> 指向物体：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> cube <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>CubeGeometry</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshLambertMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span>color<span class="token operator">:</span> <span class="token number">0x00ff00</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> light <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>SpotLight</span><span class="token punctuation">(</span><span class="token number">0xffff00</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">/</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
light<span class="token punctuation">.</span>target <span class="token operator">=</span> cube<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="_4-开始动画" tabindex="-1"><a class="header-anchor" href="#_4-开始动画" aria-hidden="true">#</a> 4. 开始动画</h2>
<h2 id="_5-three缺点" tabindex="-1"><a class="header-anchor" href="#_5-three缺点" aria-hidden="true">#</a> 5. Three缺点</h2>
<p>开发便利的它，有着很多的优点例如支持TS，面向对象等</p>
<p>但在它为我们开发带来便利的同时，它也存在着一些不方便的地方：</p>
<ul>
<li>中文文档过少，没有比较官方的文档</li>
<li>如果需要使用<code>Three.js</code>做动画，需要一定的数学功底，因为动画的制作一定会涉及到坐标的计算</li>
<li><code>Three.js</code>没有提供强大的引擎能力，所以复杂的动画需要加载渲染很久，体验不是很好</li>
</ul>
<h2 id="_5-参考文档" tabindex="-1"><a class="header-anchor" href="#_5-参考文档" aria-hidden="true">#</a> 5. 参考文档</h2>
<p><a href="https://www.ituring.com.cn/book/1272" target="_blank" rel="noopener noreferrer">Three.js入门指南<OutboundLink/></a> https://www.ituring.com.cn/book/miniarticle/58552</p>
<p><a href="http://www.yanhuangxueyuan.com/Three.js_course.html" target="_blank" rel="noopener noreferrer">Three.js视频教程<OutboundLink/></a> http://www.yanhuangxueyuan.com/Three.js_course.html</p>
</template>
