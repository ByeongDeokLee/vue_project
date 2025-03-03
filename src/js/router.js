import { createRouter, createWebHistory } from "vue-router";
import Login from "../view/Login.vue";
import Board from "../view/Board.vue";
import DetailPage from "../view/DetailPage.vue";
import EditPage from "../view/EditPage.vue";

const routes = [
  { path: "/", component: Login },
  {
    path: "/board",
    component: Board,
    props: true,
  },
  {
    path: "/board/:id",
    component: DetailPage,
    props: true,
  },
  {
    path: "/board/:id/editPage",
    component: EditPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
