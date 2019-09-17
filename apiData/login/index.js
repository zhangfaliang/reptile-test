const { get } = require("lodash");
const indexRoute = ({ query, router, app }) => {
  const isSomeoneUser = ({ user_name, res }) => {
    return res.some(item => get(item.user_name) === user_name);
  };
  router.post("/common/login", async ctx => {
    const res = await query("select * from user");
    //isSomeoneUser()
    let postData = ctx.request.body;
    ctx.body = JSON.stringify(postData);

    console.log(res);
  });
  router.post("/common/signin", async ctx => {
    const res = await query("select * from user");
    let postData = ctx.request.body;
    ctx.body = JSON.stringify(postData);
  });
  app.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });
};
module.exports = indexRoute;
