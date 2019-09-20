const baseSucessRquest = {
  code: 0,
  data: {},
  message: "成功",
  encrypt: 0,
  timestamp: new Date().getTime()
};

const baseErrorRquest = {
  code: 5000,
  data: {},
  message: "error",
  encrypt: 0,
  timestamp: new Date().getTime()
};

module.exports = {
  baseSucessRquest,
  baseErrorRquest
};
