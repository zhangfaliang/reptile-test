const {
  changePwdRouter,
  loginRouter,
  signRouter,
  userInfoRoute,
  logoutRoute
} = require("./user/index.js");
const { customRouter, standardRouter } = require("./payment/index.js");

const { pageIndexConfigRoute } = require("./config/index.js");

const combintionRouter = ({
  query,
  router,
  app,
  baseSucessRquest,
  baseErrorRquest
}) => {
  changePwdRouter({ query, router, app, baseSucessRquest, baseErrorRquest });
  loginRouter({ query, router, app, baseSucessRquest, baseErrorRquest });
  signRouter({ query, router, app, baseSucessRquest, baseErrorRquest });
  userInfoRoute({ query, router, app, baseSucessRquest, baseErrorRquest });
  logoutRoute({ query, router, app, baseSucessRquest, baseErrorRquest });
  pageIndexConfigRoute({
    query,
    router,
    app,
    baseSucessRquest,
    baseErrorRquest
  });
  standardRouter({ query, router, app, baseSucessRquest, baseErrorRquest });
  customRouter({ query, router, app, baseSucessRquest, baseErrorRquest });
};
module.exports = combintionRouter;
