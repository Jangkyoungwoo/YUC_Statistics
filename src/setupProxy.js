const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/openapi",
    createProxyMiddleware({
      target: "https://kosis.kr",
      changeOrigin: true,
    })
  );
};
