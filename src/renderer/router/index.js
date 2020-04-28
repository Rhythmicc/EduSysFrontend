import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login-page',
      component: require('@/components/LoginPage').default,
    },
    {
      path: '/register',
      name: 'register-page',
      component: require('@/components/RegisterPage').default
    },
    {
      path: '/StudentDashboard',
      name: 'student-dashboard',
      component: require('@/components/StudentDashboard').default
    },
    {
      path: '/TeacherDashboard',
      name: 'teacher-dashboard',
      component: require('@/components/TeacherDashboard').default
    },
    {
      path: '/ManagerDashboard',
      name: 'manager-dashboard',
      component: require('@/components/ManagerDashboard').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
