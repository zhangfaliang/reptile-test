const { get, isEmpty } = require("lodash");
const indexRoute = ({
  query,
  router,
  app,
  baseSucessRquest,
  baseErrorRquest
}) => {
  const isSomeoneUser = ({ user_name, res }) => {
    return res.some(item => get(item.user_name) === user_name);
  };
  router.post("/common/login", async ctx => {
    try {
      let postData = ctx.request.body;
      const { userName, password } = postData;
      const resArr = await query(
        `select * from user where user_name=${userName} and user_password=${password}`
      );
      if (isEmpty(resArr)) {
        ctx.body = JSON.stringify({
          ...baseSucessRquest,
          data: {
            msg: "用户名或者密码错误",
            verify: false
          }
        });
      } else {
        ctx.body = JSON.stringify({
          ...baseSucessRquest,
          data: { msg: "成功登陆", verify: true }
        });
      }
    } catch (e) {
      ctx.body = JSON.stringify({
        ...baseErrorRquest,
        data: { message: "服务器未知错误", verify: false }
      });
    }

    ctx.body = JSON.stringify(postData);
  });
  router.post("/common/signin", async ctx => {
    try {
      let postData = ctx.request.body;
      const { userName, password } = postData;
      const resArr = await query(
        `select * from user where user_name=${userName}`
      );
      if (isEmpty(resArr)) {
        const res = await query(
          `insert  into  user(user_name,user_password) values(${userName},${password});`
        );
        ctx.body = JSON.stringify({
          ...baseSucessRquest,
          data: {
            msg: "注册成功",
            verify: true
          }
        });
      } else {
        ctx.body = JSON.stringify({
          ...baseSucessRquest,
          data: { msg: "用户名已被占用，去登陆", verify: false }
        });
      }
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
module.exports = indexRoute;
