import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/Home.vue";
import UserDetail from "../view/UserDetail.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/user/:name/:email", component: UserDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
