import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/beers/:page",
    component: () => import("@/views/List.vue"),
    props: true
  },
  {
    path: "/beers",
    name: "beers",
    redirect: "/beers/1"
  },
  {
    path: "/beer/:id",
    name: "detail",
    component: () => import("@/views/Detail.vue"),
    props: true
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
