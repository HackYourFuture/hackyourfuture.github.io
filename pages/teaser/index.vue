<template>
  <div>
    <Main class="TeaserPage container">
      <div class="TeaserPage__header">
        <div class="TeaserPage__header-image">
          <img src="/gallery/21.jpg">
        </div>
        <h1>Women Coding Teaser</h1>
      </div>
      <div class="TeaserPage__content">
        <div class="TeaserPage__content-dates" v-html="teaser_dates"/>
        <div class="TeaserPage__content-about" v-html="teaser_about"/>
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
            color: #293a7d;
            font-weight: bold;
            font-size: 60px;
            line-height: 1.25em;
            width: 40%;
            display: inline-block;
            margin: $base-vertical-rithm * 25 0 $base-vertical-rithm * 2
                $base-vertical-rithm * 7;
            @include breakpoint("mobile_landscape") {
                width: 100%;
                font-size: 24px;
                line-height: 24px;
                margin: $base-vertical-rithm * 5;
            }
        }
        &-image {
            width: 55%;
            display: inline-block;
            vertical-align: top;
            @include breakpoint("mobile_landscape") {
                width: 100%;
            }
        }
    }
    &__content {
        display: inline-block;
        width: 100%;
        padding: $base-vertical-rithm * 10;
        padding-top: 0;
        @include breakpoint("mobile_landscape") {
            width: 100%;
            padding: $base-vertical-rithm * 4;
        }
        & > div {
            margin-top: $base-vertical-rithm * 5;
            @include breakpoint("mobile_landscape") {
                margin-top: 0;
            }
        }
        h2 {
            font-size: 2em;
            font-weight: bold;
        }
        &-about {
            width: 70%;
            margin: auto;
            @include breakpoint("mobile_landscape") {
                width: 90%;
            }
            a {
                color: black;
            }
        }
        &-dates {
            margin-left: $base-vertical-rithm * 15;
            margin-top: $base-vertical-rithm * 15;
            vertical-align: top;
            width: 100%;
            display: inline-block;
            @include breakpoint("mobile_landscape") {
                margin-left: 0;
            }

            div {
                display: inline-block;
                width: calc(25% - 20px);
                vertical-align: top;
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
    }
    &__container {
        margin: 0 $base-vertical-rithm * 20;
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
}
</style>
