### node项目模板
  提供一致性的目录结构和构建脚本,方便创建符合发版系统的node项目
### 使用

sh ./cmd/deploy.sh `[env]` `[action]`

**env**: 环境变量,用于决定yml配置文件中哪些变量生效 可选值`dev    beta online` 默认dev

**action**: 可选值 start stop restart reload
- `start`:根据模板生成prj_pm2.json 并执行pm2 start prj_pm2.json
- `restart|stop`: 使用已有prj_pm2.json` 执行pm2 restart|stop命令
- `reload`:除start行为外,还根据模板生成nginx.conf并执行nginx reload

### 配置
  配置包含模板和变量,通过解析环境变量替换模板字符串的方式生成项目实际配置文件
#### 1. 模板
  模板位于 conf/tpl下使用`${}` 占位符,实际配置文件位于 conf/used下(实际开发需要加入到.gitingore)
#### 2.变量
  变量配置格式为yaml,包含项目通用配置(config.prj.yml) 和个人开发配置(config.user.yml). config.user.yml中的配置会覆盖config.prj.yml. 多人开发需要将config.user.yml加入到.gitingore

### TODO
  * 提供build脚本,提供命令行配置形式创建新项目
  * 完善koa middleware
  * 完善eslint和logger
  * 提供打包shell脚本 配合升龙发版
