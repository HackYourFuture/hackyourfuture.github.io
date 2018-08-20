<template>
  <div>
    <Main class="About container">
      <div class="About__header">

        <div class="About__header-content">
          <div v-html="why_exist"/>
        </div>

        <div class="About__header-image">
          <img src="/gallery/03.jpg">
        </div>
        
      </div>
      
      <div class="About__container results">
        <div v-html="results_today"/>
        <div class="links">
          <nuxt-link :to="'/'">You want<br> to <span class="underline">help?</span></nuxt-link>
          <nuxt-link :to="'/chapters'">You want <br>to <span class="underline">donate</span></nuxt-link>
        </div>
      </div>

      <div class="About__container how">
        <div class="About__container-image">
          <img src="/gallery/03.jpg">
        </div>
        <div v-html="how_school_works"/>
      </div>

    </Main>
    <Signup/>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import Signup from "~/components/signup/Signup";

export default {
    async asyncData() {
        let why_exist;
        let results_today;
        let how_school_works;
        try {
            let req = await axios.get("/content/en/about/about-why_exist.json");
            let req1 = await axios.get(
                "/content/en/about/about-results_today.json"
            );
            let req2 = await axios.get(
                "/content/en/about/about-how_school_works.json"
            );
            why_exist = req.data.body;
            results_today = req1.data.body;
            how_school_works = req2.data.body;
        } catch (e) {
            console.log(e);
            why_exist = false;
            results_today = false;
            how_school_works = false;
        }
        return {
            siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
            why_exist: why_exist ? why_exist : null,
            results_today: results_today ? results_today : null,
            how_school_works: how_school_works ? how_school_works : null
        };
    },
    components: {
        Signup
    }
};
</script>

<style lang="scss">
.About {
    h1 {
        margin-bottom: $base-vertical-rithm * 2;
        color: $color-purple;
        font-weight: normal;
        font-size: 42px;
        line-height: 50px;
    }
    &__header {
        padding: $base-vertical-rithm * 10;
        margin-right: -100px;
        @include breakpoint("mobile_landscape") {
            width: 100%;
            margin-right: 0;
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
        &-content {
            display: inline-block;
            width: 50%;
            padding: $base-vertical-rithm * 10;
            @include breakpoint("mobile_landscape") {
                width: 100%;
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
                padding: 0;
            }
        }
    }
    &__container {
        margin: 0 $base-vertical-rithm * 10;
        @include breakpoint("mobile_landscape") {
            margin: 0;
        }

        &.how {
            margin-left: -50px;
            @include breakpoint("mobile_landscape") {
                margin-left: 0;
            }
            .About__container-image {
                margin-left: 0;
                @include breakpoint("mobile_landscape") {
                    padding: 0;
                }
            }
        }

        &.who {
            margin-right: -100px;
            .About__container-image {
                margin-right: 0;
            }
        }

        .links {
            width: 25%;
            margin-left: 20%;
            @include breakpoint("mobile_landscape") {
                width: 100%;
            }

            a {
                font-size: 24px;
                line-height: 30px;
            }
        }

        &.footer {
            .About__container-image {
                margin-left: 25%;
                width: 50%;
            }
        }

        & > div {
            display: inline-block;
            width: calc(50% - 100px);
            vertical-align: top;
            margin: 50px;
            @include breakpoint("mobile_landscape") {
                width: 100%;
                margin: 0;
                padding: $base-vertical-rithm * 10;
            }
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
