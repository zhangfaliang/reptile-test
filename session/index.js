const session = require("koa-session");
const CONFIG = {
  key: "koa:sess" /*（string）cookie键（默认为koa：sess）*/,
  /**（number ||'session'）maxAge以毫秒为单位（默认为1天）*/
  /**'session'将导致cookie在会话/浏览器关闭时过期*/
  /**警告：如果会话cookie被盗，该cookie将永不过期*/
  maxAge: 86400000,
  autoCommit: true /**（布尔值）自动提交标头（默认为true）*/,
  overwrite: true /**（布尔值）是否可以覆盖（默认为true）*/,
  httpOnly: true /**（布尔值）是否为httpOnly（默认为true）*/,
  signed: true /**（布尔值）是否签名（默认为true）*/,
  rolling: false /**（布尔值）强制在每个响应上设置会话标识符cookie。到期重置为原始的maxAge，重置到期倒数。 （默认为false）*/,
  renew: false /**（布尔值）在会话即将到期时更新会话，因此我们始终可以使用户保持登录状态。（默认为false）*/
};
const setSession = ({ app }) => {
  app.keys = ['my-secret'];
  app.use(session(CONFIG, app));
};
module.exports.setSession = setSession;
