## 一个项目脚手架
  使用yaml配置环境变量 使用shell解析配置并根据模板生成项目的nginx和pm2配置文件
## 使用
nginx和pm2模板放在conf/tpl下
团队和项目通用环境变量放在 conf/confi.prj.yml中
可在config.user.yml覆盖通用配置, 实际开发中把configuser.yml加到.gitignore中
执行cmd/deploy.sh

deploy.sh dev|beta|online 创建配置文件并启动pm2

deploy.sh env reload #除启动node外还重载nginx

~~~下次面试再说写了个脚手架面试官就不会觉得我吹牛逼了~~~