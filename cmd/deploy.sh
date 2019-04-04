#!/bin/bash

export PATH=$PATH:/usr/local/node/bin/:/usr/local/nginx/sbin


env='dev' 

trap 'onCtrlC' INT
function onCtrlC () {
    echo 'Ctrl+C is captured'
    exit 0;
}

case $1 in
    dev|beta|online)
        env=$1
        ;;
esac

work_path=$(dirname $0)
cd ${work_path}

source ./yaml.sh

create_variables ../conf/config.prj.yml $env

if [ -f " ../conf/config.user.yml" ]; then 
 create_variables ../conf/config.user.yml $env
fi 

sudo node parse.js --ENV=$env

confDir=$(dirname "$PWD")/conf/used
echo '========PM2 START=========='
echo $confDir/${PRJ_NAME}_pm2.json
pm2 restart $confDir/${PRJ_NAME}_pm2.json

if [ ! $2 ] || [ $2 != 'reload' ]
then
 echo donot need reload nginx config
 exit 0;
fi


echo '==========NGINX RELOAD START==========='
# # nginx 软链 | xars basename
# files=$(find $confDir -name "*nginx.conf" ) 
# for filename in $files
# do
#   ln -sf $filename /data/services/nginx_vhost/$(basename $filename)
#   echo $filename
# done
ln -sf $confDir/${PRJ_NAME}_nginx.conf /data/services/nginx_vhost/${PRJ_NAME}_nginx.conf

#重启nginx
sudo nginx -s reload
echo '==========NGINX RELOAD END==========='

