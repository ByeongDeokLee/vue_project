module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: "vue-eslint-parser", // Vue 파일 파싱 지원
  parserOptions: {
    parser: "@babel/eslint-parser", // 최신 JS 문법 지원
    sourceType: "module",
    ecmaVersion: 2021, // 최신 ECMAScript 버전 설정
  },
  extends: [
    "plugin:vue/vue3-recommended", // Vue3 권장 설정
    "eslint:recommended", // 기본 JS 권장 설정
  ],
  rules: {
    "vue/multi-word-component-names": "off", // 'Board' 같은 단일 단어 컴포넌트 이름 허용
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 5, // 한 줄에 최대 5개까지 허용
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
  },
};
