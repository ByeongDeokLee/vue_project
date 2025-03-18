const { defineConfig } = require("@vue/cli-service");
module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "https://nid.naver.com",
        changeOrigin: true,
        pathRewrite: { "^/api": "" }, // /api를 제거하여 실제 요청을 보냄
        secure: false,
      },
    },
  },
};
