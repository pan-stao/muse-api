/**
 * 这里存放的是关于用户的接口
 */
const { userCollections } = require('../db')
const router = require("koa-router")();



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


  userCollections.add(ctx.request.body)

  await ctx.render("user", {
    data: JSON.stringify({
      status: 1,
      msg: "注册成功",
    }),
  });
});

module.exports = router;
