<template>
  <div class="News">
    <h1>what’s happening now</h1>
    <NewsItems/>
  </div>
</template>

<script>
import NewsItems from '~/components/news/NewsItems';

export default {
  components: {
    NewsItems
  }
}

</script> 

<style lang="scss">
.News {
  margin: 5%;
  background: $color-grey;
  padding: $base-vertical-rithm;
  @include breakpoint("mobile_landscape") {

  }
  h1 {
    width: 25%;
    color: $color-purple;
    font-size: 36px;
    line-height: 50px;
    display: inline-block;
    vertical-align: top;
    @include breakpoint("mobile_landscape") {
      width: 100%;
    }
  }
  .News__items {
    width: 75%;
  }
}
</style>
