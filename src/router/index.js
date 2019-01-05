import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components = {
    layout: () => import('@/views/layout/layout.vue'),
    login: () => import('@/views/login.vue'),
    home: () => import('@/views/home.vue'),
    personalCenter: () => import('@/views/personalCenter.vue'),
    userPassword: () => import('@/views/personal/userPassword.vue')
}

export default new Router({
  routes: [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        meta:{
            title: '登录页'
        },
        component: components.login
    },
    {
        path: '/layout',
        redirect: '/layout/home',
        component: components.layout,
        children: [
            {
                path: 'home',
                meta:{
                    title: '用户中心'
                },
                component: components.home
            },
            {
                path: 'myCenter',
                meta:{
                    title: '个人中心'
                },
                component: components.personalCenter
            },
            {
                path: 'password',
                meta:{
                    title: '修改密码'
                },
                component: components.userPassword
            }
        ]
    }
  ]
})
