const { defineConfig } = require("@vue/cli-service");
module.exports = {
  transpileDependencies: true,
  lintOnSave: false, // ESLint 검사 비활성화 (문제 해결 후 다시 true로 설정 가능)
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    proxy: {
      "/naver-api": {
        target: "https://openapi.naver.com",
        changeOrigin: true,
        pathRewrite: { "^/naver-api": "" },
        secure: false,
        logLevel: "debug", // 로그 활성화
      },
    },
  },
};
