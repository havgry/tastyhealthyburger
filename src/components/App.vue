<template>
  <div class="wrapper align-center">
    <router-view/>
    <router-link
      v-if="nextId"
      :to="{ name: 'optionGroup', params: { id: nextId }}">Give me another one!</router-link>
  </div>
</template>

<script>

import gql from 'graphql-tag'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'app',
  methods: {
    ...mapMutations(['setNextId', 'setAllIds']),
  },
  computed: mapState({
    currentId: state => state.route.params.id,
    nextId: state => state.nextId,
  }),
  watch: {
    currentId(newValue) {
      this.setNextId({ id: newValue })
    },
  },
  async created() {
    const result = await this.$apollo.query({
      query: gql`
        query {
          allOptionGroups {
            shortId
          }
        }
      `,
    })

    this.setAllIds({ optionGroups: result.data.allOptionGroups })
    this.setNextId({ id: this.currentId })
  },
}

</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css?family=Roboto:300');
@import '~normalize.css/normalize.css';

html,
body,
.wrapper {
  height: 100%;
}

html {
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  color: #222;
}

a {
  color: #e91e63;
  font-size: 1.4em;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

.align-center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

</style>
