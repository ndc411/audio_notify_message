### 1. 项目借鉴
   > 数据库和日志: https://blog.csdn.net/qq_35876316/article/details/132685063  
   > 路由结构: https://blog.csdn.net/SongD1114/article/details/124406361

### 表结构
```
id --- 编号
platform --- 平台
name --- 项目名称
messageContent --- 消息
type--- 消息类型
channel --- 
platAccountId --- 
remark --- 备注
needAudio --- 播报情况 todo，doing，done, other
createdTime --- 创建时间
updateTime --- 更新时间

```

#### todo-la 需要解决的待办事项

### 开发
node index.js

### 部署
pm2 start npm --name audio_msg -- run start:audio_msg

