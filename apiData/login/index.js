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
      let postData = ctx.request.body;
      const { userName, password } = postData;
      const resArr = await query(
        `select * from user where user_name=${userName}`
      );
      const user_password = `"${get(resArr, "0.user_password")}"`;
      console.log(password, "-------", user_password);
      // console.log(sjcl.decrypt("password", user_password))
      // console.log(sjcl.decrypt("password", user_password));
      if (isEmpty(resArr)) {
        ctx.body = JSON.stringify({
          ...baseSucessRquest,
          data: {
            msg: "用户名或者密码错误",
            verify: false
          }
        });
      } else {
        ctx.session.userId = userName;
        ctx.body = JSON.stringify({
          ...baseSucessRquest,
          data: { msg: "成功登陆", verify: true }
        });
      }
    } catch (e) {
      console.log(e);
      ctx.body = JSON.stringify({
        ...baseErrorRquest,
        data: { message: "服务器未知错误", verify: false }
      });
    }
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

  router.post("/common/changepwd", async ctx => {
    try {
      let postData = ctx.request.body;
      const { userName, password, newPassword, newPasswordAgin } = postData;
      console.log(
        postData,
        `select * from user where user_name=${userName}`,
        "------"
      );

      const resArr = await query(
        `select * from user where user_name=${userName}`
      );
      ///and user_password=${password}
      console.log(resArr, "------");
      if (!isEmpty(resArr)) {
        // const res = await query(
        //   `UPDATE user SET field2=new-value2;`
        // );
        ctx.body = JSON.stringify({
          ...baseSucessRquest,
          data: {
            msg: "修改成功",
            verify: true
          }
        });
      } else {
        ctx.body = JSON.stringify({
          ...baseSucessRquest,
          data: { msg: "用户名或者密码错误", verify: false }
        });
      }
    } catch (e) {
      console.log(e);
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
