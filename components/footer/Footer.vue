<template>
  <footer class="Footer">
    <div class="Footer__Main">

      <div class="Footer__Links container">
        <nuxt-link :to="'/'">Home</nuxt-link>
        <nuxt-link :to="'/apply/'">Apply</nuxt-link>
        <nuxt-link :to="'/trainers/'">Trainers</nuxt-link>
        <nuxt-link :to="'/organisations/'">Organisations</nuxt-link>
      </div>

      <div class="Footer__Links container">
        <nuxt-link :to="'/chapters/'">Chapters</nuxt-link>
        <nuxt-link :to="'/news/'">News</nuxt-link>
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
        <p>Copyright © HackYourFuture {{date}}</p>
        <nuxt-link :to="'/disclaimer/'">Disclaimer</nuxt-link>
      </div>

      <!-- <div class="Footer__Social container">
        <a href="https://twitter.com/wonderlandams" target="_blank"><img src="~/static/images/icons/twitter.svg"></a>
        <a href="https://dribbble.com/wonderlandams" target="_blank"><img src="~/static/images/icons/dribbble.svg"></a>
        <a href="https://uxdesign.wonderlandindustry.com/" target="_blank"><img src="~/static/images/icons/medium.svg"></a>
        <a href="https://www.instagram.com/wonderlandindustry/" target="_blank"><img src="~/static/images/icons/instagram.svg"></a>
      </div> -->

    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    date () {
      return '2018';
    }
  }
}
</script>


<style lang="scss">
.Footer {
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
