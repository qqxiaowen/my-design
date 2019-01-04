import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components = {
    homeStudent: () => import('@/views/home/homeStudent.vue'),
    homeTeacher: () => import('@/views/home/homeTeacher.vue'),
    login: () => import('@/views/login.vue')
}

export default new Router({
  routes: [
    {
      path: '/teacher',
      meta:{
          title: '教师-首页'
      },
      component: components.homeTeacher
    },
    {
    path: '/student',
    meta:{
        title: '学生-首页'
    },
    component: components.homeStudent
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
