<template>
  <div class="wrapper align-center">
    <ul class="button-list">
      <li v-for="(attribute, index) in attributes" :key="attribute.label">
        <toggle-button
          v-model="attribute.value"
          @input="disableAttribute(index)"
          class="align-center"/>
        <span
          v-text="attribute.label"
          class="button-label"/>
      </li>
    </ul>
  </div>
</template>

<script>
import _some from 'lodash/some'

import { getRandomInArray } from 'helpers'
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
        const attributeToDisable = getRandomInArray(this.attributes, toggledAttributeIndex)
        attributeToDisable.value = false
      }
    },
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
  color: #222;
}

.align-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.button-list {
  margin: 0;
  padding: 0;
  list-style: none;
  > li {
    margin: 1.5em;
    display: flex;
  }
}

.button-label {
  line-height: 2em;
  padding-left: .5em;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 1.8em;
  text-transform: uppercase;
}
</style>
