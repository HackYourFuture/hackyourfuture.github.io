<template>
  <div>
    <Main class="TeaserPage container">
      <div class="TeaserPage__header">
        <div class="TeaserPage__header-image">
          <img src="/gallery/21.jpg">

        </div>
        <div class="TeaserPage__header-content">
          <h1>Women Coding Teaser</h1>
          <div class="TeaserPage__header-dates" v-html="teaser_dates"/>
          <div v-html="teaser_about"/>
          
          <div class="TeaserPage__header-links">
            <h2>Apply for:</h2>
            <nuxt-link :to="'https://goo.gl/forms/SAYHYc0oqexStVaB3'"><span class="underline">30th of September</span></nuxt-link><br>
            <nuxt-link :to="'https://goo.gl/forms/m1gQTHHSMeUq2KFy2'"><span class="underline">2nd of December</span></nuxt-link>
          </div>

        </div>
      </div>
    </Main>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
export default {
    async asyncData() {
        let teaser_dates;
        let teaser_about;
        try {
            let req = await axios.get("/content/en/teaser/teaser-dates.json");
            let req1 = await axios.get("/content/en/teaser/teaser-about.json");
            teaser_dates = req.data.body;
            teaser_about = req1.data.body;
        } catch (e) {
            console.log(e);
            teaser_dates = false;
            teaser_about = false;
        }
        return {
            siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
            teaser_dates: teaser_dates ? teaser_dates : null,
            teaser_about: teaser_about ? teaser_about : null
        };
    },
    components: {}
};
</script>

<style lang="scss">
.TeaserPage {
    h2 {
        color: $color-purple;
    }
    &__header {
        padding: $base-vertical-rithm * 10;
        @include breakpoint("mobile_landscape") {
            padding: 0;
        }
        a {
            color: $color-purple;
            font-weight: bold;
            font-size: 32px;
            line-height: 40px;
            span:after {
                bottom: -5px;
            }
        }
        h1 {
            margin-bottom: 10px;
            color: $color-purple;
            font-weight: normal;
            font-size: 42px;
            line-height: 50px;
            @include breakpoint("mobile_landscape") {
                font-size: 24px;
                line-height: 24px;
            }
        }
        &-links a {
            font-size: 18px;
        }

        &-dates {
            margin-top: $base-vertical-rithm * 15;
            width: 100%;
            display: inline-block;
            vertical-align: top;
            div {
                display: inline-block;
                width: calc(25% - 20px);
                @include breakpoint("mobile_landscape") {
                    width: calc(50% - 10px);
                    margin: $base-vertical-rithm * 5 auto;
                }
            }
            h3 {
                font-weight: bold;
                color: $color-purple;
            }
            h4 {
                color: $color-purple;
                font-weight: bold;
            }
        }
        &-content {
            display: inline-block;
            width: 50%;
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
            width: 50%;
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
    &__footer {
        margin: 0 $base-vertical-rithm * 10;
        a {
            margin: 50px;
            display: inline-block;
            font-weight: bold;
            font-size: 30px;
            line-height: 40px;
            &:nth-child(2) {
                margin-left: 25%;
            }
        }
    }
}
</style>
