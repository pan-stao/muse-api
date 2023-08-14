const createSchmea = require("../schmea");
const createModel = require("../model");

const userSchema = createSchmea({
  username: String,
  password: String,
  email: String,
  phone: String,
});
const userModel = createModel("users", userSchema);

module.exports = {
  // 添加用户
  async add(data) {
    return new Promise(async (resolve, reject) => {
      const userEnity = new userModel(data);
      const docs = await this.query();
      const f = docs.some(
        (item) =>
          item.username === data.username ||
          item.email === data.email ||
          item.phone === data.phone
      );
      if (f) {
        resolve({
          status: 0,
          msg: "您的用户名或手机号，或邮箱已被注册，赶快换一个！",
        });
      } else {
        userEnity.save((err) => {
          if (err) {
            Promise.reject(err);
          } else {
            resolve({
              status: 1,
              msg: "注册成功",
            });
          }
        });
      }
    });
  },
  // 删除用户
  remove(userId) {
    return new Promise((resolve, reject) => {
      userModel.findById(userId, (err, doc) => {
        if (err) throw err;
        //! 先通过ID找到这个数据
        if (doc) {
          //! 有这个用户
          doc.remove((err) => {
            if (!err) resolve({ status: 1, msg: "用户已删除！" });
          });
        } else {
          //! 没有这个用户
          resolve({
            status: 0,
            msg: "这个用户是你瞎编的吧！",
          });
        }
      });
    });
  },
  // 修改用户信息
  updata(data) {
    return new Promise((resolve, reject) => {
      const { name, newPassword } = data;
      userModel.find({ username: name }, (err, docs) => {
        const { _id } = docs[0];
        userModel.findById(_id, (err, doc) => {
          doc.password = newPassword;
          doc.save((err) => {
            if (err) {
              reject({
                status: 0,
                msg: err,
              });
            } else {
              resolve({
                status: 1,
                msg: "修改成功",
              });
            }
          });
        });
      });
    });
  },
  //查找用户
  query() {
    return new Promise((resolve, reject) => {
      userModel.find({}, (error, docs) => {
        resolve(docs);
      });
    });
  },
  //! 查找ID
  getId(username, password) {
    return new Promise((resolve, reject) => {
      userModel.find({}, (err, doc) => {
        doc.forEach((item) => {
          if (item.username === username && item.password === password) {
            resolve(item._id);
          }
        });
      });
    });
  },
};
