
const fs = require('fs');
const path = require('path');

const yaml = require('./yaml.js');

const nodeEnv = process.env.NODE_ENV;

const projectEnv = jointEnv(nodeEnv);

genTpl(projectEnv);

//根据模板生成项目配置文件
function genTpl(env) {
  // conog tpl 读取文件列表写入到used中
  let tplDir = '../conf/tpl';
  let outDir = '../conf/used';
  const files = fs.readdirSync(tplDir);
  files.forEach((item) => {
    const data = replaceEnv(`${tplDir}/${item}`, env);
    const filePath = `${outDir}/${env.PRJ_NAME}_${item}`;
    fs.writeFileSync(filePath, data, 'utf8');
  });
}

function jointEnv(nodeEnv){
  const prjConfig = yaml.eval(fs.readFileSync('../conf/config.prj.yml', 'utf8'));
  const env = Object.assign({}, prjConfig.common, prjConfig[nodeEnv] || {});
  // 开发者自己的配置
  if (fs.existsSync('../conf/config.user.yml')) {
    const userConfig = yaml.eval(fs.readFileSync('../conf/config.user.yml', 'utf8'));
    Object.assign(env, userConfig[nodeEnv] || {})
  }
  // 拼接模板变量
  const prjRoot = path.resolve(__dirname, '../');
  env.PRJ_ROOT = prjRoot;
  env.DOMAIN = `${env.DOMAIN_PREFIX}${env.BASE_DOMAIN}`;
  return env;
}

// 替换模板字符串
function replaceEnv(file, env) {
  const str = fs.readFileSync(file, 'utf-8');
  return str.replace(/\$\{(\w+)\}/g, ($0, $1) => {
    // 字符串加引号  
    if (env[$1]!==undefined) {
      return env[$1]
    }
    return $0;
  });
}