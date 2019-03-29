## 使用yeoman创建项目模板

## 模板功能
基于配置模板和yaml配置文件生成实际项目所需的nginx和pm2配置 以便适应不同开发人员和不同环境.
## 使用
yo generator

进入项目目录执行deploy.sh

deploy dev|beta|online   创建相关环境的配置并启动pm2

deploy env reload #除启动node外还重载nginx
