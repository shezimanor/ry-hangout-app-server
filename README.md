# SocketIO Express Server

## 開發注意事項

1. 改成 ES modules 的寫法。

2. Socket.io 的 cors 是有內建的 options 設定，不是用 cors 套件。[文件](https://socket.io/docs/v4/handling-cors/)

3. 現在是用另外一個 vue 專案來當 client 端。

4. 簡化 socket.io server（沒有路由）。
