import Vue from 'vue'
import VueApollo from 'vue-apollo'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'

import { ApolloClient } from 'apollo-client'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import App from './components/App.vue'
import router from './router'
import store from './store'

Vue.use(VueApollo)
Vue.use(VueRouter)

sync(store, router)

const httpLink = new BatchHttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjc1to1bi0coo0107td2uf3ro',
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

export default new Vue({
  el: '#app',
  apolloProvider,
  router,
  store,
  render: createElement => createElement(App),
})
