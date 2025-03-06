import { createRouter, createWebHistory } from "vue-router";
import Login from "../view/Login.vue";
import Board from "../view/Board.vue";
import DetailPage from "../view/DetailPage.vue";
import EditPage from "../view/EditPage.vue";
import BoardWrite from "../view/BoardWrite";

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
  {
    path: "/boardWrite",
    component: BoardWrite,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
