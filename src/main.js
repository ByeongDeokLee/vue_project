import { createApp } from "vue";
import App from "./App.vue";
import router from "./js/router";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia); // 📌  Pinia 등록
app.use(router); // 📌 라우터 추가 (이게 없으면 this.$router가 undefined)
app.use(VueAxios, axios);
app.config.globalProperties.axios = axios;
app.mount("#app");
