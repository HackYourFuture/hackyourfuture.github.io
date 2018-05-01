<template>
  <section class="Landscape">
    <div class="Landscape__logo">
      <img src="/logos/logo-1.svg"/>
    </div>

    <div class="Landscape__text">
      <h1>live up to your potential and create opportunities to a career in the tech industry! </h1>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.Landscape {
  height: 100vh;
  background-image: url('/landscape/main-home.jpg');
  background-size: cover;
  position: relative;
  text-align: center;
  &__text {
    color: white;
    margin: 8 * $base-vertical-rithm;
    padding-left: 20%;
    padding-right: 20%;
    h1 {
      font-family: $fontSpaceMono;
      text-align: left;
      font-size: 42px;
      line-height: 50px;
    }
  }
}
</style>
