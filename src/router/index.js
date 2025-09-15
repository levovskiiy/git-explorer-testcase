import Vue from "vue";
import Router from "vue-router";
import Home from "../pages/Home/Home.vue";
import RepoDetail from "../pages/Detail/RepoDetail.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/repo/:owner/:repo",
      name: "repo",
      component: RepoDetail,
    },
  ],
});
