const { get, isEmpty } = require("lodash");
const request = require("request");
const axios = require("axios");
const { getOrderInfo, getFormData } = require("../../utils/payment");
const moment = require("moment");

const customRoute = ({
  query,
  router,
  app,
  baseSucessRquest,
  baseErrorRquest
}) => {
  router.post("/common/custom", async ctx => {
    try {
      let { payType, goodId, payAmount } = ctx.request.body;
      var payMode = 2;
      var payData = getOrderInfo(payMode, payType, payAmount);
      var payFormData = getFormData(payData);
      const hostName = "https://www.greenyep.com/api";
      const data = await axios({
        url: `${hostName}/api/index`,
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: payFormData
      });
      const { sessionId } = get(ctx, "session", {});
      const { amount, greenpay_id, type } = get(data, "data.content");
      const resArr = await query(
        `select * from user where user_name='${sessionId}';`
      );
      if (!isEmpty(resArr)) {
        const { user_id } = get(resArr, "0");
        await query(
          `insert  into  payOrder(greenpayId,goodId,userId,amount,paymentType,payData,orderType)
               values('${greenpay_id}','${goodId}','${user_id}',${amount *
            100},'${type}','${moment().format("l")}',0);`
        );
      }

      ctx.body = JSON.stringify({
        ...baseSucessRquest,
        data: get(data, "data.content")
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
module.exports = customRoute;
