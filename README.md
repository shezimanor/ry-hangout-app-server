# Chat App Server (with Socket.io)

Socket.io Server 端的專案，可搭配 Client 端的 [repo](https://github.com/shezimanor/ry-hangout-app-client)

Live Demo(專案尚未收尾，所以還沒部署)

## 開發注意事項

1. 改成 ES modules 的寫法。

2. Socket.io 的 cors 是有內建的 options 設定，不是用 cors 套件。[文件](https://socket.io/docs/v4/handling-cors/)

3. 現在是用另外一個 vue 專案來當 client 端。

4. 先簡化 socket.io server（沒有路由）。
