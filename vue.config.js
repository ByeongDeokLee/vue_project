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
        target: "https://openapi.naver.com/",
        changeOrigin: true,
      },
    },
  },
};
