<template>
  <div>
    <div v-for="(option, index) in options" :key="index">
      <input
        type="text"
        v-model="option.label"
        :placeholder="option.placeholder"
        :autofocus="index === 0">
    </div>
    <button @click="save" :disabled="formIsInvalid || isSaving">Create</button>
  </div>
</template>

<script>

import gql from 'graphql-tag'
import _map from 'lodash/map'

export default {
  name: 'createOptionGroup',
  data: () => ({
    options: [{
      placeholder: 'Tasty',
      label: '',
    }, {
      placeholder: 'Healthy',
      label: '',
    }, {
      placeholder: 'Burger',
      label: '',
    }],
    isSaving: false,
  }),
  computed: {
    formIsInvalid() {
      const labels = []

      return this.options.some(({ label }) => {
        if (label === '' || labels.indexOf(label) >= 0) {
          return true
        }

        labels.push(label)
        return false
      })
    },
  },
  methods: {
    redirectToOptionGroup(id) {
      this.$router.push({
        name: 'optionGroup',
        params: {
          id,
        },
      })
    },
    async hasDuplicate(options) {
      const optionsFilter = options.map(option => ({
        options_some: option,
      }))

      const result = await this.$apollo.query({
        query: gql`
          query ($optionsFilter: [OptionGroupFilter!]) {
            allOptionGroups (filter: {
              AND: $optionsFilter
            }) {
              shortId
            }
          }
        `,
        variables: {
          optionsFilter,
        },
      })

      const allOptionGroups = result.data.allOptionGroups

      if (allOptionGroups.length) {
        return allOptionGroups[0].shortId
      }

      return false
    },
    async save() {
      this.isSaving = true
      const options = _map(this.options, option => ({
        label: option.label,
      }))

      const duplicateShortId = await this.hasDuplicate(options)

      if (duplicateShortId) {
        this.redirectToOptionGroup(duplicateShortId)
        this.isSaving = false
        return
      }

      let result

      try {
        result = await this.$apollo.mutate({
          mutation: gql`
            mutation ($options: [OptionGroupoptionsOption!]!) {
              createOptionGroup (options: $options) {
                id
                shortId
                options {
                  id
                  label
                }
              }
            }
          `,
          variables: {
            options,
          },
        })
      } catch (error) {
        // Handle error
      }

      this.isSaving = false

      if (result) {
        // Redirect to new `optionGroup` after creation
        this.redirectToOptionGroup(result.data.createOptionGroup.shortId)
      }
    },
  },
}

</script>

<style lang="scss" scoped>

input,
button {
  border-radius: 0.1em;
  padding: 0.2em 0.3em;
  font-size: 1.2em;
  &:focus {
    outline: 0;
    border-color: #222;
  }
}

input {
  border: 1px solid rgb(240, 240, 240);
  margin-bottom: 0.8em;
  width: 15em;
  background-color: #fbfbfb;
}

button {
  width: 100%;
  border: 1px solid currentColor;
  color: #fff;
  background-color: #74bbdb;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #61a7c7;
  }
  &:disabled {
    background-color: #eaeaea;
    color: #bbb;
  }
}

</style>
