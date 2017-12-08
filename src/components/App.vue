<template>
  <ul>
    <li v-for="(attribute, index) in attributes" :key="attribute.label">
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
      label: 'Tasty',
      value: false,
    }, {
      label: 'Healthy',
      value: false,
    }, {
      label: 'Burger',
      value: false,
    }],
  }),
  computed: {
    areAnyAttributesDisabled() {
      // Continue until a disabled attribute is found
      return _some(this.attributes, attr => attr.value === false)
    },
  },
  methods: {
    disableAttribute(toggledAttributeIndex) {
      // Disable one attribute if all attributes are enabled.
      // However, don't disable the attribute that was just enabled.
      if (this.areAnyAttributesDisabled === false) {
        const attributeToDisable = this.getRandomInArray(this.attributes, toggledAttributeIndex)
        attributeToDisable.value = false
      }
    },
    getRandomInArray(array, indexToExclude = null) {
      // Returns a random item in an array, but never
      // an item with an index matching `indexToExclude`.
      const randomIndex = Math.floor(Math.random() * array.length)
      if (randomIndex === indexToExclude) {
        return this.getRandomInArray(array, indexToExclude)
      }
      return array[randomIndex]
    },
  },
}
</script>

