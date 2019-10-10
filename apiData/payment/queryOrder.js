const { get, isEmpty } = require("lodash");
const axios = require("axios");
const moment = require("moment");

const queryRoute = ({
  query,
  router,
  app,
  baseSucessRquest,
  baseErrorRquest
}) => {
  router.post("/common/query", async ctx => {
    const processOrderDabase = async ({ greenpay_id, orderType }) => {
      const orderRes = await query(
        `select * from payOrder where greenpayId='${greenpay_id}';`
      );
      if (!isEmpty(orderRes)) {
        const resArr = await query(
          `update payOrder set orderType=${orderType}, payData='${moment().format("YYYY/MM/DD hh:mm:ss")}' where greenpayId='${greenpay_id}';`
        );
      }
    };
    const hostName = "https://www.greenyep.com/api";
    try {
      let { greenpay_id } = ctx.request.body;
      const data = await axios({
        url: `${hostName}/api/index/query?greenpay_id=${greenpay_id}`,
        method: "get"
      });
      if (get(data, "data.code") == 200) {
        await processOrderDabase({
          greenpay_id,
          orderType: 1
        });
      }
      ctx.body = JSON.stringify({
        ...baseSucessRquest,
        data: get(data, "data")
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
module.exports = queryRoute;
