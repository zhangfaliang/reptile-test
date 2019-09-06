const { get } = require("lodash");
const getIndex = ({ router, app, superagent }) => {
  router.get("/", async (ctx, next) => {
    try {
      const { text } = await superagent
        .get("https://m.weibo.cn/api/container/getIndex")
        .query({ containerid: "102803_ctg1_4388_-_ctg1_4388", openApp: "0" });
      ctx.body = JSON.parse(text, "data.data");
    } catch (err) {
      console.error(err);
    }
  });
};

module.exports = getIndex;
