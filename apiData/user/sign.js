const { isEmpty } = require("lodash");

const signRoute = ({
  query,
  router,
  app,
  baseSucessRquest,
  baseErrorRquest
}) => {
  router.post("/common/signin", async ctx => {
    try {
      let postData = ctx.request.body,
        data = { msg: "用户名已被占用，去登陆", verify: false };
      const { userName, password } = postData;
      const resArr = await query(
        `select * from user where user_name=${userName}`
      );
      if (isEmpty(resArr)) {
        const res = await query(
          `insert  into  user(user_name,user_password) values(${userName},${password});`
        );
        data = {
          msg: "注册成功",
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
        data: { message: "服务器未知错误", verify: false }
      });
    }
  });

  app.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });
};
module.exports = signRoute;
