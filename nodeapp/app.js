const Koa = require('koa');
const router = require('./router/index.js');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(process.env.PORT || 3000, () => {
  console.log('app start');
});
