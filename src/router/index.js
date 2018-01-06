import Vue from 'vue'
import Router from 'vue-router'

import OptionGroup from 'components/OptionGroup.vue'

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
      name: 'optionGroup',
      path: '/:id',
      component: OptionGroup,
    },
  ],
})

export default router
