
const fs = require('fs');
const path = require('path');

const yaml = require('./yaml.js');

process.argv.forEach((item) => {
  if (item.indexOf('--') !== 0) {
    return;
  }
  item.replace(/--([a-z_]+)=(\w+)/ig, ($0, $1, $2) => {
    process.env[$1] = $2;
  });
})

const nodeEnv = process.env.ENV;

console.log(nodeEnv);
const projectEnv = jointEnv(nodeEnv);

genTpl(projectEnv);

//根据模板生成项目配置文件
function genTpl(env) {
  // conog tpl 读取文件列表写入到used中
  let tplDir = '../conf/tpl';
  let outDir = '../conf/used';
  // 删除旧文件
  fs.readdirSync(outDir).forEach((item) => {
    fs.unlink(path.join(outDir, item), (e) => {
      e && console.log(e);
    });
  });
  // 创建新文件
  fs.readdirSync(tplDir).forEach((item) => {
    const data = replaceEnv(`${tplDir}/${item}`, env);
    const filePath = `${outDir}/${env.PRJ_NAME}_${item}`;
    fs.writeFileSync(filePath, data, 'utf8');
  });
}

function jointEnv(nodeEnv) {
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
  if (env.PM2_LOG_DIR) {
    chmodLogPath(env.PM2_LOG_DIR)
  }
  return env;
}

// 替换模板字符串
function replaceEnv(file, env) {
  const str = fs.readFileSync(file, 'utf-8');
  return str.replace(/\$\{(\w+)\}/g, ($0, $1) => {
    // 字符串加引号  
    if (env[$1] !== undefined) {
      return env[$1]
    }
    return $0;
  });
}

function chmodLogPath(logPath) {
  if (fs.existsSync(logPath)) {
    fs.chmodSync(logPath, 0o777)
  } else {
    fs.mkdirSync(logPath, { recursive: true, mode: 0o777 })
  }
  createLogFile(logPath, 'access.log');
  createLogFile(logPath, 'error.log');
}

function createLogFile(logPath, logfile) {
  const logfilePath = path.join(logPath, logfile);
  fs.writeFileSync(logfilePath, '', { encoding: 'utf8', mod: 0o777, flag: 'a' });
  fs.chmodSync(logfilePath, 0o777);
}