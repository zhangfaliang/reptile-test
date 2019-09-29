const { get, isEmpty } = require("lodash");

const userInfoRoute = ({
  query,
  router,
  app,
  baseSucessRquest,
  baseErrorRquest
}) => {
  router.post("/common/userInfo", async ctx => {
    try {
      const { _expire, sessionId, isNew } = get(ctx, "session", {});
      let data = {
        msg: "用户未登录",
        verify: false
      };
      if (isNew !== true) {

        const resArr = await query(
          `select s1.expire, u1.balance, u1.user_name, u1.is_vip from session_store s1 left join user u1 on u1.user_id=s1.user_id where u1.user_name=${sessionId}`
        );
        if (new Date().getTime() < _expire) {
          {
            // 返回用户信息
            const { balance, user_name, is_vip } = get(resArr, "0");
            data = {
              msg: "ok",
              verify: true,
              userInfo: { balance, userName: user_name, isVip: is_vip }
            };
          }
        }
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
module.exports = userInfoRoute;
