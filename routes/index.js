const getIndex = require("./index/index.js");

const distribetionRoute = ({ router, app, superagent }) => {
  getIndex({ router, app, superagent });
};

module.exports = distribetionRoute;
