const { defineConfig } = require("@vue/cli-service");
module.exports = {
  devServer: {
    proxy: {
      "/naver-api": {
        target: "https://nid.naver.com",
        changeOrigin: true,
        pathRewrite: { "^/naver-api": "" },
        secure: false,
      },
    },
  },
};
