<template>
  <ul class="option-list">
    <li v-for="(option, index) in mappedOptions" :key="option.label">
      <toggle-button
        v-model="option.value"
        @input="disableOption(index)"
        class="align-center"/>
      <span
        v-text="option.label"
        class="option-label"/>
    </li>
  </ul>
</template>

<script>

import gql from 'graphql-tag'
import _some from 'lodash/some'
import _map from 'lodash/map'
import { mapState } from 'vuex'

import { getRandomInArray } from 'helpers'
import ToggleButton from './ToggleButton.vue'

export default {
  name: 'optionGroup',
  components: {
    ToggleButton,
  },
  data: () => ({
    optionGroup: null,
    mappedOptions: [],
  }),
  apollo: {
    optionGroup: {
      query: gql`
        query ($shortId: String!) {
          OptionGroup (shortId: $shortId) {
            id
            shortId
            options {
              label
            }
          }
        }
      `,
      variables() {
        return {
          shortId: this.id,
        }
      },
      update: ({ OptionGroup }) => OptionGroup,
    },
  },
  computed: {
    areAnyOptionsDisabled() {
      // Continue until a disabled option is found
      return _some(this.mappedOptions, option => option.value === false)
    },
    ...mapState({
      id: state => state.route.params.id,
    }),
  },
  watch: {
    optionGroup(newValue) {
      this.mapOptions(newValue.options)
    },
  },
  methods: {
    disableOption(toggledOptionIndex) {
      // Disable one option if all options are enabled.
      // However, don't disable the option that was just enabled.
      if (this.areAnyOptionsDisabled === false) {
        const optionToDisable = getRandomInArray(this.mappedOptions, toggledOptionIndex)
        optionToDisable.value = false
        this.$emit('optionDisabled')
      }
    },
    mapOptions(options) {
      this.mappedOptions = _map(options, option => ({
        label: option.label,
        value: false,
      }))
    },
  },
}

</script>

<style lang="scss">

.option-list {
  margin: 0;
  padding: 0;
  list-style: none;
  > li {
    margin: 2em;
    display: flex;
  }
}

.option-label {
  padding-left: .5em;
  font-size: 1.8em;
  text-transform: uppercase;
}

</style>
