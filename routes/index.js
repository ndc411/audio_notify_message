/**
 Created by M on 2024/03/30 15
 */

const Router = require('koa-router')
const router = new Router()
const lowdb = require("../dateBase/lowdb");
const db = lowdb.install();
const logger = require('../logger/index')

const getInfoList = () => {
  let iData = db.read().get("list").value();
  return iData && iData.length ? iData : [];
};

router.get('/', async (ctx) => {
  // const { platform } = ctx.params
  // await ctx.render(platform)
  ctx.body = 'Hello World!';
});

router.get('/index/:platform', async (ctx) => {
  const { platform } = ctx.params
  await ctx.render(platform)
});

router.get("/getInfo", async(ctx) => {
  let iData = getInfoList();
  if (iData) {
    ctx.body = {
      code: 209,
      message: "查询成功",
      list: iData,
    };
  } else {
    ctx.body = {
      code: 500,
      message: "查询失败",
      list: [],
    };
  }
});

router.get("/setInfo", async(ctx) => {
  let params = ctx.request.body,
    arr = getInfoList();
  if (params && params.form) { //接口的参数名称form
    //校验
    let { id } = params.form;
    if (arr.filter((item) => item.id === id).length !== 0) {
      ctx.body = {
        code: 403,
        message: "已经存在添加的服务!",
        list: [],
      };
      return;
    }
    arr.push(params.form);
    db.set("list", arr).write();
    ctx.body = {
      code: 200,
      message: "添加并启动成功!",
      list: arr,
    };
  } else {
    ctx.body = {
      code: 509,
      message: "服务器异常!",
      list: [],
    };
  }
});

router.post("/deleteInfo", async(ctx) => {
  let params = ctx.request.body,
    arr = getInfoList();
  if (params && params.ids) {
    //校验
    let ids = `${params.ids}`.split(",");
    let newArr = arr.filter((item) => !ids.includes(String(item.id)));
    db.set("list", newArr).write();
    ctx.body = {
      code: 200,
      message: "删除成功",
      list: newArr,
    };
  } else {
    ctx.body = {
      code: 500,
      message: "服务器异常!",
      list: [],
    };
  }
});

router.get("/startInfo", async(ctx, next) => {
  let body = ctx.request.body;
  if (body && body.form) { // 接口的参数名称form
    return new Promise(async(rs, rj) => {
      logger.debug("异步请求前1")
      await next()
      logger.debug("异步请求前2")
    })
  } else {
    ctx.body = {
      code: 509,
      message: "服务器异常!",
      list: [],
    };
  }
});

module.exports = router
