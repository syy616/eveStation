import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
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
    path: "/IndexPage",
    name: "IndexPage",
    redirect: "/IndexPage/StationOverview",
    component: () => import("../views/IndexPage.vue"),
    meta: {
      keepAlive: true,
      requiresAuth: true,
      title: "储能E管家 | 首页",
    },
    children: [
      {
        path: "StationOverview",
        name: "StationOverview",
        redirect: "/IndexPage/StationOverview/allStation",
        component: () => import("../views/IndexPages/StationOverview.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "储能E管家 | 电站总览",
        },
        children: [
          {
            path: "allStation",
            name: "allStation",
            component: () => import("../views/StationOverview/AllStation.vue"),
            meta: {
              keepAlive: true,
              requiresAuth: true,
              title: "储能E管家 | 场站",
            },
          },
          {
            path: "allProfit",
            name: "allProfit",
            component: () => import("../views/StationOverview/AllProfit.vue"),
            meta: {
              keepAlive: true,
              requiresAuth: true,
              title: "储能E管家 | 收益",
            },
          },
          {
            path: "allEnergy",
            name: "allEnergy",
            component: () => import("../views/StationOverview/AllEnergy.vue"),
            meta: {
              keepAlive: true,
              requiresAuth: true,
              title: "储能E管家 | 能耗",
            },
          },
        ],
      },
      {
        path: "totalEvent",
        name: "totalEvent",
        component: () => import("../views/IndexPages/TotalEvent.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "储能E管家 | 总事件",
        },
      },
      {
        path: "historyData",
        name: "historyData",
        component: () => import("../views/IndexPages/HistoryData.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "储能E管家 | 历史数据",
        },
      },
      {
        path: "myPage",
        name: "myPage",
        component: () => import("../views/IndexPages/MyPage.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "储能E管家 | 我的",
        },
      },
    ],
  },
  {
    path: "/station",
    name: "station",
    component: () => import("../views/Stations/index.vue"),
    meta: {
      keepAlive: true,
      requiresAuth: true,
      title: "储能E管家 | 场站",
    },
    children: [
      {
        path: "system",
        name: "system",
        component: () => import("../views/Stations/tabs/system.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "储能E管家 | 系统",
        },
      },
      {
        path: "income",
        name: "income",
        component: () => import("../views/Stations/tabs/income.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "储能E管家 | 收益",
        },
      },
      {
        path: "equipment",
        name: "equipment",
        component: () => import("../views/Stations/tabs/equipment.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "储能E管家 | 设备",
        },
      },
      {
        path: "energy",
        name: "energy",
        component: () => import("../views/Stations/tabs/energy.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "储能E管家 | ",
        },
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
  const role = localStorage.getItem("userInfo");
  if (to.meta.requiresAuth && !role && to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});

export default router;
