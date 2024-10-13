/**
 Created by M on 2024/03/30 15
 */

const Router = require('koa-router')
const router = new Router()
const lowdb = require("../dateBase/lowdb");
// const db = lowdb.install();
const logger = require('../logger/index')
const {currentTimeFn} = require("../utils");

const getInfoList = (platform) => {
  const db = lowdb.install(platform);
  let iData = db.read().get("list").value();
  return iData && iData.length ? iData : [];
};

const verifyPlatformFn = (ctx, platform) => {
  if (!['v5_lame', 'v6_shiva', 'v6_hlpay', 'v6_pepepay'].includes(platform)) {
    ctx.body = {
      code: 522,
      message: "平台代码标识不正确，请联系技术确认!",
      list: [],
    };
    return false
  }
  return true
}

router.get('/', async (ctx) => {
  // const { platform } = ctx.params
  // await ctx.render(platform)
  ctx.body = '<h1 style="text-align: center;padding-top: 100px; color: orange">Hello baby！欢迎来到语音播报系统</h1>';
});

router.get('/home', async (ctx) => {
  await ctx.render('home')
});

// todo 验证 platform 是否在 列表中
router.post("/getInfo", async(ctx) => {
  const { platform } = ctx.request.body
  if (!verifyPlatformFn(ctx, platform)) return
  let iData = getInfoList(platform);
  if (iData) {
    ctx.body = {
      code: 200,
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

router.post("/addMsg", async(ctx) => {
  let params = ctx.request.body
  if (params && params.messageText) {
    const { platform } = ctx.request.body
    if (!verifyPlatformFn(ctx, platform)) return
    let arr = getInfoList(platform);
    // 校验
    // let { id } = params;
    // if (arr.filter((item) => item.id === id).length !== 0) {
    //   ctx.body = {
    //     code: 403,
    //     message: "已经存在添加的服务!",
    //     list: [],
    //   };
    //   return;
    // }
    const id = new Date().valueOf().toString()
    const nowTime = currentTimeFn()
    arr.unshift({ ...params, id, createdTime: nowTime, updateTime: nowTime });
    const db = lowdb.install(platform);
    db.set("list", arr).write();
    ctx.body = {
      code: 200,
      message: "添加成功"
    };
  } else {
    ctx.body = {
      code: 509,
      message: "服务器异常!",
      list: [],
    };
  }
});

router.post("/updateOneMsgInfo", async(ctx) => {
  let { id, platform } = ctx.request.body
  if (!verifyPlatformFn(ctx, platform)) return
  let arr = getInfoList(platform);
  if (id) {
    arr.forEach((item) => {
      if (item.id === id) {
        item.audioStatus = 'DONE'
        item.updateTime = currentTimeFn()
      }
    })
    const db = lowdb.install(platform);
    db.set("list", arr).write();
    ctx.body = {
      code: 200,
      message: "修改成功!",
      list: [],
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
  let { id, platform } = ctx.request.body
  if (!verifyPlatformFn(ctx, platform)) return
  let params = ctx.request.body,
    arr = getInfoList(platform);
  if (params && params.ids) {
    //校验
    let ids = `${params.ids}`.split(",");
    let newArr = arr.filter((item) => !ids.includes(String(item.id)));
    const db = lowdb.install(platform);
    db.set("list", newArr).write();
    ctx.body = {
      code: 200,
      message: "删除成功"
    };
  } else {
    ctx.body = { code: 500, message: "服务器异常!" };
  }
});

router.get("/startInfo", async(ctx, next) => {
  let body = ctx.request.body;
  if (body) {
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
