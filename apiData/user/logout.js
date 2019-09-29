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
      const { sessionId } = get(ctx, "session");
      const res = await query(
        `delete  from session_store where sessionId=${sessionId}`
      );
      ctx.session.sessionId = "";
      ctx.body = JSON.stringify({
        ...baseSucessRquest,
        data: { msg: "已退出", verify: true }
      });
    } catch (e) {
      console.log(e);
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
module.exports = logoutRoute;
