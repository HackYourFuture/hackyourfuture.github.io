<template>
  <div>
    <main class="support container">
      <div class="support__header">
        <div class="support__header-image">
          <img src="/gallery/19.jpg" alt="Student presenting his final project.">
        </div>
        <div class="support__header-content">
          <div v-html="hire_alumni"/>
        </div>
      </div>
    </main>
    <div class="support__companies">
      <h3>Where our students work</h3>
      <div class="support__companies-items">
        <img src="/partners/bijenkorf.svg" alt="Bijenkorf.">
        <img src="/partners/booking.svg" alt="Booking.com.">
        <img src="/partners/klm.svg" alt="KLM.">
        <img src="/partners/nuon.svg" alt="Nuon.">
      </div>
    </div>
    <Partners/>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import Partners from "~/components/partners/partners";
export default {
  async asyncData() {
    let hire_alumni;
    try {
      let req = await axios.get("/content/en/support/support-hire_alumni.json");
      hire_alumni = req.data.body;
    } catch (e) {
      console.log(e);
      hire_alumni = false;
    }
    return {
      hire_alumni: hire_alumni ? hire_alumni : null
    };
  },
  components: {
    Partners
  }
};
</script>

<style lang="scss">
.support {
  &__header {
    padding: $base-vertical-rithm * 10;
    display: flex;
    @include breakpoint("mobile_landscape") {
      padding: 0;
      flex-wrap: wrap;
    }
    &-content {
      width: 60%;
      margin: $base-vertical-rithm * 10 auto;
      @include breakpoint("mobile_landscape") {
        width: 80%;
        margin: $base-vertical-rithm * 5 auto;
      }
      h1 {
        font-size: 60px;
        line-height: 1.25em;
        @include breakpoint("mobile_landscape") {
          width: 100%;
          font-size: 32px;
          line-height: 40px;
        }
      }
    }
    &-image {
      width: 95%;
      margin: 50px;
      margin-left: -70px;
      vertical-align: top;
      @include breakpoint("mobile_landscape") {
        margin: 0;
        width: 100%;
      }
    }
  }
  &__container {
    margin: 0 $base-vertical-rithm * 10;
    & > div {
      display: inline-block;
      width: calc(50% - 100px);
      vertical-align: top;
      margin: 50px;
      a {
        color: $color-purple;
        font-weight: bold;
        font-size: 32px;
        line-height: 40px;
        margin-bottom: 40px;
        display: block;
        span:after {
          bottom: -5px;
        }
      }
    }
  }
  &__companies {
    margin: $base-vertical-rithm * 20 $base-vertical-rithm * 8;
    margin-bottom: $base-vertical-rithm * 5;
    @include breakpoint("mobile_landscape") {
      margin-top: $base-vertical-rithm * 8;
    }
    @include breakpoint("mobile_portrait") {
      margin-bottom: 0;
      margin-top: $base-vertical-rithm * 10;
    }
    h3 {
      font-size: 24px;
      color: $color-purple;
      font-weight: bold;
    }
    &-items {
      margin-top: $base-vertical-rithm * 5;
      display: flex;
      justify-content: space-between;
      @include breakpoint("mobile_portrait") {
        flex-wrap: wrap;
        margin-top: 0;
      }
      img {
        font-weight: bold;
        color: $color-purple;
        width: calc(15% -5px);
        height: 150px;
        margin: 15px;
        @include breakpoint("mobile_landscape") {
          width: calc(15% - 5px);
          height: 100px;
        }
        @include breakpoint("mobile_portrait") {
          width: calc(45% - 5px);
          margin: 5px;
        }
      }
    }
  }
}
</style>
