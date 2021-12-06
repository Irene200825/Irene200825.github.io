### 作者：放荡不羁的bug

## 1. 什么是canvas

1. `canvas` 是一个可以使用脚本(通常为 `JavaScript` 来绘制图形的 `HTML` 元素.例如,它可以用于绘制图表、制作图片构图或者制作简单的(以及不那么简单的)动画.
2.  `<canvas>` 最早由Apple引入`WebKit`，用于`Mac OS X` 的 `Dashboard`，随后被各个浏览器实现。如今，所有主流的浏览器都支持它。
3. **Canvas API** 提供了一个通过 `JavaScript` 和 `HTML` 的 `canvas` 元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。

## 2. canvas绘制动画方式

### 2.1. webGL

- `WebGL`是基于`OpenGL ES 2.0`的Web标准，可以通过`HTML5 Canvas`元素作为DOM接口访问。
- `WebGL`可以看做是将`OpenGL ES`（`OpenGL for Embedded Systems`，`OpenGL`嵌入式版本，针对手机、游戏机等设备相对较轻量级的版本）移植到了网页平台

### 2.2. Three.js

- `Three.js`封装了底层的图形接口，使得程序员能够在无需掌握繁冗的图形学知识的情况下，也能用简单的代码实现三维场景的渲染。
- 由于`Three.js`是`WebGL`的上层封装，所以几乎所有`WebGL`支持的浏览器`Three.js`都能够支持

## 3. Three.js实现动画关键核心内容

### 3.1. 场景 (scene)

`Three.js`中场景的概念类似于一个无限大的容器，在场景中，所有的内容（相机、灯光、物体等）都会在其内部布局，它在程序开始的时候实例化，后续除了更新内容没有复杂操作（类似于一间房间的装修，当房子做好后，装修基本上不会对房子结构做出很大改变），所以它的生成也非常简单：

```javascript
let scene = new THREE.Scene()
```

执行之后，我们的世界空间就生成了，如果想向世界空间中添加物品时，需要使用 `add` 函数即可：

```javascript
scene.add(物品对象);
```



### 3.2. 渲染器（Renderer）

当我们创建世界时，需要将我们造出来的物品一个个放入这个世界，但是这个世界是静态的，无法感知有物品添加，所以我们需要不断刷新这个世界才能获取到最新的状态

```javascript
let renderer = new THREE.WebGLRenderer({
    // mainCanvas为canvasid
    canvas: document.getElementById("mainCanvas"),
})
```

如果我们想刷新这个世界状态，我们就可以调用渲染器的 `render` 方法：

```javascript
renderer.render(scene, 当前视角摄像机)
```

### 3.2. 相机 (camera)

世界生成之后，是一个完全封闭的空间，从外部无法观察到其中的内容，所以我们需要一个眼睛代替我们去看这个世界，那么相机就担负了这个责任。

#### 3.2.1. 什么是照相机

我们使用`Three.js`创建的场景是三维的，而通常情况下显示屏是二维的，那么三维的场景如何显示到二维的显示屏上呢？照相机就是这样一个抽象，它定义了三维空间到二维屏幕的投影方式，用“照相机”这样一个类比，可以使我们直观地理解这一投影方式。

而针对投影方式的不同，照相机又分为正交投影照相机与透视投影照相机。我们需要为自己的程序选择合适的照相机。

![camera](https://i.loli.net/2021/08/12/IHNMstDPoK4epC3.png)

#### 3.2.2. 正交投影照相机

正交投影照相机的视角是一个矩形，它的初始化参数分别为：

```javascript
let camera = THREE.OrthographicCamera(left, right, top, bottom, near, far)
```

对于这些参数，下图给出了很形象的表示

![orthCamera](https://i.loli.net/2021/08/12/RxzalMXSKcBAoiu.jpg)

上图中，灰色的部分是视景体，也就是我们通过照相机能够看到的区域，我们可以通过设置 `near` 和 `far` 控制照相机视距，而通过设置 `top` 、`bottom`、`left`、`right`，来设置视野大小，在正交投影照相机中，视野的宽高比决定了看到的东西的形状（比如上下高度越大，看到的物体越矮；左右宽度越大，看到的物体越瘦），所以尽量保证宽高比与 `canvas` 相同。

#### 3.2.3. 透视投影照相机

透视投影照相机的视角更接近于人类的视角，它的可视区域是一个梯形，它的初始化参数为：

```javascript
let camera = THREE.PerspectiveCamera(fov, aspect, near, far)
```

其视角见下图：

![persCamera](https://i.loli.net/2021/08/12/NwjKkg3WGFIAXpl.jpg)

其中 `fov` 是视景体竖直方向上的张角（是角度制而非弧度制）如侧视图所示

`aspect`等于`width / height`，是照相机水平方向和竖直方向长度的比值，通常设为 `canvas` 的横纵比例

 `near` 和 `far` 分别是照相机到视景体最近、最远的距离，均为正值，且`far`应大于`near` 

#### 3.2.4. 如何放置摄像机

既然了解了这两个摄像机，那我们应该怎么放置它呢？

其实它和我们现实中的摄像机是一样的，如果我们需要拍摄一张固定场景的时候，我们会将摄像机固定在支架上，然后对着需要拍摄场景就可以了。

而我们创造的世界是可以悬空的，所以我们只需要设置相机的坐标轴就能固定住，然后告诉摄像机看向哪里就可以开始摄影。

```javascript
// 设置相机在坐标位置 (8, 8, 8)
camera.position.set(8, 8, 8);
// 设置相机看向坐标原点 (0, 0, 0)
camera.lookAt(new THREE.Vector3(0, 0, 0));
// 将摄像机放入创建的世界
scene.add(camera);
// 刷新当前世界
renderer.render(scene, camera);
```

### 3.2. 图形(geometry)

此时我们有了可看见的视角，但是此时场景内并没有物品，`Three.js`给了我们很方便的接口创建各种图形，其创建方法如下：

```javascript
THREE.Mesh(geometry, material)
```

其中 `geometry` 是图形类型，创建方法如下：

```javascript
THREE.Geometry(param)
```

`Three.js` 提供了多种创建图形方式，每一种图形有不同参数：

![geometry](D:\projects\文章\文章\resource\geometry.jpg)

具体可见 [几何体对象(三维建模)](http://www.yanhuangxueyuan.com/Three.js_course/geometry.html) 

将图形放入世界中的方法与相机相同：

```javascript
// 创建一个正方体，boxMataterial为正方体材料，后续会提到
let box = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), boxMaterial);
// 正方体添加到场景中
scene.add(box);
// 刷新世界
renderer.render(scene, camera);
```

### 3.2. 材料(material)

在上面我们介绍了创建三维图形，但创建出来后，并不能直接显示，就好像一个篮球，我们是通过篮球外皮才能知道篮球是圆的，同理我们需要用一种材料去描述形状，而`Three.js`给我们提供了多种材料：

#### 3.2.1. 基本材质

使用基本材质（`BasicMaterial`）的物体，渲染后物体的颜色始终为该材质的颜色，而不会由于光照产生明暗、阴影效果。如果没有指定材质的颜色，则颜色是随机的。其构造函数是：

```javascript
THREE.MeshBasicMaterial(opt)
```

最后显示效果如下图所示：

![baseMaterial](https://i.loli.net/2021/08/12/I4l2F8BkexWnYDb.jpg)

#### 3.2.2. Lambert材质

Lambert材质（`MeshLambertMaterial`）是符合Lambert光照模型的材质。Lambert光照模型的主要特点是只考虑漫反射而不考虑镜面反射的效果，因而对于金属、镜子等需要镜面反射效果的物体就不适应，对于其他大部分物体的漫反射效果都是适用的。其构造函数为：

```
THREE.MeshLambertMaterial(opt)
```

加上光照后显示效果如下图：

![lambertMaterial](https://i.loli.net/2021/08/12/niYgcfZoQwJ3mz5.jpg)

#### 3.2.3. Phong材质

Phong材质（`MeshPhongMaterial`）是符合Phong光照模型的材质。和Lambert不同的是，Phong模型考虑了镜面反射的效果，因此对于金属、镜面的表现尤为适合。其构造函数为：

```
THREE.MeshPhongMaterial(opt)
```

加上光照后显示效果如下图：

![phoneMaterial](https://i.loli.net/2021/08/12/NhovRg9TplJL86O.jpg)

#### 3.2.4. 法相材质

法向材质可以将材质的颜色设置为其法向量的方向，有时候对于调试很有帮助，法向材质的设定很简单，甚至不用设置任何参数：

```javascript
THREE.MeshNormalMaterial()
```

加上光照后显示效果如下图：

![normalMaterial](https://i.loli.net/2021/08/12/uD64wrOFUsXpRPk.jpg)

#### 3.2.5. 材质的纹理贴图

有时候，我们却希望使用图像作为材质。这时候，就需要导入图像作为纹理贴图，并添加到相应的材质中。Three.js也为我们提供了便利的方法：

```javascript
var texture = THREE.ImageUtils.loadTexture('../img/0.png');
var material = new THREE.MeshLambertMaterial({
    map: texture
});
```

此时我们可以看到效果：

![imageMaterial](https://i.loli.net/2021/08/12/OmxqTHZdGFWyfVh.jpg)

### 3.3. 光照

我们加入了几何体后，会发现完全看不到东西，因为我们创建的世界是没有光的，神说要有光，于是 `Three.js` 给了我们创造光的工具，在`Three.js` 中，光分为四类：环境光、点光源、平行光以及聚光灯

#### 3.3.1. 环境光

环境光是指场景整体的光照效果，是由于场景内若干光源的多次反射形成的亮度一致的效果，通常用来为整个场景指定一个基础亮度。因此，环境光没有明确的光源位置，在各处形成的亮度也是一致的，它类似于我们阴天的光线，没有确定光源，但是能照亮物体，所以能够当做辅助光源使用。

![ambientLight](https://i.loli.net/2021/08/12/bvmTVWsJYpjPNFA.jpg)

而它的生成也很简单：

```javascript
let light = new THREE.AmbientLight(hex);
```

其中 `hex` 为光的颜色

#### 3.3.2. 点光源

点光源是不计光源大小，可以看作一个点发出的光源。点光源照到不同物体表面的亮度是线性递减的，因此，离点光源距离越远的物体会显得越暗。它类似于灯泡的光，光从一个定点开始四散，灯光强度随着距离逐渐减小。

![pointLight](https://i.loli.net/2021/08/12/L6YilJ1j2h4eGQ5.jpg)

其生成方法为：

```javascript
let light = new THREE.PointLight(hex, intensity, distance);
```

其中 `hex` 为光源颜色；`intensity` 为亮度，默认为1，表示100%亮度；`distance` 为最远照射距离，默认为0。

#### 3.3.3.平行光

平行光类似于我们感受到的太阳光，虽然太阳光一定程度上是点光源，但我们距离够远，体积够小，所以我们感受到的光照是平行的，它对于任意平行的平面，平行光照射的亮度都是相同的，而与平面所在位置无关

![directionalLight](https://i.loli.net/2021/08/12/nVedKmBMJkqAavR.jpg)

其生成方法为：

```javascript
let light = new THREE.DirectionalLight(hex, intensity)
```

其中 `hex` 为光源颜色；`intensity` 为亮度，默认为1，表示100%亮度；

#### 3.3.2. 聚光灯

聚光灯是一种特殊的点光源，它能够朝着一个方向投射光线。聚光灯投射出的是类似圆锥形的光线，这与我们现实中看到的聚光灯是一致的

![11](https://github.com/Irene200825/Images/main/blog/Images/spotLight.jpg)

其生成方法为：

```javascript
let light = new THREE.SpotLight(hex, intensity, distance, angle, exponent)
```

其中 `hex` 为光源颜色；`intensity` 为亮度，默认为1，表示100%亮度；`distance` 为最远照射距离，默认为0；`angle` 为聚光灯的张角，最大为`Math.PI/2` 默认为 `Math.PI/3` ; `exponent` 为强光偏离 `target` 衰减指数，默认为10；

在生成聚光灯后，我们需要告诉聚光灯的中心点 `target` :

```
light.target.position.set(x2, y2, z2);
```

此时聚光灯焦点将会指向该点，如果我们想让聚光灯跟随着一个物体移动，可以将 `target` 指向物体：

```javascript
var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
new THREE.MeshLambertMaterial({color: 0x00ff00}));

var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
light.target = cube;
```



## 4. 开始动画



## 5. Three缺点

开发便利的它，有着很多的优点例如支持TS，面向对象等

但在它为我们开发带来便利的同时，它也存在着一些不方便的地方：

- 中文文档过少，没有比较官方的文档
- 如果需要使用`Three.js`做动画，需要一定的数学功底，因为动画的制作一定会涉及到坐标的计算
- `Three.js`没有提供强大的引擎能力，所以复杂的动画需要加载渲染很久，体验不是很好

## 5. 参考文档

[Three.js入门指南](https://www.ituring.com.cn/book/1272) https://www.ituring.com.cn/book/miniarticle/58552

[Three.js视频教程](http://www.yanhuangxueyuan.com/Three.js_course.html) http://www.yanhuangxueyuan.com/Three.js_course.html



