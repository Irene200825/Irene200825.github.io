#!/bin/bash

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m '优化'

# 如果发布到 https://<USERNAME>.github.io  填写你刚刚创建的仓库地址
git push -f git@github.com:Irene200825/Irene200825.github.io.git master

cd -



