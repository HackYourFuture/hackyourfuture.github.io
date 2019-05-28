<template>
  <footer class="footer">
    <div class="footer__main">
      <div class="footer__links container">
        <nuxt-link :to="'/'">Home</nuxt-link>
        <nuxt-link :to="'/apply/'">Apply</nuxt-link>
        <nuxt-link :to="'/teach/'">Teach</nuxt-link>
        <nuxt-link :to="'/hire/'">Hire</nuxt-link>
      </div>
      <div class="footer__links container">
        <nuxt-link :to="'/international/'">Chapters</nuxt-link>
        <nuxt-link :to="'/teaser/'">Women</nuxt-link>
        <nuxt-link :to="'/about/'">About</nuxt-link>
        <nuxt-link :to="'/contact/'">Contact</nuxt-link>
      </div>
      <div class="footer__adress container">
        <p>Stichting HackYourFuture</p>
        <p>OFFICE: Herengracht 504</p>
        <p>SCHOOL: Sarphatistraat 370</p>
        <a href="mailto:info@hackyourfuture.net">info@hackyourfuture.net</a>
      </div>
      <div class="footer__info container">
        <p>KvK: 64992160</p>
        <p>Copyright © HackYourFuture {{ date }}</p>
        <!--  <nuxt-link :to="'/disclaimer/'">Disclaimer</nuxt-link> -->
      </div>
      <div class="footer__social container">
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
    &__main {
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
                height: 35px;
                width: 35px;
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
    &__links {
        width: auto;
        @include breakpoint("ipad_portrait") {
            width: 25%;
        }
        @include breakpoint("mobile_portrait") {
            width: 50%;
        }
    }
    &__adress {
        width: auto;
        @include breakpoint("ipad_portrait") {
            width: 50%;
        }
        @include breakpoint("mobile_portrait") {
            width: 100%;
        }
    }
    &__info {
        width: 20%;
        @include breakpoint("ipad_portrait") {
            width: 65%;
        }
        @include breakpoint("mobile_portrait") {
            width: 100%;
        }
    }
    &__social {
        width: auto;
        img {
            padding: 3px;
        }
        @include breakpoint("ipad_portrait") {
            width: 35%;
            justify-content: space-evenly;
            justify-items: baseline;
            display: flex;
        }
        @include breakpoint("mobile_portrait") {
            width: 100%;
        }
    }
}
</style>
