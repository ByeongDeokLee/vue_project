import { createRouter, createWebHistory } from "vue-router";
import Login from "../view/Login.vue";
import Board from "../view/Board.vue";
import DetailPage from "../view/DetailPage.vue";
import EditPage from "../view/EditPage.vue";
import BoardWrite from "../view/BoardWrite.vue";
import NewsPage from "../view/News.vue";
import NaverLogin from "../view/NaverLogin.vue";
import NaverMap from "../view/NaverMap.vue";
import Calendar from "../view/Calendar.vue";

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
  {
    path: "/newsPage",
    component: NewsPage,
  },
  {
    path: "/naverLogin",
    component: NaverLogin,
  },
  {
    path: "/naverMap",
    component: NaverMap,
  },
  {
    path: "/Calendar",
    component: Calendar,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
