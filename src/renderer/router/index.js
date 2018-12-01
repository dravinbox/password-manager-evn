import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'info',
      component: require('@/components/Info/Info').default
    },
    {
      path: '/test',
      name: 'test',
      component: require('@/components/Test/Test').default
    },
    {
      path: '/info',
      name: 'info',
      component: require('@/components/Info/Info').default
    },
    {
      path: '/addinfo',
      name: 'addinfo',
      component: require('@/components/Info/AddInfo').default
    },
    {
      path: '/daily',
      name: 'daily',
      component: require('@/components/Daily').default
    },
    {
      path: '/doc',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
