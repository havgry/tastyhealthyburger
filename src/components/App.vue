<template>
  <div class="wrapper align-center">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
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

</style>
