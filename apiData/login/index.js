const { get, isEmpty } = require("lodash");
const sjcl = require("../../utils/sjcl");

const indexRoute = ({
  query,
  router,
  app,
  baseSucessRquest,
  baseErrorRquest
}) => {
  router.post("/common/login", async ctx => {
    try {
      let postData = ctx.request.body,
        data = {};
      const { userName, password } = postData;
      const resArr = await query(
        `select * from user where user_name=${userName}`
      );
      data = {
        msg: "用户名或者密码错误",
        verify: false
      };
      if (!isEmpty(resArr)) {
        const user_password = sjcl.decrypt(
          "password",
          get(resArr, "0.user_password")
        );
        const resPwd = sjcl.decrypt("password", password);
        if (resPwd === user_password) {
          ctx.session.userId = userName;
          data = { msg: "成功登陆", verify: true };
        }
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
