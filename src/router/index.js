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
    redirect: '/IndexPage/allStation',
    component: () => import("../views/IndexPage.vue"),
    meta: {
      keepAlive: true,
      requiresAuth: true,
      title: "储能E管家 | 首页",
    },
    children: [
      // {
      //   path: '/IndexPage',
      //   redirect: '/IndexPage/allStation' // 重定向到子路由login
      // },
      {
        path: "allStation",
        name: "allStation",
        component: () => import("../views/AllStation.vue"),
        meta: {
          requiresAuth: true,
          title: "储能E管家 | 电站总览",
        },
        // children:[
        //   {
        //     path: "allEnergy",
        //     name: "allEnergy",
        //     component: () => import("../views/StationOverview/AllEnergy.vue"),
        //     meta: {
        //       keepAlive: true,
        //       requiresAuth: true,
        //       title: "储能E管家 | 场站",
        //     },
        //   },
        //   {
        //     path: "allProfit",
        //     name: "allProfit",
        //     component: () => import("../views/StationOverview/AllProfit.vue"),
        //     meta: {
        //       keepAlive: true,
        //       requiresAuth: true,
        //       title: "储能E管家 | 收益",
        //     },
        //   }
        // ]
      },
      {
        path: "allEvent",
        name: "allEvent",
        component: () => import("../views/AllEvent.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "储能E管家 | 总事件",
        },
      },
      {
        path: "historyData",
        name: "historyData",
        component: () => import("../views/HistoryData.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "储能E管家 | 历史数据",
        },
      },
      {
        path: "myPage",
        name: "myPage",
        component: () => import("../views/MyPage.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "储能E管家 | 我的",
        },
      }
      
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
