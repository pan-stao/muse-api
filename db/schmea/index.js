/**
 * 定义 骨架 定义字段
 *
 */

const mongoose = require("mongoose");

module.exports = function (dataTypes) {
  return new mongoose.Schema(dataTypes);
};
