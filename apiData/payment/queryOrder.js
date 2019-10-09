const { get, isEmpty } = require("lodash");
const axios = require("axios");

const queryRoute = ({
    query,
    router,
    app,
    baseSucessRquest,
    baseErrorRquest
}) => {
    router.post("/common/query", async ctx => {
        const hostName = "https://www.greenyep.com/api";
        try {
            let { greenpay_id } = ctx.request.body;
            const data = await axios({
                url: `${hostName}/api/index/query`,
                method: "post",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: {
                    greenpay_id
                }
            });
            console.log(data);
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
