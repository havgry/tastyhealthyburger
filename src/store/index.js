import Vue from 'vue'
import Vuex from 'vuex'

import _map from 'lodash/map'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allIds: [],
    availableIds: [],
    nextId: null,
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    setNextId(state, { id }) {
      // Reset if end has been reached
      if (state.availableIds.length === 1) {
        state.availableIds = state.allIds
      }

      state.availableIds = state.availableIds.filter(val => val !== id)
      state.nextId = state.availableIds[0]
    },
    setAllIds(state, { optionGroups }) {
      const allIds = _map(optionGroups, optionGroup => optionGroup.shortId)

      state.allIds = allIds
      state.availableIds = allIds
    },
    /* eslint-enable no-param-reassign */
  },
})
