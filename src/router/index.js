import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import stationOverview from '../views/StationOverview.vue'

const routes = [
  {
    redirect: '/login',
    path: '/'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      keepAlive: true,
      title:'储能E管家 | 登录'
    }
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Home,
    meta: {
      keepAlive: true,
      title:'储能E管家 | 主页'
    }
  },
  {
    path: '/stationOverview',
    name: 'stationOverview',
    component: stationOverview,
    meta: {
      keepAlive: true,
      title:'储能E管家 | 电站总览'
    }
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? to.meta.title : '储能E管家';
    const role = localStorage.getItem('username')
    if (!role && to.path !== "/login") {
        next('/login');
    } else {
        next();
    }
})

export default router
