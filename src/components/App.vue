<template>
  <div>
    <toggle-button v-model="testValue"/>
    <input type="checkbox" v-model="testValue"/>
  </div>
</template>

<script>
import ToggleButton from './ToggleButton.vue'

export default {
  name: 'app',
  components: {
    ToggleButton,
  },
  data: () => ({
    testValue: true,
  }),
}
</script>

