<template>
  <footer class="footer">
    <div class="footer__Main">
      <div class="footer__Links container">
        <nuxt-link :to="'/'">Home</nuxt-link>
        <nuxt-link :to="'/apply/'">Apply</nuxt-link>
        <nuxt-link :to="'/teach/'">Teach</nuxt-link>
        <nuxt-link :to="'/support/'">Hire</nuxt-link>
      </div>
      <div class="footer__Links container">
        <nuxt-link :to="'/chapters/'">Chapters</nuxt-link>
        <nuxt-link :to="'/teaser/'">WCT</nuxt-link>
        <nuxt-link :to="'/about/'">About</nuxt-link>
        <nuxt-link :to="'/contact/'">Contact</nuxt-link>
      </div>
      <div class="footer__Adress container">
        <p>Stichting Hack Your Future</p>
        <p>Herengracht 504</p>
        <p>1017 CB Amsterdam</p>
        <a href="mailto:info@hackyourfuture.net">info@hackyourfuture.net</a>
      </div>
      <div class="footer__Info container">
        <p>KvK: 64992160</p>
        <p>Copyright © HackYourFuture {{ date }}</p>
        <!--  <nuxt-link :to="'/disclaimer/'">Disclaimer</nuxt-link> -->
      </div>
      <div class="footer__Social container">
        <a href="https://twitter.com/hackyourfutures">
          <img src="/icons/tw.svg" alt="Twitter.">
        </a>
        <a href="https://www.facebook.com/hackyourfuturenow/">
          <img src="/icons/fb.svg" alt="Facebook.">
        </a>
        <a href="https://www.linkedin.com/company/hackyourfuture/">
          <img src="/icons/in.svg" alt="LinkedIn.">
        </a>
        <a href="https://github.com/HackYourFuture">
          <img src="/icons/git.svg" alt="Github.">
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    date() {
      return "2018";
    }
  }
};
</script>

<style lang="scss">
.footer {
  background: $color-purple;
  margin: 0px;
  color: $color-white;
  font-family: $fontWorkSans;
  letter-spacing: 0.5px;
  a {
    color: $color-white;
  }
  &__Main {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-left: 1 * $base-vertical-rithm;
    padding-right: 1 * $base-vertical-rithm;
    width: 90%;
    margin: 0 auto;
    @include breakpoint("ipad_portrait") {
      flex-wrap: wrap;
      padding-left: 1 * $base-vertical-rithm;
      padding-right: 1 * $base-vertical-rithm;
    }
    @include breakpoint("mobile_portrait") {
      padding-left: 5 * $base-vertical-rithm;
      padding-right: 5 * $base-vertical-rithm;
    }
    .container {
      padding: 20px;
      margin: 0px;
      p {
        margin: 0px;
      }
      a {
        display: block;
      }
      a img {
        height: 20px;
        width: 20px;
        @media (max-width: "mobile-portrait") {
          height: 30px;
          width: 30px;
          margin: 2%;
        }
      }
      @media (max-width: "mobile-portrait") {
        width: calc(50% -10px);
        padding: 20px 0px;
        display: inline-block;
        margin: 5px;
        vertical-align: top;
      }
    }
  }
  &__Links {
    width: auto;
    @include breakpoint("ipad_portrait") {
      width: 25%;
    }
    @include breakpoint("mobile_portrait") {
      width: 50%;
    }
  }
  &__Adress {
    width: auto;
    @include breakpoint("ipad_portrait") {
      width: 50%;
    }
    @include breakpoint("mobile_portrait") {
      width: 100%;
    }
  }
  &__Info {
    width: 20%;
    @include breakpoint("ipad_portrait") {
      width: 70%;
    }
    @include breakpoint("mobile_portrait") {
      width: 100%;
    }
  }
  &__Social {
    width: auto;
    @include breakpoint("ipad_portrait") {
      width: 30%;
      justify-content: space-evenly;
      justify-items: baseline;
      display: flex;
    }
    @include breakpoint("mobile_portrait") {
      width: 100%;
      justify-content: space-evenly;
      justify-items: baseline;
      display: flex;
    }
  }
}
</style>
