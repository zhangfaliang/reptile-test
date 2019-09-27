const { get } = require("lodash");

const logoutRoute = ({
  query,
  router,
  app,
  baseSucessRquest,
  baseErrorRquest
}) => {
  router.post("/common/logout", async ctx => {
    try {
      const { userId } = get(ctx, "session");
      await query(`delete  from session_store where user_id=${userId}`);
      ctx.session.userId = "";
      ctx.body = JSON.stringify({
        ...baseSucessRquest,
        data: { message: "已退出", verify: true }
      });
    } catch (e) {
        console.log(e)
      ctx.body = JSON.stringify({
        ...baseErrorRquest,
        data: { message: "服务器未知错误", verify: false }
      });
    }
  });
  app.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });
};
module.exports = logoutRoute;
