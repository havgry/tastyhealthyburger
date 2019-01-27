<template>
  <div class="wrapper align-center">
    <div>
      <router-view @optionDisabled="showLinks"/>
      <transition name="fade">
        <div class="link-container" v-if="showLink">
          Get 
          <router-link
            v-if="nextId"
            :to="{ name: 'optionGroup', params: { id: nextId }}">another one</router-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import gql from 'graphql-tag'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'app',
  data: () => ({
    showLink: false,
  }),
  methods: {
    async showLinks() {
      setTimeout(() => {
        this.showLink = true
      }, 1000)
    },
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

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  color: #222;
}

a {
  color: #e91e63;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

.link-container {
  font-size: 1.2em;
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
}

.align-center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>
