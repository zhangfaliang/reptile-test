require("core-js");
const Koa = require("koa");
const superagent = require("superagent");
const cheerio = require("cheerio");
const Router = require("koa-router");
const distribetionRoute = require("../routes/index.js");
const router = new Router();
const app = new Koa();
const port = 8000;
distribetionRoute({ router, app, superagent });

app.use(router.routes()).use(router.allowedMethods());
app.listen(port);
