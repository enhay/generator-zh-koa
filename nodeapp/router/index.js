const Router = require('koa-router');
const router = new Router();
const logger = require('../lib/logger').createLogger('pgc', 'router');
router.get('/', (ctx) => {
  ctx.body = ctx.request;
});

router.get('/infolog', (ctx) => {
  logger.info(`[infolog] query is ${JSON.stringify(ctx.query)}`);
  ctx.body = ctx.request;
});

router.get('/errorlog', (ctx, next) => {
  logger.error(`[errorlog] query is ${JSON.stringify(ctx.query)}`);
  ctx.body = ctx.request;
});

module.exports = router;
