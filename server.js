const Koa = require('koa');
const http = require('http');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const socketIo = require('socket.io');
const serve = require('koa-static'); // <-- Add this
const chatRoutes = require('./src/route/chatRoutes');

const app = new Koa();
const server = http.createServer(app.callback());
const io = socketIo(server, { cors: { origin: '*' } });

app.context.io = io;

// --- Serve static files from ./public ---
app.use(serve(__dirname + '/public'));

// --- Middlewares ---
app.use(bodyParser());

// --- API Router ---
const apiRouter = new Router({ prefix: '/api' });

apiRouter.use(chatRoutes.routes());

app.use(apiRouter.routes());

// --- Socket.io Setup ---
io.on('connection', (socket) => {
  console.log('New client:', socket.id);
  socket.onAny((event, ...args) => {
    console.log(`Received event: ${event}`, args);
  });

  // Chat event routed to controller
  // socket.on('chat', (data) => chatController.handleChat(socket, data, io));
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


server.listen(3000, () => console.log('Server running on http://localhost:3000'));
