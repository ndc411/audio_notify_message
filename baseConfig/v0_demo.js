

// 默认的机器人配置
const botInfoConfig = {
  managerBotInfo: {
    des: '用来控制程序的启动和关闭 的 总控机器人',
    info: '名字: love_ua_personal_manage_bot \n' +  '创建者: baz',
    botToken: '6900302812:AAGQvQB_9aHz45-kqUakixFY5ru4ZW8S_zk',
    groupId: '-4040118203', // 只能在特殊的群操作指令
    processName: 'v7_love_au_personal_pm2_manage' // 总控机器人 pm2 进程名字, 需要和pmeJob文件夹对应json文件一致
    // botProxy: 'http://127.0.0.1:7086',
  },
  info: '名字: love_ua_personal_bot \n' +  '创建者: baz 创建',
  botToken: '6655749006:AAFMplHShemccagXK17CeVbMGUcobh1gqJE',
  groupId: '-4003384601', // 机器人所在监控群 id


//   https://netbanking.aubank.in/drb/
//
//   Name：Afsha Sahel Mitkar
// ACC:2301253354284151
// IFSC:AUBL0002533
// 网银登录ID:30114021
// 网银密码:Hasd@2022
// 手机号：9262934196
// 短信界面: http://18.162.131.251/AaeihvDew/phone/9262934196
//
//


  39: { // 某个通道，配置单独的机器人
    // let testBotToken = '5470450209:AAGql18tT6WLsdLjO5RUb2i0dGSNGBfk6Ok' // bot name: @RoyalBigBot
    // let testGroupId = '-864275056'
    info: '名字: RoyalBigBot \n' +  '创建者: baz 创建',
    botToken: '5470450209:AAGql18tT6WLsdLjO5RUb2i0dGSNGBfk6Ok',
    groupId: '-864275056', // 机器人所在监控群 id
    // botProxy: 'http://127.0.0.1:7086',
  },
}

const adminInfoConfig = {
  // 测试
  // adminToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDAwIiwiZXhwIjoxNjk1MTUxNjc1LCJ0eXBlIjoiQURNSU4ifQ.3YrWhYS1LLjirgTDvrDn9h7lOnAeAwxrhRvkIyFCH2n--MwkVeIhK7f3NVwuaDEQ4WGoX_5m00xidCZJq9DNxg',
  // 生产
  adminToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODAxIiwiZXhwIjoxNjk3MzY2NDQ3LCJ0eXBlIjoiQURNSU4ifQ.RiPetPuEBxMqHU-TwNfblPVpnPljv_tD-XJNwojnkUViHbpRBjHKySuhmP_nHCoixpICVjLP8xnhMr2qgaZZnQ',
  // url: 'http://localhost:8889/', // 管理系统域名地址
  url: 'https://admin.d.lamepay.com/api',
  apiTarget: 'upload-hdfc-file', // 流水文件上传地址
  // http://3.111.215.0/iphbeiHm/phone/8167039452  查看全部短信内容地址
  // http://3.111.215.0/getOtp?phone=8167039452    获取otp短信地址
  smsUrl: 'http://18.162.131.251',
  getOtpSmsUrl: 'http://18.162.131.251/getOtp?phone=',
  allSmsUrl: 'http://18.162.131.251/AaeihvDew/phone/', // 短信web端界面: 总链接
}

module.exports = {
  botInfoConfig, adminInfoConfig
}
