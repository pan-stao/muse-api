/**
 * 这里存放的是关于用户的接口
 */
const { userCollections } = require("../db");
const router = require("koa-router")();
const { createToken, checkToken } = require("../token");

// 添加前缀
router.prefix("/api/users");

/**
 *  用户注册接口
 */

router.post("/register", async (ctx) => {
  /**
   * @apiGroup Users
   * @api { post } http://localhost:3000/api/users/register  注册接口
   * @apiParam {String} username 用户名
   * @apiParam {String} password 密码
   * @apiParam {String} email 邮箱
   * @apiParam {String} phone 手机号
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "firstname": "John",
   *       "lastname": "Doe"
   *     }
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "UserNotFound"
   *     }
   * @apiSampleRequest http://localhost:3000/api/users/register
   */

  const { status, msg } = await userCollections.add(ctx.request.body);

  await ctx.render("user", {
    data: JSON.stringify({
      status,
      msg,
    }),
  });
});

//! 登陆接口
router.post("/login", async (ctx) => {
  /**
   * @api {post} /api/user/login  登陆
   * @apiGroup User
   * @apiParam {string} username 用户名
   * @apiParam {string} password 密码
   * @apiParam {string} email  邮箱
   * @apiSuccessExample {json} Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "username" : "张三",
   *      "password" : "123"
   *    }
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 404 Not Found
   *      {
   *      "error" : "UserNotFound"
   *       }
   * @apiSampleRequest /api/user/login
   *
   *
   */
  // token 的值为 ''
  const { token } = ctx.header;
  const { username, password } = ctx.request.body;
  console.log(ctx.request.body)
  let authToken;
  if (token) {
    //! if有token，就需要验证token的合法性
    const checkTokenFlag = checkToken({ username }, token);
    if (checkTokenFlag.status == 0) {
      await ctx.render("user", {
        data: JSON.stringify({
          status: 0,
          msg: "token是非法的",
        }),
      });
      return;
    }
    await ctx.render("user", {
      data: JSON.stringify({
        status: 1,
        msg: "token是合法的",
      }),
    });
  } else {
    // tonken的值为空   第一次||过期
    authToken = createToken({ username, time: Date.now() });

    //  判断登陆
    const userData = await userCollections.query();
    const f = userData.some(
      (item) => item.username === username && item.password === password
    );
    if (f) {
      // 用户名密码正确
      const _id = await userCollections.getId(username, password);

      await ctx.render("user", {
        data: JSON.stringify({
          status: 1,
          msg: "登陆成功",
          username: username,
          userId: _id,
          token: authToken,
        }),
      });
    } else {
      await ctx.render("user", {
        data: JSON.stringify({
          status: 0,
          msg: "用户名或密码错误！",
          userId: "",
          token: "",
        }),
      });
    }
  }
});

//! 删除用户
router.post("/logout", async (ctx) => {
  /**
   * @api {post} /api/user/logout  注销
   * @apiGroup User
   * @apiParam {string} userId 用户ID
   * @apiParam {string} root   用户权限
   * @apiSuccessExample {json} Success-Response:
   *    {
   *      status: 1,
   *      msg:'该用户已注销'
   *    }
   * @apiErrorExample {json} Error-Response:
   *    {
   *      status: 0,
   *      msg:'该用户是你瞎编的吧！'
   *    }
   *
   */

  const { userId, root } = ctx.request.body;
  let result;
  if (root === "0") {
    result = await user.remove(userId);
    console.log(result);
  } else if (root === "1") {
    console.log("您当前的角色权限是管理员，确定要删除吗？");
  }
  await ctx.render("user", {
    data: JSON.stringify({
      status: result.status,
      msg: result.msg,
    }),
  });
});
//! 修改用户信息
router.post("/updata", async (ctx) => {
  await ctx.render("user", {
    data: JSON.stringify({
      status: 1,
      msg: "修改成功",
    }),
  });
  /**
   * @api {post} /api/user/updata  修改用户信息
   * @apiGroup User

   */
});
//! 查找所有用户
router.get("/query", async (ctx) => {
  const userData = await user.query();
  await ctx.render("user", {
    data: JSON.stringify({
      userData,
    }),
  });
  /**
   * @api {get} /api/user/query  查找用户
   * @apiGroup User
   * @apiSuccessExample {json} Success-Response:
   *
   *    {
   *      "status":1,
   *       "data":"{[]}",
   *        "msg":""
   *    }
   * @apiErrorExample {json} Error-Response:
   *      {
   *      "error" : "UserNotFound"
   *       }
   *
   * @apiSampleRequest /api/user/query
   *
   */
});

module.exports = router;
