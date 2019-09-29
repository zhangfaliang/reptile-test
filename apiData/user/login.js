const { get, isEmpty } = require("lodash");
const sjcl = require("../../utils/sjcl");

const loginRoute = ({
  query,
  router,
  app,
  baseSucessRquest,
  baseErrorRquest
}) => {
  const processSession = async ({ user_id, sessionId, expire }) => {
    console.log(user_id, sessionId, expire, "-----");

    try {
      const sessionArr = await query(
        `select * from session_store where user_id=${user_id}`
      );
      if (isEmpty(sessionArr)) {
        const res = await query(
          `insert  into  session_store(user_id,sessionId,expire) values(${user_id},${sessionId},${expire});`
        );
      } else {
        const res = await query(
          `update session_store set expire=${expire} where user_id=${user_id} ;`
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
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
          ctx.session.sessionId = userName;
          // 登录处理session
          processSession({
            user_id: get(resArr, "0.user_id"),
            sessionId: userName,
            expire: new Date().getTime()
          });
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
        data: { msg: "服务器未知错误", verify: false }
      });
    }
  });

  app.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });
};
module.exports = loginRoute;
