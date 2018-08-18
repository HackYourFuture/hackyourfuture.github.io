<template>
  <div class="News__items">
    <div class="News__item">
      <div class="News__item-image">
        <img src="/gallery/04.jpg">
      </div>
      <h3>All aboard!</h3>
      <p>We are hiring! We're looking for a program manager that's responsible for running our alumni program.</p>
      <nuxt-link :to="'/'">Read more</nuxt-link>
    </div>
  </div>
</template>

<style lang="scss">
.News {
    &__items {
        display: inline-block;
    }
    &__item {
        display: inline-block;
        width: 25%;
        color: $color-purple;
        @include breakpoint("mobile_landscape") {
            width: 50%;
        }
        a,
        h3 {
            font-weight: bold;
        }
        &-image {
            margin-bottom: $base-vertical-rithm * 4;
        }
    }
}
</style>
