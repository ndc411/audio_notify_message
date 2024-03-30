const Koa = require("koa");
const cors = require("koa2-cors");
const BodyParser = require("koa-bodyparser");
const path = require('path');
const app = new Koa();
const bodyparser = new BodyParser();

app.use(bodyparser);
const views = require("koa-views")
//文件下载
const fs = require("fs");
const request = require("request");
const logger = require('./logger/index')
const router = require('./routes/index')


// 创建文件夹目录 todo
var dirPath = path.join(__dirname, "file");
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
  logger.debug("文件夹创建成功");
} else {
  logger.debug("文件夹已存在");
}


// koa请求跨域问题
app.use(
  cors({
    origin: function(ctx) {
      return ctx.request.headers.origin || ""; //这里是重点，动态获取地址 //*
    },
    credentials: true,
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
    allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
  })
);
app.use(views(path.join(__dirname,"homeHtmlTemplate/"),{extension:'html'}))

function downlLoadFile() {
  request({
    timeout: 5000, // 设置超时
    method: 'GET', //请求方式
    url: 'xxx', //url
    qs: { //参数，注意get和post的参数设置不一样
      xx: "xxx",
      xxx: "xxx",
      xxx: "xxx"
    }

  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);

    } else {
      console.log("error");
    }
  });
}

// 引入路由中间件
app.use(router.routes());
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log("正在监听8046端口号！");
  console.log("http://localhost:8046");
  logger.debug("正在监听3000端口号！")
});
