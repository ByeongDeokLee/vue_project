const { defineConfig } = require("@vue/cli-service");
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://openapi.naver.com/",
        changeOrigin: true,
      },
    },
  },
};
