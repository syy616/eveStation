import { createRouter, createWebHashHistory } from "vue-router";

/**
 * 路由数组自定义id号(登录除外)
 * 目的：路由切换时根据id号 由大-小 或 由小-大 改变页面切换动画的方向
 */
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
    path: "/IndexPage",
    name: "IndexPage",
    redirect: "/IndexPage/StationOverview",
    component: () => import("../views/IndexPage.vue"),
    meta: {
      keepAlive: true,
      requiresAuth: true,
      title: "储能E管家 | 首页",
      id: 0,
    },
    children: [
      {
        path: "StationOverview",
        name: "StationOverview",
        component: () => import("../views/IndexPages/StationOverview.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "储能E管家 | 电站总览",
          id: 1,
        },
      },
      {
        path: "totalEvent",
        name: "totalEvent",
        component: () => import("../views/IndexPages/TotalEvent.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "储能E管家 | 总事件",
          id: 2,
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
          id: 3,
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
          id: 4,
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
      id: 5,
    },
  },
  {
    path: "/systemOverview",
    name: "systemOverview",
    // redirect: "/systemOverview/system",
    component: () => import("../views/System/SystemOverview.vue"),
    meta: {
      keepAlive: true,
      requiresAuth: true,
      title: "储能E管家 | 系统",
      id: 6,
    },
  },
  {
    path: "/IndexPage/myPage/language",
    name: "language",
    component: () => import("../views/MinePages/Language.vue"),
    meta: {
      keepAlive: true,
      requiresAuth: true,
      title: "多语言",
      id: 7,
    },
  },
  {
    path: "/IndexPage/myPage/theme",
    name: "theme",
    component: () => import("../views/MinePages/Theme.vue"),
    meta: {
      keepAlive: true,
      requiresAuth: true,
      title: "主题切换",
      id: 8,
    },
  },
  {
    path: "/IndexPage/myPage/myCollect",
    name: "collect",
    component: () => import("../views/MinePages/Collect.vue"),
    meta: {
      keepAlive: true,
      requiresAuth: true,
      title: "我的收藏",
      id: 9,
    },
  },
  {
    path: "/IndexPage/myPage/aboutApp",
    name: "aboutApp",
    component: () => import("../views/MinePages/About.vue"),
    meta: {
      keepAlive: true,
      requiresAuth: true,
      title: "关于APP",
      id: 10,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// const store = useSessionStorage();
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
