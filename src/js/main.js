import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createNaverMap } from "vue3-naver-maps";

const app = createApp(App);
app.use(createNaverMap, {
  clientId: "za4sh7eidb", // Required
  category: "ncp", // Optional
  subModules: [], // Optional
});
app.use(router); // Vue Router 등록
app.mount("#app");
