const dayjs = require("dayjs");
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const {resolve} = require("path");
const { logFn } = require("../utils");


dayjs.extend(utc); dayjs.extend(timezone);

let testBotToken = '5470450209:AAGql18tT6WLsdLjO5RUb2i0dGSNGBfk6Ok' // bot name: @RoyalBigBot
let testGroupId = '-864275056'

// 银行界面的配置
const bankPageConfig = {
  netmark: 'aubank',
  fromDate: dayjs().tz('Asia/Kolkata').format('YYYY-MM-DD'),
  toDate: dayjs().tz('Asia/Kolkata').format('YYYY-MM-DD'),
  homepage: 'https://netbanking.aubank.in/drb',
  logoutPage: '',

  // fromDate: process.env.OHDFC_FROMDATE || dayjs().subtract(2, 'h').tz('Asia/Kolkata').format('DD/MM/YYYY'),
  // toDate: process.env.OHDFC_TODATE || dayjs().tz('Asia/Kolkata').format('DD/MM/YYYY'),
}

const platform = process.env.PLATFORM
const platAccountId = process.env.PLATACCOUNTID
const botRestStartPort = '22' // 机器人启动的koa服务的端口
// platform 可能的值: v5_lame, v6_shiva
if (platAccountId) {
  logFn('AUBank个户脚本，支付平台: ' + platform + ' platAccountId: ' + platAccountId)
} else {
  logFn('AUBank个户管理机器人总控脚本开启，支付平台: ' + platform)
}


const { botInfoConfig: v0BotInfoConfig, adminInfoConfig: v0AdminInfoConfig } = require('./v0_demo')
const { botInfoConfig: v5BotInfoConfig, adminInfoConfig: v5AdminInfoConfig } = require('./v5_lame')
const { botInfoConfig: v6BotInfoConfig, adminInfoConfig: v6AdminInfoConfig } = require('./v6_shivapay')
const { botInfoConfig: v7BotInfoConfig, adminInfoConfig: v7AdminInfoConfig } = require('./v7_lovepay')

let platInfoConfigProd = {
  v0_demo: {
    botInfoConfig: v0BotInfoConfig,
    adminInfoConfig: v0AdminInfoConfig
  },
  v5_lame: {
    botInfoConfig: v5BotInfoConfig,
    adminInfoConfig: v5AdminInfoConfig
  },
  v6_shiva: {
    botInfoConfig: v6BotInfoConfig,
    adminInfoConfig: v6AdminInfoConfig
  },
  v7_love: {
    botInfoConfig: v7BotInfoConfig,
    adminInfoConfig: v7AdminInfoConfig
  }
}

const platSettingKeys = {
  转账触发阈值 : 'client.transfer.threshold', // 当银行卡余额大于多少时，触发转账处理
  接收消息的群成员: 'received.message.users',
  等待个户流水查询最大时间: 'wait.personal.search.flow.loading.max.time',
}

const platAccountConfig = platInfoConfigProd[platform].botInfoConfig[platAccountId]

const botInfoConfig = {
  scriptType: 'au_personal', // 脚本类型: au 个户脚本, 脚本类型，用来在同一台机器上区分 pm2 脚本任务
  prod_origin: {
    botToken: '6350507729:AAGx7XeXPusayT9xHx4-rPEzbafIMPAWXa8',
    info: '名字: shiva_rbl_old_bot \n' +  '创建者: cool 创建', groupId: '-4037863074'
  },
  dev: {
    botToken: '6350507729:AAGx7XeXPusayT9xHx4-rPEzbafIMPAWXa8',
    info: '名字: shiva_rbl_old_bot \n' +  '创建者: cool 创建', groupId: '-864275056'
  },
  prod: {
    managerBotInfo: {
      des: '用来控制程序的启动和关闭 的 总控机器人',
      info: '名字: shiva_rbl_old_bot \n' +  '创建者: cool 创建',
      botToken: '6350507729:AAGx7XeXPusayT9xHx4-rPEzbafIMPAWXa8',
      groupId: '-1002032254215',
      processName: 'rbl_corp_pm2_manage' // 总控机器人 pm2 进程名字, 需要和对应json文件一致
    },

    info: '名字: shiva_rbl_old_bot \n' +  '创建者: cool 创建',
    botToken: '6350507729:AAGx7XeXPusayT9xHx4-rPEzbafIMPAWXa8',
    groupId: '-4037863074', // 机器人所在监控群 id

    demo: { // 某个通道，配置单独的机器人
      info: '名字: lame_rbl_old_bot \n' +  '创建者: kenny 创建',
      botToken: '6705197086:AAGzc5GNqUHkvFBKJ12zDCtgSpdH0-p5BrI',
      groupId: '-4030031378', // 机器人所在监控群 id
      // botProxy: 'http://127.0.0.1:7086',
    },
    ...platInfoConfigProd[platform].botInfoConfig,
    ...(platAccountConfig ? platAccountConfig : {})
  }
}

const adminInfoConfig = {
  platAccountIdFrom: 88, // 监听验证码，账户id起始设定
  platAccountIdTo: 400,
  queryTime: 150, // 间隔多少秒查询一次浏览器运行时间，单位: 秒
  restartManageBotTime: 190, // 间隔多少秒重启总控机器人，单位: 秒
  needStartTime: 50, // 一个通道的浏览器间隔多少分钟需要重启，单位: 分钟
  smsKey: 'AU Bank', // 提取 otp 时的短信包含的关键词
  smsMatch: /OTP (\d{6}) for/, // 提取 otp
  smsTillTime: /Valid till ([0-9:]{8}). - AU Bank/, // 获取短信有效时间
  // 测试
  // adminToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDAwIiwiZXhwIjoxNjk1MTUxNjc1LCJ0eXBlIjoiQURNSU4ifQ.3YrWhYS1LLjirgTDvrDn9h7lOnAeAwxrhRvkIyFCH2n--MwkVeIhK7f3NVwuaDEQ4WGoX_5m00xidCZJq9DNxg',
  // 生产
  adminToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODAxIiwiZXhwIjoxNjk3MzY2NDQ3LCJ0eXBlIjoiQURNSU4ifQ.RiPetPuEBxMqHU-TwNfblPVpnPljv_tD-XJNwojnkUViHbpRBjHKySuhmP_nHCoixpICVjLP8xnhMr2qgaZZnQ',
  // url: 'http://localhost:8889/', // 管理系统域名地址
  // url: 'http://localhost:9529', // 管理系统域名地址
  url: 'https://admin.shivapay.in/api',
  apiTarget: 'upload-hdfc-file', // 流水文件上传地址
  // http://3.111.215.0/iphbeiHm/phone/8167039452  查看全部短信内容地址
  // http://3.111.215.0/getOtp?phone=8167039452    获取otp短信地址
  smsUrl: 'http://3.111.215.0',
  getOtpSmsUrl: 'http://3.111.215.0/getOtp?phone=',
  allSmsUrl: 'http://3.111.215.0/iphbeiHm/phone/', // 短信web端界面: 总链接
  ...platInfoConfigProd[platform].adminInfoConfig
}

const waitAnswerKey = `${platform}_${platAccountId}`
const getWaitAnswerKeyFn = () => {
  let resArr = []
  let platformArr = []
  for (let i = adminInfoConfig.platAccountIdFrom; i < adminInfoConfig.platAccountIdTo; i++) {
    platformArr.push(i.toString())
  }
  console.log('run', platformArr)
  platformArr.forEach(item => {
    resArr.push(new RegExp(`^(${platform}_${item})(\\s)+[a-zA-Z0-9]{6}$`))
  })
  return resArr
}

module.exports = {
  botInfoConfig, adminInfoConfig, bankPageConfig, platSettingKeys, platform, platAccountId, waitAnswerKey, getWaitAnswerKeyFn, botRestStartPort
}
