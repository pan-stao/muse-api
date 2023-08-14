const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const private_key = fs.readFileSync(
  path.join(__dirname, "../rsa/private_key.pem")
);
//!  token创建函数封装

function createToken(payload) {
  //! payload 就是你要加密的用户名，一般放置 username + 时间戳
  return jwt.sign(payload, private_key, { algorithm: "RS256" });
}

//!  token验证函数封装

function checkToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, private_key, (err, data) => {
      if (err) {
        resolve({ status: 0, msg: err });
      }
      resolve(data);
    });
  });
}

module.exports = {
  createToken,
  checkToken,
};
