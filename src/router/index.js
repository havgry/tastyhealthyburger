import Vue from 'vue'
import Router from 'vue-router'

import App from 'components/App.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  path: __dirname,
  routes: [
    {
      path: '/',
      redirect: '/nYrnfYEv',
    },
    {
      path: '/:optionGroupShortId',
      component: App,
    },
  ],
})

export default router
