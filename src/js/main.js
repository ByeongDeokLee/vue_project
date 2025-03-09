import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 추가해야 함
import { createNaverMap } from "vue3-naver-maps";

const app = createApp(App);
app,
  use(createNaverMap, {
    clientId: "your clientId", // Required
    category: "ncp", // Optional
    subModules: [], // Optional
  });
app.use(router); // Vue Router 등록
app.mount("#app");
