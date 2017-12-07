<template>
  <ul>
    <li v-for="(attribute, index) in attributes" :key="attribute.id">
      <toggle-button v-model="attribute.value" @input="disableAttribute(index)"/>
      {{ attribute.label }}
    </li>
  </ul>
</template>

<script>
import _some from 'lodash/some'

import ToggleButton from './ToggleButton.vue'

export default {
  name: 'app',
  components: {
    ToggleButton,
  },
  data: () => ({
    attributes: [{
      id: 'tasty',
      label: 'Tasty',
      value: false,
    }, {
      id: 'healthy',
      label: 'Healthy',
      value: false,
    }, {
      id: 'burger',
      label: 'Burger',
      value: false,
    }],
  }),
  computed: {
    areAnyAttributesDisabled() {
      return _some(this.attributes, attribute => attribute.value === false)
    },
  },
  methods: {
    disableAttribute(toggledAttributeIndex) {
      if (this.areAnyAttributesDisabled === false) {
        const indexToDisable = this.getRandomInArray(this.attributes, toggledAttributeIndex)
        this.attributes[indexToDisable].value = false
      }
    },
    getRandomInArray(array, indexToExclude) {
      const randomIndex = Math.floor(Math.random() * array.length)
      if (randomIndex === indexToExclude) {
        return this.getRandomInArray(array, indexToExclude)
      }
      return randomIndex
    },
  },
}
</script>

