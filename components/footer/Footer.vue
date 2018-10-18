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
        <nuxt-link :to="'/teaser/'">WCT</nuxt-link>
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
        <a href="https://twitter.com/hackyourfutures"><img src="/icons/tw.svg" alt="Twitter."></a>
        <a href="https://www.facebook.com/hackyourfuturenow/"><img src="/icons/fb.svg" alt="Facebook."></a>
        <a href="https://www.linkedin.com/company/hackyourfuture/"><img src="/icons/in.svg" alt="LinkedIn."></a>
        <a href="https://github.com/HackYourFuture"><img src="/icons/git.svg" alt="Github."></a>
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
    background: $color-purple;
    margin: 0px #{-$base-margin} #{-$base-margin};
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
        padding-left: 10 * $base-vertical-rithm;
        padding-right: 10 * $base-vertical-rithm;
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
                @media (max-width: 800px) {
                    height: 30px;
                    width: 30px;
                    margin: 2%;
                }
            }
            @media (max-width: 800px) {
                width: calc(50% -10px);
                padding: 20px 0px;
                display: inline-block;
                margin: 5px;
                vertical-align: top;
            }
            &:first-child {
                padding-left: 0px;
            }
            &:last-child {
                padding-right: 0px;
                @media (max-width: 800px) {
                    width: 100%;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    -webkit-box-pack: justify;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                }
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
