import { Server } from 'socket.io';

const port = 3000;
// io: Server Instance
const io = new Server(port, {
  // https://socket.io/docs/v4/handling-cors/
  cors: {
    origin: 'http://localhost:5173'
  }
});

// io.of('/')
io.on('connection', (socket) => {
  console.log(`A user connected with id ${socket.id}`);

  // 發送事件（發給所有人除了觸發者）：訪客造訪
  socket.broadcast.emit('user-in', socket.id);

  // 註冊事件：用戶的群組訊息
  socket.on('group-message', (msg) => {
    console.log(`group-message: ${msg}`);
    // 發送事件（發給所有人）：返回用戶的群組訊息
    io.emit('group-message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`User with id ${socket.id} disconnected`);
    // 發送事件（發給所有人除了觸發者）：訪客離開
    socket.broadcast.emit('user-out', socket.id);
  });
});
