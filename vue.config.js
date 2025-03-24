const { defineConfig } = require("@vue/cli-service");
console.log("\n\n 파일 로두 \n\n\n");

module.exports = {
  transpileDependencies: true,
  lintOnSave: false, // ESLint 검사 비활성화 (문제 해결 후 다시 true로 설정 가능)
  configureWebpack: {
    devtool: process.env.NODE_ENV === "production" ? false : "source-map",
  },
  devServer: {
    proxy: {
      "/naver-api": {
        target: "https://openapi.naver.com",
        changeOrigin: true, // 이 옵션이 CORS 문제 해결
        pathRewrite: { "^/naver-api": "" },
        secure: false,
        logLevel: "debug", // 프록시 디버깅 활성화
        // headers: {
        //   Connection: "keep-alive", // 안정적인 연결 유지
        // },
      },
    },
  },
};
