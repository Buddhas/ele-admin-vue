###
 # @Descripttion: 
 # @version: 
 # @Author: 笑佛弥勒
 # @Date: 2020-03-20 23:44:50
 # @LastEditors: 笑佛弥勒
 # @LastEditTime: 2020-03-20 23:45:43
 ###
#!/usr/bin/env bash
image_version=`date +%Y%m%d%H%M`;
# 关闭shop_admin容器
sudo docker stop shop_admin || true;
# 删除shop_admin容器
sudo docker rm shop_admin || true;
# 删除shop/admin镜像
sudo docker rmi --force $(docker images | grep shop/admin | awk '{print $3}')
# 构建shop/admin:$image_version镜像
sudo docker build . -t shop/admin:$image_version;
# 查看镜像列表
sudo docker images;
# 基于shop/admin 镜像 构建一个容器 shop_admin
sudo docker run -p 9527:80 -d --name shop_admin shop/admin:$image_version;
# 查看日志
sudo docker logs shop_admin;
#删除build过程中产生的镜像    #docker image prune -a -f
sudo docker rmi $(docker images -f "dangling=true" -q)
# 对空间进行自动清理
sudo docker system prune -a -f