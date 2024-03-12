import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    redirect: "/login",
    path: "/",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login/Login.vue"),
    meta: {
      keepAlive: true,
      requiresAuth: false,
      title: "储能E管家 | 登录",
    },
  },
  {
    path: "/home",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Home.vue"),
    meta: {
      keepAlive: true,
      requiresAuth: true,
      title: "储能E管家 | 主页",
    },
  },
  {
    path: "/stationOverview",
    name: "stationOverview",
    component: () => import("../views/StationOverview.vue"),
    meta: {
      keepAlive: true,
      requiresAuth: true,
      title: "储能E管家 | 电站总览",
    },
    children: [
      {
        path: "allEnergy",
        name: "allEnergy",
        component: () => import("../views/AllEnergy.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "储能E管家 | 数据总览",
        },
      },
      {
        path: "/",
        requiresAuth: true,
        name: "allEnergy",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : "储能E管家";
  const role = localStorage.getItem("username");
  if (to.meta.requiresAuth && !role && to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});

export default router;
