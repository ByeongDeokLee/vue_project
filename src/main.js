import { createApp } from "vue";
import App from "./App.vue";
import router from "./js/router";

const app = createApp(App);
app.use(router); // 📌 라우터 추가 (이게 없으면 this.$router가 undefined)
app.mount("#app");
