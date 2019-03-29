## 使用yeoman创建项目模板

## 模板功能
基于配置模板和yaml配置文件生成实际项目所需的nginx和pm2配置 以便适应不同开发人员和不同环境.
## 使用
yo generator
进入项目目录执行deploy.sh deploy
deploy dev|beta|online   创建相关环境的配置
dev online reload 创建nginx和pm2配置并启动.
