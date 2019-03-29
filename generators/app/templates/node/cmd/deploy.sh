#!/bin/bash

if [ ! $1 ] 
then
  env='dev' 
else 
  env=$1
fi  


work_path=$(dirname $0)
cd ./${work_path}
echo $work_path
export NODE_ENV=$env
node parse.js
#启动pm2
#pm2 start ../config/used/pm2.json
# 如果需要配置nginx

echo "===end==="
