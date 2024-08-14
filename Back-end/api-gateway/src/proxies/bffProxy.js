const { createProxyMiddleware } = require("http-proxy-middleware");

const bffProxy = createProxyMiddleware({
    // target: "http://localhost:8088",
    target: "http://backend-bff:8088",

    changeOrigin: true,
    pathRewrite: {
        "^/bff": "",
    },
});

module.exports = bffProxy;