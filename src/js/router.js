import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import UserDetail from "./views/UserDetail.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/user/:name/:email", component: UserDetail },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
