const {existsSync, writeFileSync} = require("fs");
const {resolve} = require("path");
const dayjs = require("dayjs");
const fs = require("fs");
/**
 Created by M on 2024/03/29 20
 */
const initDataFileFn = (dataPath) => {
  const initData = {
    "messageText": "亲爱的，今天语音播报开始啦🌶",
    "platform": "demo",
    "audioStatus": "示例",
    "id": "1"
  }
  if (!existsSync(dataPath)) {
    writeFileSync(
      dataPath,
      JSON.stringify({"flist": [], "list": [initData]}, null, 2),
      { encoding: 'utf8'});
  }
}

const initDirFn = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    console.log('初始化路径')
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

exports.install = function(platform) {
  const path = require('path');
  const low = require('lowdb');
  const LodashId = require('lodash-id');
  const FileSync = require('lowdb/adapters/FileSync');
  const dirPath = resolve(__dirname, `data_center/${platform}`)
  initDirFn(dirPath)
  const nowDate = dayjs().format('YYYY-MM-DD')
  const JSONPath = resolve(__dirname, `${dirPath}/${nowDate}_data.json`);
  initDataFileFn(JSONPath)
  // const JSONPath = path.join(__dirname, '/data.json');
  const adapter = new FileSync(JSONPath)
  const lowdb = low(adapter);

  lowdb._.mixin(LodashId);
  //保存文件路径
  lowdb['lowdbPath'] = JSONPath;
  console.log("lowdbPath--", JSONPath)

  if (!lowdb.has("list").value()) {
    lowdb.defaults({ flist: [] }).write()
  }
  return lowdb;
}
