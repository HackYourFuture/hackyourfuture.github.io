<template>
  <header class="Header">
    <div class="container max-width">
      <HeaderNav/>
    </div>
  </header>
</template>

<script>
import HeaderNav from './HeaderNav'
export default {
  components: {
    HeaderNav
  }
}
</script>

<style lang="scss">
.Header {
  position: fixed;
  width: 100%;
  background: white;
  z-index: 10;
  .HeaderNav {
    margin: $base-vertical-rithm * 4;
    text-align: center;
  }
}
</style>
