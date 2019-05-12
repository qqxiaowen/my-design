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
    classInfoDetail: () => import('@/views/studentInfo/classInfoDetail.vue'),
    course: () => import('../views/course/courseList.vue'),
    selectClock: () => import('../views/clock/selectClock.vue'),
    commonClock: () => import('../views/clock/commonClock.vue'),
    lookClock: () => import('../views/lookClock/lookClock.vue'),
    lookClockDetail: () => import('../views/lookClock/lookClockDetail.vue'),
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
                    path: 'classInfoDetail/:id',
                    meta: {
                        title: '班级信息详情页'
                    },
                    component: components.classInfoDetail
                },
                {
                    path: 'course',
                    meta: {
                        title: '课程信息'
                    },
                    component: components.course
                },
                {
                    path: 'selectClock',
                    meta: {
                        title: '选择课程'
                    },
                    component: components.selectClock
                },
                {
                    path: 'commonClock',
                    meta: {
                        title: '普通考勤'
                    },
                    component: components.commonClock
                },
                {
                    path: 'lookClock',
                    meta: {
                        title: '查看考勤'
                    },
                    component: components.lookClock
                },
                {
                    path: 'lookClockDetail/:id',
                    meta: {
                        title: '查看考勤详情'
                    },
                    component: components.lookClockDetail
                }
            ]
        }
    ]
})

export default router