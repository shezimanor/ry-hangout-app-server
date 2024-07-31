import { Server } from 'socket.io';

const port = 3000;
// io: Server Instance
const io = new Server(port, {
  // https://socket.io/docs/v4/handling-cors/
  cors: {
    origin: 'http://localhost:5173'
  }
});

// 訪客清單
const connectedUsers = {};
// 打字中的訪客清單
const typingUsers = {};

// io.of('/')
io.on('connection', (socket) => {
  // 註冊事件：訪客造訪
  socket.on('user-in', (userName) => {
    console.log(`User: ${userName} has connected with id ${socket.id}`);
    // 保存 userName
    socket.userName = userName;
    // 將訪客加入訪客清單
    connectedUsers[socket.id] = userName;
    // 發送事件（發給所有人除了觸發者）：訪客造訪
    socket.broadcast.emit('user-in', userName);
    // 發送事件：更新訪客清單
    io.emit('user-list', connectedUsers);
    console.log('user-list: ', connectedUsers);
  });

  // 註冊事件：用戶的群組訊息
  socket.on('group-message', ({ msg }) => {
    // 發送事件（發給所有人除了觸發者）：回傳用戶的群組訊息
    // 觸發者自己在 client 端已經將訊息渲染在畫面上，所以無需發送訊息給他本人
    socket.broadcast.emit('group-message', msg);
  });

  // 註冊事件：使用者發送私訊
  socket.on('private-message', ({ receiverId, msg }) => {
    // 伺服器收到私訊後，將私訊送給 receiver
    socket.to(receiverId).emit('private-message', msg);
  });

  // 註冊事件：使用者開始打字
  socket.on('user-typing', () => {
    // 將訪客加入訪客清單
    typingUsers[socket.id] = socket.userName;
    console.log('typingUsers: ', typingUsers);
    // 發送事件（發給所有人除了觸發者）：更新訪客們正在打字的狀態
    socket.broadcast.emit('user-typing-status', typingUsers);
  });

  // 註冊事件：使用者結束打字
  socket.on('user-not-typing', () => {
    // 將訪客加入訪客清單
    delete typingUsers[socket.id];
    console.log('typingUsers: ', typingUsers);
    // 發送事件（發給所有人除了觸發者）：更新訪客們正在打字的狀態
    socket.broadcast.emit('user-typing-status', typingUsers);
  });

  // 訪客離線
  socket.on('disconnect', () => {
    console.log(`User: ${socket.name} with id ${socket.id} disconnected`);
    // 將訪客移除訪客清單
    delete connectedUsers[socket.id];
    // 發送事件（發給所有人除了觸發者）：訪客離開
    socket.broadcast.emit('user-out', socket.userName);
    // 發送事件：更新訪客清單
    io.emit('user-list', connectedUsers);
    console.log('user-list: ', connectedUsers);
  });
});
