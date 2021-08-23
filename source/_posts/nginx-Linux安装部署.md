---
title: nginx和https配置
date: 2021-08-19 18:43:43
excerpt: nginx学习
toc: true
tag: 前端部署
categories: 前端部署
---



# 什么是nginx

nginx 是一款轻量级的Web服务器、反向代理服务器、电子邮件（IMAP/POP3）代理服务器。

特点：占用内存小、高并发、高可用、高性能。



## 高并发

高并发指系统能够同时处理很多请求。测量并发指标通常有响应时间、吞吐量、每秒查询率QPS、并发用户数等。

吞吐量：单位时间内处理的请求数量。

QPS：每秒响应的请求数。

可以使用压力测试来对网页进行高并发测试。

nginx高并发配置：1.扩展cpu和内存 2.nginx文件配置  3.linux内核参数配置



## 高可用

减少停工时间，保证其服务的高度可用性。

双机热备方案，当一台服务器正在提供服务的时候，另外一台服务器处在备用状态。

可以使用keepalived来实现。



## 高性能

```bash
 ps -ef --forest | grep nginx
```

![image-20210823105008643](https://i.loli.net/2021/08/23/PbS8n7ogucZGBkW.png)

nginx有master process（主进程）和一系列的worker process(工作进程)以及helper process(辅助进程)。

主进程：执行特权操作，读取配置和绑定端口、创建子进程等。

工作进程：执行所有实际任务的进程，处理网络连接、读取和写入内容到磁盘，与上游服务器通信等。

nginx配置工作进程数：worker_processes auto 



## 热部署

在不用重启关闭nginx服务的情况下，更新版本。



## 代理

1. 正向代理

   正向代理日常使用较多，比如我们要去访问国外的某些网站，我们无法直接访问，我们需要一台可以访问该网站的代理服务器。客户端向代理服务器发送请求，代理服务器转交请求，把内容返回给客户端。正向代理隐藏了真实客户端信息。

2. 反向代理

   代理服务器接收请求并将请求发送给内部网络的服务器。它是架设在服务器端，请求具体由哪台服务器是不明确的。

3. 负载均衡

   将接收到的请求按照规则分发到不同的服务器进行处理。

   

# linux部署安装nginx

## 下载nginx并解压

```bash
//进入存放路径
cd /usr/local
//新建一个文件夹
mkdir tarzip
//进入文件夹
cd tarzip
//新建文件夹
mkdir nginx//存放nginx文件
//下载nginx压缩包,可以选不同版本的nginx下载，这里我选择了nginx-1.9.9
wget  http://nginx.org/download/nginx-1.9.9.tar.gz
//解压nginx到nginx-1.9.9文件夹中
tar -zxvf /usr/local/tarzip/nginx-1.9.9.tar.gz -C /usr/local/tarzip
```



## 下载nginx的依赖

```bash
//nginx依赖gcc环境,安装前先安装gcc 
yum -y install gcc pcre pcre-devel zlib zlib-devel openssl openssl-devel
```



## 安装nginx

```bash
//进入到刚才解压的nginx目录nginx-1.9.9
cd /usr/local/tarzip/nginx-1.9.9
//设置安转路径
./configure --prefix=/usr/local/tarzip/nginx
//编译和安装nginx
make && make install
```



## 启动nginx

```bash
//启动
/usr/local/tarzip/nginx/sbin/nginx
```



## 启动成功

打开浏览器输入地址，出现Welcone to nginx表示安装成功



------



# nginx常用命令



## 更改配置

```bash
//打开文件修改
vim /usr/local/tarzip/nginx/conf/nginx.conf
//刷新配置
nginx -s reload
```



## 停止nginx

```bash
nginx -s stop
```



## 启动nginx

```bash
nginx
```



# 获取ssl证书

以后再补充，目前使用公司的证书



# 配置 HTTPS



## 查看配置

```bash
nginx -V //大v
```

已配置会出现   --with-http-ssl-modules内容

![已配置](https://i.loli.net/2021/08/19/r75G4fDENIxVcXv.png)



## 配置 ssl 模块

```bash
//进入nginx-1.9.9
cd /usr/local/tarzip/nginx-1.9.9
//配置
 ./configure --prefix=/usr/local/tarzip/nginx --with-http_ssl_module
 //编译
  make
```

目录中会有一个objs 文件夹，用objs里面的nginx替换原来sbin里面的nginx

```
//原来的nginx备份
cp /usr/local/tarzip/nginx/sbin/nginx /usr/local/tarzip/nginx/sbin/nginx.bar
//替换
cp /usr/local/tarzip/nginx-1.9.9/objs/nginx /usr/local/tarzip/nginx/sbin/nginx
//查看配置
/usr/local/tarzip/nginx/sbin/nginx -V
```



## nginx.conf配置

```bash
listen  443 ssl default_server;
ssl_certificate ssl证书目录/nginx-selfsigned.crt;
ssl_certificate_key ssl证书目录/nginx-selfsigned.key;
client_max_body_size 100m;//上传文件限制大小
```



## 更新配置

```
nginx -s reload
```

