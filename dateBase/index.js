/**
 Created by M on 2024/03/29 20
 */

const lowdb = require("./lowdb");

const db = lowdb.install();

//读 --- key这里为list
db.read().get("list").value();
//写 --- key这里为list
db.set("list", []).write();
