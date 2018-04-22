<template>
  <nav class="HeaderNav">
    <nuxt-link :to="'/'">Home</nuxt-link>
    <nuxt-link :to="'/apply/'">Apply</nuxt-link>
    <nuxt-link :to="'/trainers/'">Trainers</nuxt-link>
    <nuxt-link :to="'/organisations/'">Organisations</nuxt-link>
    <nuxt-link :to="'/chapters/'">Chapters</nuxt-link>
    <nuxt-link :to="'/news/'">News</nuxt-link>
    <nuxt-link :to="'/about/'">About</nuxt-link>
    <nuxt-link :to="'/contact/'">Contact</nuxt-link>
    <nuxt-link :to="'/search/'">Search</nuxt-link>
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.HeaderNav {
  a {
    position: relative;
    margin-right: $base-vertical-rithm * 8;
    &:last-child {
      margin-right: 0;
    }
    text-transform: uppercase;
    font-family: $fontWorkSans;
    font-weight: bold;
    letter-spacing: 0.5px;
    &.nuxt-link-active {
      &:after {
        content: '';
        position: absolute;
        height: 2px;
        bottom: -$base-vertical-rithm;
        left: -$base-vertical-rithm;
        right: -$base-vertical-rithm;
        background-color: $link-color;
      }
    }
  }
}
</style>
