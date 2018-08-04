<template>
  <section class="Landscape">
    <div class="Landscape__logo">
      <img src="/logos/logo-1.svg"/>
    </div>

    <div class="Landscape__text">
      <h1>Use your potential.<br> Build a career in tech.</h1>
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
  &__logo {
    width: 30%;
    margin-left: 50%;
    padding-top: 15%;
    transform: translateX(-50%);
    @include breakpoint("mobile_landscape") {
      width: 50%;
      padding-top: 25%;
    }
  }
  &__text {
    color: white;
    margin: 8 * $base-vertical-rithm;
    padding-left: 20%;
    padding-right: 20%;
    @include breakpoint("mobile_landscape") {
      padding: 0;
    }
    h1 {
      font-family: $fontSpaceMono;
      text-align: left;
      font-size: 42px;
      line-height: 50px;
      @include breakpoint("mobile_landscape") {
        font-size: 24px;
        line-height: 24px;
      }
    }
  }
}
</style>
