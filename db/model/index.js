const mongoose = require("mongoose");

module.exports = function (collectionsName, schemaName) {
  /**
   * collectionsName 表示创建的集合名称
   * schemaName 表示创建骨架的名称
   */

  return mongoose.model(collectionsName, schemaName);
};
