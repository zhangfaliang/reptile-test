const { get, isEmpty } = require("lodash");
const request = require("request");
const axios = require("axios");
const { getOrderInfo, getFormData } = require("../../utils/payment");

const reChargeRoute = ({
  query,
  router,
  app,
  baseSucessRquest,
  baseErrorRquest
}) => {
  router.post("/common/recharge", async ctx => {
    try {
      let { payType, goodId, payAmount } = ctx.request.body;
      console.log(ctx.request.body);
      var payMode = 1;
      var payData = getOrderInfo(payMode, payType, payAmount);
      var payFormData = getFormData(payData);

      const data = await axios({
        url: "https://www.greenyep.com/api/index",
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: payFormData
      });
      const htmlStr = get(data, "data");
      ctx.body = JSON.stringify({
        ...baseSucessRquest,
        data: htmlStr
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
module.exports = reChargeRoute;
