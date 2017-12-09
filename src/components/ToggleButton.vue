<template>
  <div>
    <input
      v-model="internalValue"
      class="tgl"
      :class="{ 'force-disable': forceDisable }"
      :name="id"
      type="checkbox"/>
    <label
      class="tgl-btn"
      :for="id"
      @click="toggle"></label>
  </div>
</template>

<script>
export default {
  name: 'toggleButton',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    id: null,
    internalValue: false,
    forceDisable: false,
  }),
  mounted() {
    // eslint-disable-next-line no-underscore-dangle
    this.id = `tgl-btn-${this._uid}`
    this.internalValue = this.value
  },
  methods: {
    toggle() {
      this.internalValue = !this.internalValue
      this.$emit('input', this.internalValue)
    },
    disable() {
      // Briefly add class to alter animation to something more "bouncy"
      this.forceDisable = true
      setTimeout(() => {
        this.forceDisable = false
      }, 0)
    },
  },
  watch: {
    value(newValue) {
      // Value changed from prop (and not by `toggle` method)
      if (newValue === false && this.internalValue === true) {
        this.disable()
      }
      this.internalValue = newValue
    },
  },
}
</script>

<style lang="scss">

.tgl-btn {
  outline: 0;
  display: block;
  width: 4em;
  height: 2em;
  position: relative;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &:after,
  &:before {
    position: relative;
    display: block;
    content: '';
    width: 50%;
    height: 100%;
  }
  &:after {
    left: 0;
  }
  .tgl:checked + &:after {
    left: 50%;
  }
  &:before {
    display: none;
  }
}

.tgl {
  display: none;
  + .tgl-btn {
    background: #f0f0f0;
		border-radius: 2em;
		padding: 2px;
		transition: all .4s ease;
		&:after {
      border-radius: 50%;
			background: #fff;
			transition: all .2s ease;
		}
	}
  &.force-disable + .tgl-btn {
    &,
    &::after {
      transition: all .1s cubic-bezier(1, 0, .25, 1) .4s;
    }
  }
	&:checked + .tgl-btn {
		background: #9FD6AE;
	}
}

</style>
