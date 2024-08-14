const { createProxyMiddleware } = require("http-proxy-middleware");

const customerProxy = createProxyMiddleware({
    // target: "http://localhost:8089",
    target: "http://backend-provider:8089",
    changeOrigin: true,
    pathRewrite: {
        "^/provider": "",
    },
});

module.exports = customerProxy;