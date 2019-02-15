import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components = {
    layout: () => import('@/views/layout/layout.vue'),
    login: () => import('@/views/login.vue'),
    home: () => import('@/views/home.vue'),
    personalCenter: () => import('@/views/personalCenter.vue'),
    userPassword: () => import('@/views/personal/userPassword.vue'),
    userInfo: () => import('@/views/personal/userInfo'),
    classInfo: () => import('@/views/studentInfo/classInfo.vue'),
    addClassInfo: () => import('@/views/studentInfo/addClassInfo.vue'),
    classInfoDetail: () => import('@/views/studentInfo/classInfoDetail.vue')
}

const router =  new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            meta: {
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
                    meta: {
                        title: '用户中心'
                    },
                    component: components.home
                },
                {
                    path: 'myCenter',
                    meta: {
                        title: '个人中心'
                    },
                    component: components.personalCenter
                },
                {
                    path: 'info',
                    meta: {
                        title: '个人信息'
                    },
                    component: components.userInfo
                },
                {
                    path: 'password',
                    meta: {
                        title: '修改密码'
                    },
                    component: components.userPassword
                },
                {
                    path: 'classInfo',
                    meta: {
                        title: '班级信息'
                    },
                    component: components.classInfo
                },
                {
                    path: 'addClassInfo',
                    meta: {
                        title: '新增班级信息'
                    },
                    component: components.addClassInfo
                },
                {
                    path: 'classInfoDetail/:id',
                    meta: {
                        title: '班级信息详情页'
                    },
                    component: components.classInfoDetail
                },
                
            ]
        }
    ]
})

export default router