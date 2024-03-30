
// 某个通道，配置单独的机器人

// 默认的机器人配置
const botInfoConfig = {
  managerBotInfo: {
    des: '用来控制程序的启动和关闭 的 总控机器人',
    info: '名字: lame_au_personal_manager_bot \n' +  '创建者: kenny',
    botToken: '6737288814:AAEQtGAmO15XLiGjCPOvWHqf4YLoo9QlQos',
    groupId: '-4162338059', // 只能在特殊的群操作指令
    processName: 'v5_lame_au_personal_pm2_manage' // 总控机器人 pm2 进程名字, 需要和对应json文件一致
  },
  info: '名字: lame_au_personal_bot \n' +  '创建者: kenny 创建',
  botToken: '6851080883:AAGVOsQ3RYUTC2VrJPgTWLiqE39SjwYHZWY',
  groupId: '-4162338059', // 机器人所在监控群 id
  demo: { // 某个通道，配置单独的机器人
    info: '名字: lame_au_personal_bot \n' +  '创建者: kenny 创建',
    botToken: '6851080883:AAGVOsQ3RYUTC2VrJPgTWLiqE39SjwYHZWY',
    groupId: '-4162338059', // 机器人所在监控群 id
    // botProxy: 'http://127.0.0.1:7086',
  }
}

const adminInfoConfig = {
  adminToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODAxIiwiZXhwIjoxNjk3MzY2NDQ3LCJ0eXBlIjoiQURNSU4ifQ.RiPetPuEBxMqHU-TwNfblPVpnPljv_tD-XJNwojnkUViHbpRBjHKySuhmP_nHCoixpICVjLP8xnhMr2qgaZZnQ',
  // url: 'http://localhost:8889/', // 管理系统域名地址
  url: 'https://admin.lamepay.com/api',
  apiTarget: 'xxxxx', // 流水文件上传地址
  // http://3.111.215.0/iphbeiHm/phone/8167039452  查看全部短信内容地址
  // http://3.111.215.0/getOtp?phone=8167039452    获取otp短信地址
  smsUrl: 'http://3.111.215.0',
  getOtpSmsUrl: 'http://3.111.215.0/getOtp?phone=',
  allSmsUrl: 'http://3.111.215.0/iphbeiHm/phone/', // 短信web端界面: 总链接
}


module.exports = {
  botInfoConfig, adminInfoConfig
}
