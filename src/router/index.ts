import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "Home",
      keepAlive: true
    },
    component: () => import("../views/Home/index.vue"),
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: () => import("../views/Profile/index.vue"),
  },
  { path: "/:catchAll(.*)", redirect: "/" }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
