const { get, isEmpty } = require("lodash");
const indexRoute = ({ query, router, app }) => {
  const isSomeoneUser = ({ user_name, res }) => {
    return res.some(item => get(item.user_name) === user_name);
  };
  router.post("/common/login", async ctx => {
    const res = await query("select * from user");
    //isSomeoneUser()
    let postData = ctx.request.body;
    ctx.body = JSON.stringify(postData);
  });
  router.post("/common/signin", async ctx => {
    let postData = ctx.request.body;
    const { userName, password } = postData;
    const resArr = await query(
      `select * from user where user_name=${userName}`
    );
    if (isEmpty(resArr)) {
      const res = await query(
        `inset  into  user(user_name,user_password) values(${userName},${password});`
      );
      console.log(res);
    }
    ctx.body = JSON.stringify(postData);
  });
  app.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });
};
module.exports = indexRoute;
