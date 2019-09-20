const loginRoute = require("./login/index.js");

const combintionRouter = ({
  query,
  router,
  app,
  baseSucessRquest,
  baseErrorRquest
}) => {
  loginRoute({ query, router, app, baseSucessRquest, baseErrorRquest });
};
module.exports = combintionRouter;
