---
title: 动态数据获取方案：SSE、WebSoket
date: 2021-10-13 17:46:51
author: 放荡不羁的bug
toc: true
tag: SSE、WebSoket
categories: SSE、WebSoket
excerpt: 动态数据获取方案：SSE、WebSoket
---

## 前述

在项目需求中，我们常常能够遇到需要实时获取状态的需求，例如获取某某任务是否完成状态，或者当其他用户做出操作时，界面需要实时提醒，这些需求通常需要我们实时地从后台取得当前状态，但由于 `HTTP` 请求是单向的（只能由客户端发起），所以通常使用轮询的方式去获取最新状态，这样的获取方式需要一直发送请求，无端增大浏览器与服务器性能消耗，明显不是很好的解决方案，本文将会介绍通过介绍及简单实现 `SSE`及 `WebSoket`  两种方案介绍非轮询式动态数据获取方案。

## 技术介绍

### WebSoket

`WebSoket` 是前端比较常见的技术，其通过独立端口与服务器连接，实现服务器与客户端全双工通信，能够更好的节省服务器资源及带宽，连接时客户端主动发起 `WebSoket` 连接请求，连接后服务器与客户端可双向通信，如想关闭连接，客户端也可发送连接主动关闭请求，当前 `node` 实现 `WebSoket` 工具有很多，例如：`WebSocket-Node` 、`faye-websocket-node` 、`socket.io` ，接下来我将会使用`socket.io` 实现 `WebSoket` 后端推送及前后端交互，通过实现一个简单的实时交流页面展示 `WebSoket` 双向通信特性。

#### 准备

首先我们需要构建后端框架，在这里我使用的是 `Express` ，大家可以自己参照 [Express官网](https://www.expressjs.com.cn/) 构建框架，也可以跟着下面的指令构建。



创建项目文件夹，叫什么随意，我取名为 `websoketNode` 

```shell
mkdir websoketNode
```



进入文件夹后执行项目初始化命令，配置项全部默认就行，创建结束后可看到文件夹内 `package.json` 文件

```shell
cd websoketNode
npm init
```



项目引入 `Express` ，使用脚手架生成 `Express` 骨架

```shell
npm install express --save
npx express-generator
```

生成骨架可能会提示下载 `express-generator` 依赖，确认即可

构建完成后，生成目录架构如下所示：

![menu](https://i.loli.net/2021/10/13/OKnfMJtHwuqkgho.png)

`Express` 启动后默认访问地址为 `http://localhost:3000/` ，进入界面可见：

![image-2021091016074609](https://i.loli.net/2021/10/13/rfVtlMWSzYeCcJP.png)

引入 `soket.io` 依赖

```shell
npm install socket.io
```



打开 `index.js` 文件，创建服务，引入 `socket.io` ，监听端口为 `3001` ，添加 `socket` 监听及允许请求跨域：

```javascript
var express = require('express');
var router = express.Router();
// 创建soket
let app = require('express')();
let server = require('http').createServer(app);
let soket = require('socket.io');
let io = soket(server, { cors: true });

// socket相关监听都要放在这个回调里
io.on('connection', function(socket){
    console.log('a user connected');

    // 断开连接时打印
    socket.on("disconnect", function() {
        console.log("a user go out");
    });

    // 每隔3秒钟发送一次信息
    setInterval(() => {
        io.emit("msg", "data: " + ('来自Soket后端的推送' + new Date()));
    }, 3000);

    // 接收信息，并返回所发送的消息
    socket.on("msg", function(obj) {
        io.emit("msg", '你发送了信息：' + obj);
    });
});

//开启端口监听socket
server.listen(3001);

module.exports = router;
```

这样 `WebSoket` 后端逻辑就完成了，`WebSoket` 每三秒钟发送一次信息，在接收前端发送的消息后，将消息返回至前端



前端框架就不详细描述了，大家可以参照官网去搭建，接下来我们开始实现前端的 `WebSoket` 连接

首先引入 `socket.io` 包：

```shell
npm install socket.io-client --save
```

界面引入 `socket.io` ，创建 `WebSoket` 连接，将后端发送内容拼接后展示（注：界面销毁时需要将连接关闭，后端无法自动销毁）：



连接 `WebSoket` 代码：

```javascript
let that = this
this.socket = io('ws://127.0.0.1:3001') // 建立链接
// 监听服务端的消息“msg”
this.socket.on('msg', function (data) {
    that.showContent = that.showContent + '\n' + data
})
```

`web` 代码：

```vue
<div class="show-body">
    <pre class="show-pre">{{ showContent }}</pre>
</div>
```



启动前后端，进入界面即可获取到后端三秒传过来的时间信息：

![image-2021092614135448](https://i.loli.net/2021/10/13/L5HSJvEi6jGsA39.png)

此时 `WebSoket` 已连接，接下来我们使用它完成一个聊天室



首先，我们在前端框架内引入 `element` 框架，引用流程请见 [element官网](https://element.eleme.cn/#/zh-CN/component/quickstart) 



通过样式组件，我们优化我们的聊天室：

```vue
<template>
<div class="container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>聊天室</span>
            <el-button style="float: right; padding: 3px 0" type="text">退出聊天</el-button>
    </div>
        <div ref="msg" class="message-container">
            <div v-for="item in messageList" :key="item.key">
                <div v-if="item.type === 'sendMessage'">
                    <div class="image-left">
                        <div class="name-image">{{ item.name | nameFilter }}</div>
    </div>
                    <div class="text-right">
                        <div class="name">{{ item.name }}：</div>
                        <el-tag class="text" type="success" effect="plain">{{ item.message }}</el-tag>
    </div>
    </div>
                <div v-else-if="item.type === 'tip'">
                    <div class="tip">{{ item.name }} 已进入群聊</div>
    </div>
                <div style="clear:both"></div>
    </div>
    </div>
        <el-row class="button-container" :gutter="10">
            <el-col :span="21">
                <el-input v-model="message" v-on:keyup.enter.native="sendMessage" placeholder="请输入内容"></el-input>
    </el-col>
            <el-col :span="3">
                <el-button @click="sendMessage">发送</el-button>
    </el-col>
    </el-row>
    </el-card>
    </div>
</template>
<style scoped lang="less">
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        width: 39%;
        margin: 0 auto;
        .message-container {
            height: 500px;
            overflow: auto;
            .message-item {
                display: flex;
                width: 80%;
                margin: 4px 0px;
                .image-left {
                    flex: 0 40px;
                    .name-image {
                        width: 30px;
                        height: 30px;
                        border-radius: 5px;
                        background-color: #037df3;
                        color: #fff;
                        font-size: 12px;
                        line-height: 30px;
                        text-align: center;
                    }
                }
                .text-right {
                    flex: 1;
                    .name {
                        font-size: 13px;
                        padding-bottom: 3px;
                    }
                    .text {
                        color: #000;
                    }
                }
            }
            .my-message {
                float: right;
                flex-direction: row-reverse;
                padding-right: 10px;
                .image-left {
                    .name-image {
                        float: right;
                    }
                }
                .text-right {
                    .name {
                        text-align: right;
                    }
                    .text {
                        float: right;
                    }
                }
            }
            .tip {
                text-align: center;
                margin: 4px 0px;
                font-size: 13px;
                color: #BDBDBD;
            }
        }
        .button-container {
            margin-top: 10px;
        }

        ::-webkit-scrollbar {
            width: 5px; /*对垂直流动条有效*/
            height: 5px; /*对水平流动条有效*/
        }
        /*定义滑块颜色、内阴影及圆角*/
        ::-webkit-scrollbar-thumb{
            border-radius: 7px;
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
            background-color: #E8E8E8;
        }
    }
</style>
```

此时我们得到的界面如下：

![image-2021100818534093](https://i.loli.net/2021/10/13/QHufBrbM9OlPoRL.png)

在进入界面时，我们需要自定义创建一个姓名，创建方法网上可以找到很多，后面代码中也会给出。

我们在 `mounted` 时调用生成名字：

```javascript
this.myName = this.getRandomName()
```



当我们进入聊天室的时候，需要向所有人发送一个进入的提示，为了与信息做区分，我们定义消息类型为 `tip` ，代码如下：

```javascript
this.socket.on('connect', (data) => {
    let param = {
        key: new Date().getTime(),
        name: this.myName,
        type: 'tip'
    }
    this.socket.emit('msg', JSON.stringify(param))
})
```



当然，此时后端信息接收及发送也需要修改，删除间隔的发送消息：

```javascript
io.on('connection', function(socket){
    console.log('a user connected');

    // 断开连接时打印
    socket.on("disconnect", function() {
        console.log("a user go out");
    });

    // 每隔3秒钟发送一次信息
    // setInterval(() => {
    //   io.emit("msg", "data: " + ('来自Soket后端的推送' + new Date()));
    // }, 3000);

    // 接收信息
    socket.on("msg", function(obj) {
        io.emit("msg", obj);
    });
});
```



而当我们发送消息时，也定义一个类型为 `sendMessage` 表示这是使用者发出的信息：

```javascript
// 发送信息
sendMessage () {
    if (this.message !== '') {
        let param = {
            key: new Date().getTime(),
            name: this.myName,
            message: this.message,
            type: 'sendMessage'
        }
        this.socket.emit('msg', JSON.stringify(param))
        this.message = ''
    }
},
```



当我们接收到消息时，只需要将接收到的数据推入消息列表中，界面根据类型渲染即可：

```javascript
// 监听服务端的消息“msg”
this.socket.on('msg', (data) => {
    this.messageList.push(JSON.parse(data))
})
```

完成后代码如下：

```vue
<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>聊天室</span>
        <el-button style="float: right; padding: 3px 0" type="text">退出聊天</el-button>
      </div>
      <div ref="msg" class="message-container">
        <div v-for="item in messageList" :key="item.key">
          <div v-if="item.type === 'sendMessage'">
            <div class="image-left">
              <div class="name-image">{{ item.name | nameFilter }}</div>
            </div>
            <div class="text-right">
              <div class="name">{{ item.name }}：</div>
              <el-tag class="text" type="success" effect="plain">{{ item.message }}</el-tag>
            </div>
          </div>
          <div v-else-if="item.type === 'tip'">
            <div class="tip">{{ item.name }} 已进入群聊</div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
      <el-row class="button-container" :gutter="10">
        <el-col :span="21">
          <el-input v-model="message" v-on:keyup.enter.native="sendMessage" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button @click="sendMessage">发送</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'WebSocket',
  data () {
    return {
      socket: null, // soket连接实例
      myName: '', // 我的名字
      message: '', // 发送信息
      messageList: [] // 信息列表
    }
  },
  filters: {
    nameFilter (name = '') {
      return name.substring(name.length - 2)
    }
  },
  mounted () {
    this.myName = this.getRandomName()
    this.connectSoket()
  },
  methods: {
    // 连接soket接收信息
    connectSoket () {
      this.socket = io('ws://127.0.0.1:3001') // 建立链接
      this.socket.on('connect', (data) => {
        let param = {
          key: new Date().getTime(),
          name: this.myName,
          type: 'tip'
        }
        this.socket.emit('msg', JSON.stringify(param))
      })
      // 监听服务端的消息“msg”
      this.socket.on('msg', (data) => {
        this.messageList.push(JSON.parse(data))
      })
    },
    // 发送信息
    sendMessage () {
      if (this.message !== '') {
        let param = {
          key: new Date().getTime(),
          name: this.myName,
          message: this.message,
          type: 'sendMessage'
        }
        this.socket.emit('msg', JSON.stringify(param))
        this.message = ''
      }
    },
    // 获取随机姓名
    getRandomName () {
      var firstNames = [
        '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '楮', '卫', '蒋', '沈', '韩', '杨',
        '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜',
        '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎',
        '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐',
        '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常',
        '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄',
        '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧',
        '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁',
        '杜', '阮', '蓝', '闽', '席', '季', '麻', '强', '贾', '路', '娄', '危', '江', '童', '颜', '郭',
        '梅', '盛', '林', '刁', '锺', '徐', '丘', '骆', '高', '夏', '蔡', '田', '樊', '胡', '凌', '霍',
        '虞', '万', '支', '柯', '昝', '管', '卢', '莫', '经', '房', '裘', '缪', '干', '解', '应', '宗',
        '丁', '宣', '贲', '邓', '郁', '单', '杭', '洪', '包', '诸', '左', '石', '崔', '吉', '钮', '龚',
        '程', '嵇', '邢', '滑', '裴', '陆', '荣', '翁', '荀', '羊', '於', '惠', '甄', '麹', '家', '封',
        '芮', '羿', '储', '靳', '汲', '邴', '糜', '松', '井', '段', '富', '巫', '乌', '焦', '巴', '弓',
        '牧', '隗', '山', '谷', '车', '侯', '宓', '蓬', '全', '郗', '班', '仰', '秋', '仲', '伊', '宫',
        '宁', '仇', '栾', '暴', '甘', '斜', '厉', '戎', '祖', '武', '符', '刘', '景', '詹', '束', '龙',
        '叶', '幸', '司', '韶', '郜', '黎', '蓟', '薄', '印', '宿', '白', '怀', '蒲', '邰', '从', '鄂',
        '索', '咸', '籍', '赖', '卓', '蔺', '屠', '蒙', '池', '乔', '阴', '郁', '胥', '能', '苍', '双',
        '闻', '莘', '党', '翟', '谭', '贡', '劳', '逄', '姬', '申', '扶', '堵', '冉', '宰', '郦', '雍',
        '郤', '璩', '桑', '桂', '濮', '牛', '寿', '通', '边', '扈', '燕', '冀', '郏', '浦', '尚', '农',
        '温', '别', '庄', '晏', '柴', '瞿', '阎', '充', '慕', '连', '茹', '习', '宦', '艾', '鱼', '容',
        '向', '古', '易', '慎', '戈', '廖', '庾', '终', '暨', '居', '衡', '步', '都', '耿', '满', '弘',
        '匡', '国', '文', '寇', '广', '禄', '阙', '东', '欧', '殳', '沃', '利', '蔚', '越', '夔', '隆',
        '师', '巩', '厍', '聂', '晁', '勾', '敖', '融', '冷', '訾', '辛', '阚', '那', '简', '饶', '空',
        '曾', '毋', '沙', '乜', '养', '鞠', '须', '丰', '巢', '关', '蒯', '相', '查', '后', '荆', '红',
        '游', '竺', '权', '逑', '盖', '益', '桓', '公', '仉', '督', '晋', '楚', '阎', '法', '汝', '鄢',
        '涂', '钦', '岳', '帅', '缑', '亢', '况', '后', '有', '琴', '归', '海', '墨', '哈', '谯', '笪',
        '年', '爱', '阳', '佟', '商', '牟', '佘', '佴', '伯', '赏', '万俟', '司马', '上官', '欧阳', '夏侯',
        '诸葛', '闻人', '东方', '赫连', '皇甫', '尉迟', '公羊', '澹台', '公冶', '宗政', '濮阳', '淳于',
        '单于', '太叔', '申屠', '公孙', '仲孙', '轩辕', '令狐', '锺离', '宇文', '长孙', '慕容', '鲜于',
        '闾丘', '司徒', '司空', '丌官', '司寇', '子车', '微生', '颛孙', '端木', '巫马', '公西', '漆雕',
        '乐正', '壤驷', '公良', '拓拔', '夹谷', '宰父', '谷梁', '段干', '百里', '东郭', '南门', '呼延',
        '羊舌', '梁丘', '左丘', '东门', '西门', '南宫'
      ]

      var lastNames = [
        '子璇', '淼', '国栋', '夫子', '瑞堂', '甜', '敏', '尚', '国贤', '贺祥', '晨涛',
        '昊轩', '易轩', '益辰', '益帆', '益冉', '瑾春', '瑾昆', '春齐', '杨', '文昊',
        '东东', '雄霖', '浩晨', '熙涵', '溶溶', '冰枫', '欣欣', '宜豪', '欣慧', '建政',
        '美欣', '淑慧', '文轩', '文杰', '欣源', '忠林', '榕润', '欣汝', '慧嘉', '新建',
        '建林', '亦菲', '林', '冰洁', '佳欣', '涵涵', '禹辰', '淳美', '泽惠', '伟洋',
        '涵越', '润丽', '翔', '淑华', '晶莹', '凌晶', '苒溪', '雨涵', '嘉怡', '佳毅',
        '子辰', '佳琪', '紫轩', '瑞辰', '昕蕊', '萌', '明远', '欣宜', '泽远', '欣怡',
        '佳怡', '佳惠', '晨茜', '晨璐', '运昊', '汝鑫', '淑君', '晶滢', '润莎', '榕汕',
        '佳钰', '佳玉', '晓庆', '一鸣', '语晨', '添池', '添昊', '雨泽', '雅晗', '雅涵',
        '清妍', '诗悦', '嘉乐', '晨涵', '天赫', '玥傲', '佳昊', '天昊', '萌萌', '若萌',
        '秋白', '南风', '醉山', '初彤', '凝海', '紫文', '凌晴', '香卉', '雅琴', '傲安',
        '傲之', '初蝶', '寻桃', '代芹', '诗霜', '春柏', '绿夏', '碧灵', '诗柳', '夏柳',
        '采白', '慕梅', '乐安', '冬菱', '紫安', '宛凝', '雨雪', '易真', '安荷', '静竹',
        '飞雪', '雪兰', '雅霜', '从蓉', '冷雪', '靖巧', '翠丝', '觅翠', '凡白', '乐蓉',
        '迎波', '丹烟', '梦旋', '书双', '念桃', '夜天', '海桃', '青香', '恨风', '安筠',
        '觅柔', '初南', '秋蝶', '千易', '安露', '诗蕊', '山雁', '友菱', '香露', '晓兰',
        '涵瑶', '秋柔', '思菱', '醉柳', '以寒', '迎夏', '向雪', '香莲', '以丹', '依凝',
        '如柏', '雁菱', '凝竹', '宛白', '初柔', '南蕾', '书萱', '梦槐', '香芹', '南琴',
        '绿海', '沛儿', '晓瑶', '听春', '易巧', '念云', '晓灵', '静枫', '夏蓉', '如南',
        '幼丝', '秋白', '冰安', '凝蝶', '紫雪', '念双', '念真', '曼寒', '凡霜', '白卉',
        '语山', '冷珍', '秋翠', '夏柳', '如之', '忆南', '书易', '翠桃', '寄瑶', '如曼',
        '问柳', '香梅', '幻桃', '又菡', '春绿', '醉蝶', '亦绿', '诗珊', '听芹', '新之',
        '博瀚', '博超', '才哲', '才俊', '成和', '成弘', '昊苍', '昊昊', '昊空', '昊乾',
        '昊然', '昊然', '昊天', '昊焱', '昊英', '浩波', '浩博', '浩初', '浩大', '浩宕',
        '浩荡', '浩歌', '浩广', '浩涆', '浩瀚', '浩浩', '浩慨', '浩旷', '浩阔', '浩漫',
        '浩淼', '浩渺', '浩邈', '浩气', '浩然', '浩穰', '浩壤', '浩思', '浩言', '皓轩',
        '和蔼', '和安', '和昶', '翔东', '昊伟', '楚桥', '智霖', '浩杰', '炎承', '思哲',
        '璟新', '楚怀', '继智', '昭旺', '俊泽', '子中', '羽睿', '嘉雷', '鸿翔', '明轩',
        '棋齐', '轶乐', '昭易', '臻翔', '泽鑫', '芮军', '浩奕', '宏明', '忠贤', '锦辉',
        '元毅', '霈胜', '宇峻', '子博', '语霖', '胜佑', '俊涛', '浩淇', '乐航', '泽楷',
        '嘉宁', '敬宣', '韦宁', '建新', '宇怀', '皓玄', '冠捷', '俊铭', '一鸣', '堂耀',
        '轩凝', '舰曦', '跃鑫', '梓杰', '筱宇', '弘涛', '羿天', '广嘉', '陆铭', '志卿',
        '连彬', '景智', '孟昕', '羿然', '文渊', '羿楦', '晗昱', '晗日', '涵畅', '涵涤',
        '昊穹', '涵亮', '涵忍', '涵容', '俊可', '智鹏', '诚钰', '书墨', '俊易', '浩渺',
        '宸水', '嘉许', '时贤', '飞腾', '沂晨', '殿斌', '霄鸿', '辰略', '澜鸿', '景博',
        '咨涵', '修德', '景辉', '语旋', '智逸', '鸿锋', '思梵', '弈煊', '泰河', '逞宇',
        '嘉颢', '锦沅', '颢焱', '萧彬', '悦升', '香音', '烨柠', '颢咏', '仁贤', '尚然',
        '羿鳞', '月鸿', '健霖', '鸿昊', '竣杰', '可顺', '炯乐', '俊彦', '海沧', '捷明',
        '飞扬', '杰辰', '羽捷', '曦晴', '裕鸿', '翌锦', '沐宸', '福同', '旻驰', '龙宁',
        '文虹', '义凡', '广晨', '宸滔', '嘉岐', '雅珺', '睿明', '皓轩', '程天', '子酝',
        '艾康', '如羽', '冠玉', '子歉', '永昊', '龙华', '兆颜', '奇文', '月昕', '裕锦',
        '昂佳', '昊浩', '宇韬', '睿焓', '永译', '鸿彬', '颢霖', '益彬', '虹昊', '飞悦',
        '睿珏', '?宵童', '睿鸿', '容冰', '逸濠', '楷岩', '弘义', '海萦', '昊孺', '梓铭',
        '生钊', '蓝玺', '晨辕', '宇菡', '砚海', '文揩', '韬瑞', '彦红', '奕韦', '清予',
        '宁翼', '冬睿', '锦昌', '烨宁', '昌权', '国研', '德运', '孝清', '佳阳', '凯玮',
        '正真', '民云', '昕冶', '力威', '帅欣', '知淳', '烨飞', '兴远', '子墨', '澄欣',
        '烨煊', '悦勤', '晨津', '博宏', '育萌', '羽炫', '绍钧', '睿昌', '泓千', '颢炜',
        '虹金', '筠航', '元甲', '星明', '景涛', '铭虹', '德本', '向辉', '基翔', '家易',
        '欣鹏', '羽荃', '泽容', '弘亮', '尚廷', '轩梓', '甫津', '彬楷', '寅飞', '愉君',
        '阳平', '誉杰', '钦昭', '蕴藉', '羽程', '宏海', '涵畅', '光浩', '令沂', '浩浩',
        '睿锦', '易泽', '俊康', '家文', '晨元', '语洋', '裕宏', '梓榛', '阳嘉', '恒展',
        '雨远', '哲伊', '逸江', '丰源', '学东', '奇岩', '浩财', '和蔼', '红言', '瑞赫',
        '森圆', '欣赢', '梓鸿', '博明', '铭育', '颢硕', '宇烯', '宇如', '淳炎', '源承',
        '斌彬', '飞沉', '鸿璐', '昊弘'
      ]

      lastNames = this.removeDup(lastNames)

      var firstLength = firstNames.length
      var lastLength = lastNames.length

      var i = parseInt(Math.random() * firstLength)
      var j = parseInt(Math.random() * lastLength)
      var name = firstNames[i] + lastNames[j]

      return name
    },
    // 去重
    removeDup (names) {
      var result = []
      var obj = {}

      for (var i = 0; i < names.length; i++) {
        if (!obj[names[i]]) {
          result.push(names[i])
          obj[names[i]] = 1
        }
      }

      return result
    }
  },
  destroyed () {
    this.socket.close()
  }
}
</script>

<style scoped lang="less">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 39%;
  margin: 0 auto;
  .message-container {
    height: 500px;
    overflow: auto;
    .message-item {
      display: flex;
      width: 80%;
      margin: 4px 0px;
      .image-left {
        flex: 0 40px;
        .name-image {
          width: 30px;
          height: 30px;
          border-radius: 5px;
          background-color: #037df3;
          color: #fff;
          font-size: 12px;
          line-height: 30px;
          text-align: center;
        }
      }
      .text-right {
        flex: 1;
        .name {
          font-size: 13px;
          padding-bottom: 3px;
        }
        .text {
          color: #000;
        }
      }
    }
    .my-message {
      float: right;
      flex-direction: row-reverse;
      padding-right: 10px;
      .image-left {
        .name-image {
          float: right;
        }
      }
      .text-right {
        .name {
          text-align: right;
        }
        .text {
          float: right;
        }
      }
    }
    .tip {
      text-align: center;
      margin: 4px 0px;
      font-size: 13px;
      color: #BDBDBD;
    }
  }
  .button-container {
    margin-top: 10px;
  }

  ::-webkit-scrollbar {
    width: 5px; /*对垂直流动条有效*/
    height: 5px; /*对水平流动条有效*/
  }
  /*定义滑块颜色、内阴影及圆角*/
  ::-webkit-scrollbar-thumb{
    border-radius: 7px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #E8E8E8;
  }
}
</style>

```





完成上述代码后，基本能够实现信息的发送与接收，后面我们对界面进行优化，我们主要优化点有两个：

- 如何判断哪条信息是我发的，并且以不同方式展示出来
- 怎样才能让最新信息始终展示出来

对于第一个点，我们采取姓名判断，我们定义两套样式，分别为 `message-item` (他人发送消息)与 `message-item my-message` (自己发送消息)，在 `html` 循环渲染的时候判断当前发送者名称或身份标识符与我是否相同，如果相同则使用 `message-item my-message` 样式渲染，代码如下：

web:

```vue
<div v-if="item.type === 'sendMessage'" :class="getMessageClass(item)">
    <div class="image-left">
        <div class="name-image">{{ item.name | nameFilter }}</div>
    </div>
    <div class="text-right">
        <div class="name">{{ item.name }}：</div>
        <el-tag class="text" type="success" effect="plain">{{ item.message }}</el-tag>
    </div>
</div>
```

JavaScript:

```javascript
// 设置信息样式
getMessageClass (item) {
    if (item.name === this.myName) {
        return 'message-item my-message'
    } else {
        return 'message-item'
    }
},
```



对于第二点，我们接收到新的信息的时候，主动将滚动条滚动到最低端即可，代码如下：

```javascript
// 监听服务端的消息“msg”
this.socket.on('msg', (data) => {
    this.messageList.push(JSON.parse(data))
    // 需要等待新信息渲染完成之后才能将设置滚动条位置
    requestAnimationFrame(() => {
        this.$refs.msg.scrollTo(0, this.$refs.msg.scrollHeight)
    })
})
```



到此，我们聊天室，算是完成了基本功能：

![image-202110081924496](https://i.loli.net/2021/10/13/4DZnzJgHcq9LvSu.png)

在 `WebSoket` 中，没有任何事件标识符，那 `WebSoket` 怎样实现前后端多个事件交流呢？答案很简单，我们在客户端请求与服务端推送数据中添加事件标识，然后前后端约定标识统一即可，因此通过 `WebSoket` 实现多种事件交互模型如下：

![WebSoket多事件处.png](https://i.loli.net/2021/10/13/S7bWGLY2tF3DxaH.png)



### SSE

`SSE` （ Server-sent Events ）是 `WebSocket` 的一种轻量代替方案，基于 HTTP 协议。

严格来说，HTTP协议只能由客户端发起请求，并且在请求结束后关闭连接，但是如果我们发起一个请求的时候，服务器告诉客户端我要发送一个流信息，则客户端连接就会一直打开，而 `SSE` 使用的就是这个原理。

如上所述，可见 `SSE` 只有服务器到客户端的单向交互，且较为轻量（相当于一个接口），因此我们可以用它实现一些后端消息推送的接收等等。

接下来，我们将使用 `SSE` 实现一个对系统资源使用状态监控的界面，以此进一步了解 `SSE` 的使用方式。



#### 准备

前后端代码暂时就再不新建一个项目了，我们还是使用原来的。

首先我们需要分析一下后端状态推送的需求，简单来说就是后端不断查询最新状态，然后返回给前端，那么我们什么时候查询呢，最开始的时候我将查询逻辑放置在接口中，然后发现这样的话我每连一次，都要多一套状态查询，如果连接数量级过大，服务器压力会骤增，所以后续将查询状态的方法放置在全局，每间隔一秒钟查询一次，接口中，每一秒钟项客户端发送一次，这样的话在保证数据实时的前提下，降低了服务器的查询次数。



完成了方案的设计，我们开始实现后端的检索及推送功能：



首先我们怎样获取服务器资源使用信息呢？

`node` 给我们提供了便捷的 `api` : `os` , `os` 模块提供了与操作系统相关的实用方法和属性，我们可以通过其中方法获取当前系统多种属性。

我们在后端代码 `index.js` 中插入全局的服务器监听程序：

```javascript
const os = require('os');
let serviceMessage = {};
// 每隔1秒钟监听当前服务器情况
let serviceInterval = setInterval(() => {
  serviceMessage = {
    free: os.freemem(), // 闲置内存
    total: os.totalmem(), // 总内存
    used: os.totalmem() - os.freemem(), // 使用内存
    usageRate: ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2), // 内存使用率
    platform: os.platform(), // 平台
    type: os.type(), // 操作系统名称
    runTime: os.uptime(), // 系统正常运行时间
    ...os.userInfo(),  // 当前有效用户的信息
    cpuInfo: os.cpus(), // CPU 内核的信息
    hostName: os.hostname() // 操作系统的主机名
  };
}, 1000);
```



创建 `SSE` 接口：

```javascript
app.get('/getServerMessage', (req, res) => {
  // 声明接口类型为SSE
  res.header({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });
  // 间隔1秒钟向前端推送服务器信息
  setInterval(() => {
    // 发送信息以 \n\n 截断，返回数据中必须携带，不然客户端认为当前一次事件未结束，会一直等待
    // 请求前必须添加 data: ，否则前端无法接收
    res.write("data:" + JSON.stringify(serviceMessage) + "\n\n");
  }, 1000);
});
```

需要注意的是，我们每发一段消息的时候需要在后面加上 `\n\n` 字符，客户端通过该字符将流信息截断，如果不添加的话，客户端会认为本条信息未发送完成，导致接口访问后一直接收不到信息。



此时我们可以直接在浏览器输入地址：`localhost:3001/getServerMessage` 访问接口，访问结果如下：

![image-2021100820174197](https://i.loli.net/2021/10/13/GuMVwJXo3tYHNmq.png)

后端每隔一秒钟推送的数据都可以展现到浏览器上，而右上角显示请求一直在等待中，说明 `HTTP` 连接一直都未断开。



接下来，我们简单的实现一下前端的信息展示：

首先在 `create` 的时候，我们请求一下 `SSE` 请求：

```javascript
createSSE () {
    this.sseSource = new EventSource('http://127.0.0.1:3001/getServerMessage')
    this.sseSource.onmessage = (event) => {
        this.computeData = JSON.parse(event.data)
        let date = new Date()
        // 将使用率存入数组，做表格展示使用
        let newDate = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        this.usageList.push([newDate, this.computeData.usageRate])
        // 刷新图标
        this.charts.setOption({
            series: [
                {
                    data: this.usageList
                }
            ]
        })
    }
},
```

需要注意的是，此时我们连接请求是会失败的，因为跨域了，所以我们要在后端加上允许跨域代码（index.js）：

```javascript
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
```



接下来便是界面的展示，在这里就不多赘述，直接上代码：

```vue
<template>
  <div class="sse-container">
    <div class="memory-message">
      <div class="message-body" v-for="item in computeList" :key="item.name">
        <div class="title"> {{ item.name }}: </div>
        <div class="content"> {{ computeData[item.key] }} </div>
      </div>
    </div>
    <div class="memory-message">
      <div class="message-body" v-for="item in resourceList" :key="item.name">
        <div class="title"> {{ item.name }}: </div>
        <div v-if="item.key !== 'usageRate'" class="content"> {{ computeData[item.key] | transformMemory }} </div>
        <div v-else class="content"> {{ computeData[item.key] }}% </div>
      </div>
    </div>
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

let options = {
  title: {
    text: '内存使用率'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    name: '时间',
    type: 'category'
  },
  yAxis: {
    name: '使用率(%)',
    type: 'value',
    max: (value) => {
      return (value.max + 0.01 * (value.min)).toFixed(2)
    },
    min: (value) => {
      return (value.min - 0.01 * (value.min)).toFixed(2)
    },
    minInterval: 0.5
  },
  series: [{
    name: '使用率',
    type: 'line', // 图类型
    data: [],
    smooth: true
  }]
}
export default {
  name: 'SSE',
  filters: {
    transformMemory (value) {
      const memoryList = ['B', 'KB', 'MB', 'GB', 'TB']
      let memory = value
      let memoryStr = ''
      if (value) {
        for (let index = 0; index < memoryList.length; index++) {
          let item = memoryList[index]
          if (memory > 1024) {
            memory = memory / 1024
            memory = memory.toFixed(2)
            continue
          } else {
            memoryStr = memory + item
            break
          }
        }
        return memoryStr
      } else {
        return '--'
      }
    }
  },
  data () {
    return {
      sseSource: null,
      computeData: {},
      resourceList: [
        {
          name: `闲置内存`,
          key: 'free'
        },
        {
          name: `使用内存`,
          key: 'used'
        },
        {
          name: `内存总量`,
          key: 'total'
        },
        {
          name: `内存使用率`,
          key: 'usageRate'
        }
      ],
      computeList: [
        {
          name: '系统平台',
          key: 'platform'
        },
        {
          name: '系统正常运行时间（S）',
          key: 'runTime'
        },
        {
          name: '用户名',
          key: 'username'
        }
      ],
      charts: null,
      usageList: []
    }
  },
  created () {
    this.createSSE()
  },
  mounted () {
    this.createChars()
  },
  methods: {
    createSSE () {
      this.sseSource = new EventSource('http://127.0.0.1:3001/getServerMessage')
      this.sseSource.onmessage = (event) => {
        this.computeData = JSON.parse(event.data)
        let date = new Date()
        let newDate = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        this.usageList.push([newDate, this.computeData.usageRate])
        this.charts.setOption({
          series: [
            {
              data: this.usageList
            }
          ]
        })
      }
    },
    createChars () {
      this.charts = echarts.init(document.getElementById('map'))
      this.charts.setOption(options)
    }
  },
  beforeDestroy () {
    this.sseSource.close()
  }
}
</script>

<style scoped lang="less">
.sse-container {
  .memory-message {
    width: 70%;
    margin: 0 auto;
    display: flex;
    .message-head, .message-body {
      display: inline-block;
      flex: 1;
      .title {
        display: inline-block;
        width: 40%;
        text-align: right;
      }
      .content {
        display: inline-block;
        margin-left: 5px;
        width: 30%;
      }
    }
  }
  .map {
    height: 400px;
    width: 800px;
    margin: 0 auto;
    margin-top: 10px;
  }
}
</style>
```



最后我们看到的界面如下图所示：

![image-2021100820470104](https://i.loli.net/2021/10/13/KnBOuFTW4YwxzNf.png)

## 结论

对于连接方式，`WebSoket` 是基于 `TCP` 协议的连接，与 `HTTP` 协议有着良好的兼容性，没有同源限制，且为双向通信，所以我们可以在很多偏向实时的、双向的频繁操作的情况下使用 `WebSoket` 例如监控视频播放插件中，我们可以使用它进行实时的操作，保证请求及反馈的实时性。而 `SSE` 相对比，显得更轻量，我们不需要另外开辟一个端口去实现，基于其单向交互的特性，我们可以用它来实现一些性能监控或状态实时获取等业务场景（`Vue` 热更新也是使用 `SSE` 做到代码更新的实时推送的）。简单来说， `WebSoket` 适合复杂的前后端实时且频繁交互，使用范围广但相较于 `SSE` 则偏重量级； `SSE` 则更适合一些简单的后端状态获取，但实现更为轻量；



最后则是两个技术都要注意的一点：**连接限制** 

对于 `WebSoket` ，各个浏览器限制为（此限制似乎只限于原生连接，如果使用 `soket.io` 似乎没有限制了 ）：

| 浏览器              | 限制 |
| ------------------- | ---- |
| IE（IE9以下不支持） | 6    |
| chrome              | 6    |
| firefox             | 6    |
| Safari              | 5    |

对于 `SSE`  ,各浏览器限制为：

| 浏览器 | 限制 |
| ------ | ---- |
| IE11   | 13   |
| Chrome | 6    |
| 火狐   | 6    |
| Safari | 6    |







上述两个实例已上传到我的 `git` 上，大家可自取使用，地址为：

前端：https://github.com/shiyingjieGra/websoketWeb

后端：https://github.com/shiyingjieGra/websoketNode



本篇内容参考文档有：

[WebSocket入门教程（三）-- WebSocket实例：实时获取服务器内存使用情况](WebSocket入门教程（三）-- WebSocket实例：实时获取服务器内存使用情况) 

[WebSocket入门教程（五）-- WebSocket实例：简单多人聊天室](https://blog.csdn.net/u010136741/article/details/51612594?spm=1001.2014.3001.5501) 

[Browser connection limitations（浏览器长连接个数限制）解决方案](https://my.oschina.net/shisl/blog/4773984) 

