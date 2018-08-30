<template>
  <footer class="Footer">
    <div class="Footer__Main">

      <div class="Footer__Links container">
        <nuxt-link :to="'/'">Home</nuxt-link>
        <nuxt-link :to="'/apply/'">Apply</nuxt-link>
        <nuxt-link :to="'/teach/'">Teach</nuxt-link>
        <nuxt-link :to="'/support/'">Hire</nuxt-link>
      </div>

      <div class="Footer__Links container">
        <nuxt-link :to="'/chapters/'">Chapters</nuxt-link>
        <nuxt-link :to="'/teaser/'">Women Coding Teaser</nuxt-link>
        <nuxt-link :to="'/about/'">About</nuxt-link>
        <nuxt-link :to="'/contact/'">Contact</nuxt-link>
      </div>

      <div class="Footer__Adress container">
        <p>Stichting Hack Your Future</p>
        <p> Herengracht 504</p>
        <p>1017 CB Amsterdam</p>
        <a href="mailto:info@hackyourfuture.net">info@hackyourfuture.net</a>
      </div>

      <div class="Footer__Info container">
        <p>KvK: 64992160</p>
        <p>Copyright © HackYourFuture {{ date }}</p>
        <!--  <nuxt-link :to="'/disclaimer/'">Disclaimer</nuxt-link> -->
      </div>

      <div class="Footer__Social container">
        <a href="https://twitter.com/hackyourfutures" target="_blank"><img src="/icons/tw.svg"></a>
        <a href="https://www.facebook.com/hackyourfuturenow/" target="_blank"><img src="/icons/fb.svg"></a>
        <a href="https://www.linkedin.com/company/hackyourfuture/" target="_blank"><img src="/icons/in.svg"></a>
        <a href="https://github.com/HackYourFuture" target="_blank"><img src="/icons/git.svg"></a>
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
.Footer {
    //display: none;
    background: $color-purple;
    margin: 0px #{-$base-margin} #{-$base-margin};
    padding-bottom: 6 * $base-vertical-rithm;
    color: $color-white;
    font-family: $fontWorkSans;
    letter-spacing: 0.5px;
    a {
        color: $color-white;
    }
    &__Main {
        display: -webkit-box;
        display: -ms-flexbox;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        position: relative;
        padding-left: 4 * $base-vertical-rithm;
        padding-right: 4 * $base-vertical-rithm;
        @media (max-width: 800px) {
            display: block;
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
            }
            @media (max-width: 800px) {
                width: 100%;
                padding: 20px 0px;
            }
            &:first-child {
                padding-left: 0px;
            }
            &:last-child {
                padding-right: 0px;
            }
        }
    }
    &__Links {
        width: 10%;
    }
    &__Adress {
        width: 20%;
    }
    &__Info {
        width: 20%;
    }
}
</style>
