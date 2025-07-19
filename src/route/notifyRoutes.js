const Router = require('koa-router');
const notifyController = require('../controllers/notifyController');

const router = new Router({ prefix: '/notify' });

router.post('/send', notifyController.sendNotification);

module.exports = router;
