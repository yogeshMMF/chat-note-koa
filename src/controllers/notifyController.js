exports.sendNotification = async (ctx) => {
    ctx.io.emit('notification', { msg: ctx.request.body.msg || 'Default message' });
    ctx.body = { status: 'Notification sent!' };
  };
  