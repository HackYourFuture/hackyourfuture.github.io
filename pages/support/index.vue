<template>
  <div>
    <Main class="support container">
      <div class="support__header">
        <div class="support__header-image">
          <img src="/gallery/19.jpg" alt="Student presenting his final project.">
        </div>
        <div class="support__header-content">
          <nuxt-link :to="'/'">Hire
            <br>
            <span class="underline">Alumni</span>
          </nuxt-link>
          <div v-html="hire_alumni"/>
        </div>
      </div>
    </Main>
    <div class="support__companies">
      <h3>Where our students work</h3>
      <div class="support__companies-items">
        <img src="/partners/bijenkorf.svg" alt="Bijenkorf.">
        <img src="/partners/booking.svg" alt="Booking.com.">
        <img src="/partners/klm.svg" alt="KLM.">
        <img src="/partners/nuon.svg" alt="Nuon.">
      </div>
    </div>
    <partners/>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import partners from "~/components/partners/Partners";
export default {
    async asyncData() {
        let hire_alumni;
        try {
            let req = await axios.get(
                "/content/en/support/support-hire_alumni.json"
            );
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
        partners
    }
};
</script>

<style lang="scss">
.support {
    &__header {
        padding: $base-vertical-rithm * 10;
        @include breakpoint("mobile_landscape") {
            padding: 0;
        }
        a {
            color: $color-purple;
            font-weight: bold;
            font-size: 60px;
            line-height: 1.25em;
            span:after {
                bottom: -5px;
            }
        }
        span a {
            font-size: 16px;
            font-weight: normal;
            line-height: 25px;
        }
        &-content {
            display: inline-block;
            width: 40%;
            padding: $base-vertical-rithm * 10;
            @include breakpoint("mobile_landscape") {
                width: 100%;
                padding: $base-vertical-rithm * 8;
            }
            & > div {
                margin-top: $base-vertical-rithm * 5;
            }
        }
        &-image {
            width: 60%;
            display: inline-block;
            vertical-align: top;
            @include breakpoint("mobile_landscape") {
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
        h3 {
            font-size: 24px;
            color: $color-purple;
            font-weight: bold;
        }
        &-items {
            margin-top: $base-vertical-rithm * 5;
            display: flex;
            justify-content: space-between;
            position: relative;
            img {
                display: flex;
                font-weight: bold;
                color: $color-purple;
                width: calc(15% -5px);
                height: 150px;
                margin: 15px;
            }
        }
    }
}
</style>
