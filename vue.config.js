const { defineConfig } = require("@vue/cli-service");
module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    port: 8080,
    proxy: {
      "/v1": {
        target: "https://openapi.naver.com/",
        changeOrigin: true,
      },
    },
  },
};
