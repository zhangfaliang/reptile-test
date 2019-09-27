require("core-js");
const Koa = require("koa");
const superagent = require("superagent");
const cheerio = require("cheerio");
const Router = require("koa-router");
const distribetionRoute = require("../routes/index.js");
const bodyParser = require("koa-bodyparser");
const query = require("../connect/index");
const apiRouter = require("../apiData/index");
const { baseSucessRquest, baseErrorRquest } = require("../utils/common");
const { setSession } = require("../session/index");
const { _cors, main } = require("../_cors/index");
const router = new Router();
const app = new Koa();
const port = 5000;
setSession({ app });
distribetionRoute({ router, app, superagent });
apiRouter({
  query,
  router,
  app,
  baseSucessRquest,
  baseErrorRquest
});
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
// app.use(_cors);
// app.use(main);
app.listen(port);
