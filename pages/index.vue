<template>
  <div>
    <Landscape />
    <Main class="Main container">
      <section class="About">
        <div class="content" v-html="what"/>

        <div class="About__video">
          <nuxt-link :to="'/about'" class="About__more">Read more <br> about <span class="underline">us</span></nuxt-link>
          <YoutubePlayer class="About__video-player"/>
        </div>
      </section>

      <section class="Apply">
        <div class="Apply__image">
          <img src="/gallery/00.jpg">
        </div>
        <div class="Apply__container">
          <h1>Join our 6 month web development course</h1>
          <nuxt-link :to="'/apply'"><span class="underline">Apply</span></nuxt-link>
        </div>
      </section>

      <section class="Curiculum">
        <div class="Curiculum__header">
          <h1>Expert teachers,<br> up-to-date skills</h1>
          <a href="https://github.com/HackYourFuture/curriculum" target="_blank">Check out our <span class="underline">curriculum</span></a>
        </div>
       
        
        <div class="Curiculum__image">
          <img src="/gallery/02.jpg">
        </div>
        <div class="Curiculum__container">
          <div class="Curiculum__content" v-html="curiculum"/>
          <div class="Curiculum__content">
            <nuxt-link :to="'/teach'">Time is your most valuable resource. <span class="underline">Find out about donating your time and expertise here.</span></nuxt-link>
          </div>
        </div>
      </section>

      <section class="Teaser">
        
        
        <div class="Teaser__container">
          <h1>Women Coding Teaser</h1>
          <div class="Teaser__content" v-html="teaser"/>
          <nuxt-link :to="'/teaser'"><span class="underline">Apply</span></nuxt-link>
        </div>
        <div class="Teaser__image">
          <img src="/gallery/06.jpg">
        </div>
      </section>

      <section class="Hire">
        <div class="Hire__container">
          <h1>Hire our graduates</h1>
          <div v-html="hire"/>
          <div>
            <nuxt-link :to="'/support'"><span class="underline">Get in touch to talk about hiring our graduates.</span></nuxt-link>
          </div>
          <div v-html="laptops"/>
          <div>
            <nuxt-link :to="'/contact'"><span class="underline">Contact us about donating laptops. </span></nuxt-link>
          </div>
            
        </div>
        
        <div class="Hire__image">
          <img src="/gallery/03.jpg">
        </div>
      </section>
    </Main>

    <section class="Chapters"/>

    <section class="Makers">
      <Makers/>
    </section>

    <Signup/>

    <Partners/>

    

  </div>
</template>

<script>
import axios from "~/plugins/axios";
import Colors from "~/constants/colors";

import Landscape from "~/components/index/Landscape";
import Signup from "~/components/signup/Signup";
import Makers from "~/components/makers/Makers";
import Partners from "~/components/partners/Partners";
import YoutubePlayer from "~/components/video/YoutubePlayer";

export default {
    async asyncData() {
        let data;
        let what;
        let apply;
        let curiculum;
        let hire;
        let laptops;
        let teaser;
        try {
            let req = await axios.get("/content/en/index-about.json");
            let wReq = await axios.get("/content/en/what.json");
            let aReq = await axios.get("/content/en/apply.json");
            let cReq = await axios.get("/content/en/curiculum.json");
            let hReq = await axios.get("/content/en/index-hire.json");
            let lReq = await axios.get("/content/en/index-laptops.json");
            let tReq = await axios.get("/content/en/index-teaser.json");

            what = wReq.data.body;
            apply = aReq.data.body;
            data = req.data.body;
            curiculum = cReq.data.body;
            hire = hReq.data.body;
            laptops = lReq.data.body;
            teaser = tReq.data.body;
        } catch (e) {
            console.log(e);
            data = false;
        }
        return {
            siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
            about: data ? data : null,
            hire: hire ? hire : null,
            laptops: laptops ? laptops : null,
            teaser: teaser ? teaser : null,
            what,
            apply,
            curiculum,
            Colors
        };
    },
    components: {
        Landscape,
        Signup,
        Makers,
        Partners,
        YoutubePlayer
    }
};
</script>

<style lang="scss">
.About {
    .content {
        width: 80%;
        margin: 0 auto;
        padding-top: $base-vertical-rithm * 10;
        h1 {
            font-size: 36px;
            color: $color-purple;
            width: 45%;
            line-height: 50px;
            margin: $base-vertical-rithm * 10 0;
            @include breakpoint("mobile_landscape") {
                width: 100%;
            }
        }
        p {
            width: 70%;
            margin: 0 auto;
            @include breakpoint("mobile_landscape") {
                width: 100%;
            }
        }
    }
    &__video {
        margin: $base-vertical-rithm * 10 0;
        a {
            @include breakpoint("mobile_landscape") {
                margin: $base-vertical-rithm * 10 40px;
            }
        }
        &-player {
            display: inline-block;
            width: 50%;
            @include breakpoint("mobile_landscape") {
                width: 100%;
            }
        }
    }
    &__more {
        vertical-align: top;
        display: inline-block;
        margin: 0px $base-vertical-rithm * 5;
        margin-left: 10%;
        font-size: 36px;
        line-height: 36px;
        font-weight: 900;
    }
}

.Apply {
    margin: $base-vertical-rithm * 30 0;
    &__image {
        display: inline-block;
        width: 45%;
        margin: 0 $base-vertical-rithm * 10;
        @include breakpoint("mobile_landscape") {
            width: 80%;
            margin: 0 auto;
            display: inline;
        }
    }
    &__container {
        width: 45%;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        @include breakpoint("mobile_landscape") {
            margin-top: $base-vertical-rithm * 10;
            width: 100%;
        }
        h1 {
            font-size: 36px;
            color: $color-purple;
            line-height: 50px;
        }
        a {
            display: block;
            font-size: 24px;
            font-weight: bold;
            margin-top: $base-vertical-rithm * 5;
            span:after {
                bottom: -5px;
            }
        }
    }
}

.Curiculum {
    margin: $base-vertical-rithm * 30 0;
    @include breakpoint("mobile_landscape") {
        margin: $base-vertical-rithm * 5 0;
    }
    &__header {
        margin: 0 $base-vertical-rithm * 10;
        padding: $base-vertical-rithm * 2;
        background: $color-purple;
        width: 75%;
        @include breakpoint("mobile_landscape") {
            width: 100%;
            margin-left: 0;
        }
        h1 {
            margin: $base-vertical-rithm * 10;
            margin-bottom: $base-vertical-rithm * 2;
            width: 75%;
            color: white;
            font-size: 36px;
            line-height: 50px;
            @include breakpoint("mobile_landscape") {
                margin: $base-vertical-rithm * 5;
            }
        }
        a {
            display: block;
            color: white;
            font-weight: bold;
            font-size: 20px;
            margin: $base-vertical-rithm * 5;
            margin-top: 0;
            margin-left: 80%;
            @include breakpoint("mobile_landscape") {
                margin-left: 0;
                margin-top: $base-vertical-rithm * 5;
                margin-bottom: $base-vertical-rithm * 5;
                text-align: center;
                width: 100%;
            }
            span:after {
                background: white;
                height: 1px;
                bottom: -2px;
            }
        }
    }
    &__image {
        margin-left: $base-vertical-rithm * 23;
        width: 30%;
        margin-top: -5%;
        display: inline-block;
        vertical-align: top;
        @include breakpoint("mobile_landscape") {
            width: 100%;
            margin-left: 0;
            margin-top: 0;
        }
    }
    &__container {
        width: 45%;
        display: inline-block;
        margin: $base-vertical-rithm * 5;
        @include breakpoint("mobile_landscape") {
            width: 80%;
            margin: $base-vertical-rithm * 10 auto 0;
            display: inherit;
        }
        &__content {
            font-weight: 400;
            a {
                display: block;
                font-size: 24px;
                font-weight: bold;
                margin-top: $base-vertical-rithm * 5;
                span:after {
                    bottom: -5px;
                }
            }
        }
    }
}

.Teaser {
    margin: $base-vertical-rithm * 30 $base-vertical-rithm * 10;
    @include breakpoint("mobile_landscape") {
        margin: 0;
    }

    &__container {
        width: 45%;
        display: inline-block;
        margin: $base-vertical-rithm * 5;
        @include breakpoint("mobile_landscape") {
            width: 80%;
            margin: $base-vertical-rithm * 10 auto;
            display: inherit;
        }
        h1 {
            font-size: 36px;
            color: $color-purple;
            width: 45%;
            line-height: 50px;
            margin: $base-vertical-rithm * 10 0;
            @include breakpoint("mobile_landscape") {
                width: 100%;
            }
        }
        a {
            display: block;
            font-size: 24px;
            font-weight: bold;
            margin-top: $base-vertical-rithm * 5;
            span:after {
                bottom: -5px;
            }
        }
        &__content {
            font-weight: 400;
        }
    }
    &__image {
        vertical-align: bottom;
        display: inline-block;
        width: 40%;
        margin: 0 $base-vertical-rithm * 10;
        @include breakpoint("mobile_landscape") {
            width: 100%;
            margin-left: 0;
            margin-top: 0;
        }
    }
}

.Hire {
    margin: $base-vertical-rithm * 10 $base-vertical-rithm * 10;
    @include breakpoint("mobile_landscape") {
        margin: $base-vertical-rithm * 5 0;
    }
    &__container {
        width: 45%;
        display: inline-block;
        margin: $base-vertical-rithm * 5;
        @include breakpoint("mobile_landscape") {
            width: 80%;

            margin: 0 auto $base-vertical-rithm * 10;
            display: inherit;
        }
    }
    h1 {
        font-size: 36px;
        color: $color-purple;
        width: 45%;
        line-height: 50px;
        margin: $base-vertical-rithm * 10 0;
        @include breakpoint("mobile_landscape") {
            width: 100%;
        }
    }

    &__image {
        width: 55%;
        display: inline-block;
        vertical-align: top;
        @include breakpoint("mobile_landscape") {
            width: 100%;
            margin-left: 0;
            margin-top: 0;
        }
    }
}
</style>
