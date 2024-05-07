/**
 Created by M on 2024/03/30 15
 */
const log4js = require("log4js")
const path = require("path");

const platform = 'log_center'
const loggerPath = `logger/${platform}/`;

log4js.configure({
  appenders: {
    error: {
      type: 'file', //日志类型
      category: 'errLogger', //日志名称
      filename: path.join(loggerPath, 'error.log'), //日志输出位置，当目录文件或文件夹
      maxLogSize: 104800, // 文件最大存储空间
      backups: 100, //当文件内容超过文件存储空间时，备份文件的数里
    },
    response: {
      type: 'dateFile',
      category: 'resLogger',
      filename: path.join(loggerPath, 'info.log'), //日志输出模式
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      maxLoeSize: 104800,
      backups: 100
    },
    default: {
      type: 'dateFile',
      category: 'resLogger',
      filename: path.join(loggerPath, 'default.log'), //日志输出模式
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      maxLoeSize: 104800,
      backups: 100
    }
  },
  categories: {
    error: { appenders: ['error'], level: 'ERROR' },
    response: { appenders: ['response'], level: 'INFO' },
    default: { appenders: ['default'], level: 'DEBUG' }
  },
  replaceConsole: true
})

// log4js.configure({
//     ppenders: {
//         cheese: {
//             type: "file",
//             filename: "koa.log"
//         },
//     },
//     categories: {
//         default: {
//             appenders: ["cheese"],
//             level: "debug"
//         }
//     }
// });

const logger = log4js.getLogger();

logger.debug("日志---启动")

module.exports = logger
