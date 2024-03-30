

// 默认的机器人配置
const botInfoConfig = {
  managerBotInfo: {
    des: '用来控制程序的启动和关闭 的 总控机器人',
    info: '名字: shiva_ua_personal_manage_bot \n' +  '创建者: cool',
    botToken: '6521966880:AAEOPDnXmOXizRYS1aIIm_f8ycQbD8bmyLY',
    groupId: '-4043645817', // 只能在特殊的群操作指令
    processName: 'v6_shiva_ua_personal_pm2_manage' // 总控机器人 pm2 进程名字, 需要和对应json文件一致
    // botProxy: 'http://127.0.0.1:7086',
  },
  info: '名字: shiva_ua_personal_bot \n' +  '创建者: cool 创建',
  botToken: '6569870893:AAGfdZXmq27whYq7MAu8SF4ctTUVXybs8P8',
  groupId: '-4043645817', // 机器人所在监控群 id
  demo: { // 某个通道，配置单独的机器人
    info: '名字: lame_rbl_old_bot \n' +  '创建者: kenny 创建',
    botToken: '6705197086:AAGzc5GNqUHkvFBKJ12zDCtgSpdH0-p5BrI',
    groupId: '-4030031378', // 机器人所在监控群 id
    // botProxy: 'http://127.0.0.1:7086',
  }
}

const adminInfoConfig = {
  platAccountIdFrom: 130, // 监听验证码，账户id起始设定
  platAccountIdTo: 400,
  // 测试
  // adminToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDAwIiwiZXhwIjoxNjk1MTUxNjc1LCJ0eXBlIjoiQURNSU4ifQ.3YrWhYS1LLjirgTDvrDn9h7lOnAeAwxrhRvkIyFCH2n--MwkVeIhK7f3NVwuaDEQ4WGoX_5m00xidCZJq9DNxg',
  // 生产
  adminToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODAxIiwiZXhwIjoxNjk3MzY2NDQ3LCJ0eXBlIjoiQURNSU4ifQ.RiPetPuEBxMqHU-TwNfblPVpnPljv_tD-XJNwojnkUViHbpRBjHKySuhmP_nHCoixpICVjLP8xnhMr2qgaZZnQ',
  // url: 'http://localhost:8889/', // 管理系统域名地址
  url: 'https://admin.shivapay.in/api',
  apiTarget: 'xxx', // 流水文件上传地址
  // http://3.111.215.0/iphbeiHm/phone/8167039452  查看全部短信内容地址
  // http://3.111.215.0/getOtp?phone=8167039452    获取otp短信地址
  smsUrl: 'http://3.111.215.0',
  getOtpSmsUrl: 'http://3.111.215.0/getOtp?phone=',
  allSmsUrl: 'http://3.111.215.0/iphbeiHm/phone/', // 短信web端界面: 总链接
}

module.exports = {
  botInfoConfig, adminInfoConfig
}
