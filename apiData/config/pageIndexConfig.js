const { get, isEmpty } = require("lodash");

const pageIndexConfigRoute = ({
  query,
  router,
  app,
  baseSucessRquest,
  baseErrorRquest
}) => {
  router.post("/common/pageIndexPage", async ctx => {
    try {
      let data = {
        msg: "服务器未知错误",
        verify: false
      };
      const resArr = await query(`select * from indexPageConfig`);
      if (!isEmpty(resArr)) {
        const { userSlidBtn, userSetBtn, goToPageBtn } = get(resArr, "0");
        data = {
          msg: "ok",
          data: { userSlidBtn, userSetBtn, goToPageBtn },
          verify: true
        };
      }
      ctx.body = JSON.stringify({
        ...baseSucessRquest,
        data
      });
    } catch (e) {
        console.log(e)
      ctx.body = JSON.stringify({
        ...baseErrorRquest,
        data: { message: "msg", verify: false }
      });
    }
  });

  app.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });
};
module.exports = pageIndexConfigRoute;
