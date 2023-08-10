/**
 * 这里存放的是关于商品分类的接口
 */

const router = require("koa-router")();
const rq = require("request-promise");

// 添加前缀
router.prefix("/api/category");

/**
 *  用户注册接口
 */

router.post("/register", async (ctx) => {
  /**
   * @apiGroup Users
   * @api { post } http://localhost:3000/api/category
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

  const res = await rq("http://www.qinqin.net/index.php?r=class/category&type=1")
   
  await ctx.render("category", {
    data: JSON.stringify({
      status: res
    }),
  });
});

module.exports = router;
