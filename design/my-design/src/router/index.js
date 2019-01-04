import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components = {
    home: () => import('@/views//home.vue'),
    login: () => import('@/views/login.vue')
}

export default new Router({
  routes: [
    {
        path: '/',
        redirect: '/login'
    },
    {
      path: '/home',
      meta:{
          title: '学生考勤系统'
      },
      component: components.home
    },
    {
        path: '/login',
        meta:{
            title: '登录页'
        },
        component: components.login
    }
  ]
})
