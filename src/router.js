import { createRouter, createWebHistory } from "vue-router";

import AppHome from "./pages/AppHome.vue";
import ProjectsPage from "./pages/ProjectsPage.vue";
import AboutPage from "./pages/AboutPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppHome,
    },
    {
      path: "/projects",
      name: "projects",
      component: ProjectsPage,
    },
    {
      path: "/about",
      name: "about",
      component: AboutPage,
    }
  ],
});
export { router };
