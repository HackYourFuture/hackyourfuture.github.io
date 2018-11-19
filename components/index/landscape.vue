<template>
  <section class="landscape">
    <div class="landscape__logo">
      <img src="/logos/logo-1.svg">
    </div>
    <div class="landscape__text">
      <h1>Use your potential.
        <br>Build a career in tech.
      </h1>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
.landscape {
  height: 100vh;
  background-image: url("/gallery/08.jpg");
  background-size: cover;
  position: relative;
  text-align: center;
  @include breakpoint("mobile_landscape") {
    height: 70vh;
  }
  &__logo {
    width: 30%;
    margin-left: 50%;
    padding-top: 10%;
    transform: translateX(-50%);
    @include breakpoint("ipad_portrait") {
      padding-top: 25%;
    }
    @media (max-width: 736px) {
      padding-top: 5%;
    }
    @include breakpoint("mobile_portrait") {
      width: 50%;
      padding-top: 25%;
    }
  }
  &__text {
    color: white;
    margin: 8 * $base-vertical-rithm;
    padding-left: 20%;
    padding-right: 20%;
    @include breakpoint("ipad_landscape") {
      padding: 0;
    }
    @include breakpoint("ipad_portrait") {
      margin: 8 * $base-vertical-rithm auto;
      margin-left: 50%;
      transform: translateX(-50%);
    }
    @include breakpoint("mobile_landscape") {
      padding: 0;
    }
    h1 {
      color: white;
      font-family: $fontSpaceMono;
      text-align: left;
      font-weight: normal;
    }
  }
}
</style>
