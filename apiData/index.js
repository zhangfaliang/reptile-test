const {
  changePwdRouter,
  loginRouter,
  signRouter
} = require("./user/index.js");

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
};
module.exports = combintionRouter;
