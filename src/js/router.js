import { createRouter, createWebHistory } from "vue-router";
import Login from "../view/Login.vue";
import Board from "../view/Board.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/board", component: Board, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
