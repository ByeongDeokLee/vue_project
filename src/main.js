import { createApp } from "vue";
import App from "./App.vue";
import router from "./js/router";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia); // 📌  Pinia 등록
app.use(router); // 📌 라우터 추가 (이게 없으면 this.$router가 undefined)
app.mount("#app");
