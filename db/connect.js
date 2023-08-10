const mongoose = require("mongoose");

const HOST_NAME = "localhost";
const DATA_BASE_NAME = "muse";

module.exports = function () {
  mongoose.connect(`mongodb://${HOST_NAME}:27017/${DATA_BASE_NAME}`);

  // 设置数据库连接成功
  mongoose.connection.once("open", () => {
    console.log("数据库连接成功");
  });

  // 设置连接错误的回调
  mongoose.connection.on("error", () => {
    console.log("连接失败");
  });

  // 关闭数据库连接 (项目运行过程中，不会添加该代码)
  mongoose.connection.on("close", () => {
    console.log("连接关闭");
  });
};
