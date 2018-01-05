import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

import App from './components/App.vue'

Vue.use(VueApollo)

const httpLink = new HttpLink({
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
  render: createElement => createElement(App),
})
