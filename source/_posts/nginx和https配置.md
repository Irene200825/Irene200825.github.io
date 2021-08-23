---
title: nginx和https配置
date: 2021-08-19 18:43:43
excerpt: linux安转部署nginx以及配置ssl
toc: true
tag: 前端部署
categories: 前端部署
---

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

