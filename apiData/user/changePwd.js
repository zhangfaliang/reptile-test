const { isEmpty } = require("lodash");

const changePWDRoute = ({
  query,
  router,
  app,
  baseSucessRquest,
  baseErrorRquest
}) => {
  router.post("/common/changepwd", async ctx => {
    try {
      let postData = ctx.request.body,
        data = { msg: "用户名或者密码错误", verify: false };
      const { userName, newPassword } = postData;

      const resArr = await query(
        `select * from user where user_name=${userName}`
      );

      if (!isEmpty(resArr)) {
        const res = await query(
          `UPDATE user SET user_password=${newPassword} where user_name=${userName} ;`
        );
        data = {
          msg: "修改成功",
          verify: true
        };
      }
      ctx.body = JSON.stringify({
        ...baseSucessRquest,
        data
      });
    } catch (e) {
      ctx.body = JSON.stringify({
        ...baseErrorRquest,
        data: { msg: "服务器未知错误", verify: false }
      });
    }
  });
  app.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });
};
module.exports = changePWDRoute;
