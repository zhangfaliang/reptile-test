const { get, isEmpty } = require("lodash");

const loginRoute = ({
  query,
  router,
  app,
  baseSucessRquest,
  baseErrorRquest
}) => {
  
  router.post("/common/config", async ctx => {
    try {
      let postData = ctx.request.body,
        data = {};
        data = {
            msg: "服务器未知错误",
            verify: false
          };
      const { userName, password } = postData;
      const resArr = await query(
        `select * from user where user_name=${userName}`
      );
    
   
      ctx.body = JSON.stringify({
        ...baseSucessRquest,
        data
      });
    } catch (e) {
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
module.exports = loginRoute;
