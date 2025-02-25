import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 추가해야 함

const app = createApp(App);
app.use(router); // Vue Router 등록
app.mount("#app");
