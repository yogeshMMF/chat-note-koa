const Router = require('koa-router');
const chatController = require('../controllers/chatController');

const router = new Router({ prefix: '/chat' });

// Example REST endpoint (optional, if you want HTTP chat)
router.post('/send', async (ctx) => {
  const { user, message } = ctx.request.body;
  console.log('API called, emitting chat:', { user, message });
  ctx.io.emit('chat', { user, message, time: new Date().toISOString() });
  ctx.body = { ok: true };
});


module.exports = router;
