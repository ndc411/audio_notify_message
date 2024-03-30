/**
 Created by M on 2024/03/29 20
 */
exports.install = function() {
  const path = require('path');
  const low = require('lowdb');
  const LodashId = require('lodash-id');
  const FileSync = require('lowdb/adapters/FileSync');
  const JSONPath = path.join(__dirname, '/data.json');
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
