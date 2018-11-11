<template>
  <div>
    <landscape/>
    <main class="main container">
      <section class="about">
        <div class="content" v-html="what"/>
        <div class="about__video">
          <nuxt-link :to="'/about'" class="about__more">
            Read more
            <br>about
            <span class="underline">us</span>
          </nuxt-link>
          <youtubePlayer class="about__video-player"/>
        </div>
      </section>
      <section class="apply">
        <div class="apply__image">
          <img src="/gallery/12.jpg" alt="Group of students working in class.">
        </div>
        <div class="apply__container">
          <h1>Join our 6 month web development course</h1>
          <nuxt-link :to="'/apply'">
            <span class="underline">apply</span>
          </nuxt-link>
        </div>
      </section>
      <section class="curiculum">
        <div class="curiculum__header">
          <h1>Expert teachers,
            <br>up-to-date skills
          </h1>
          <a href="https://github.com/HackYourFuture/curriculum">
            Check out our
            <span class="underline">curriculum</span>
          </a>
        </div>
        <div class="curiculum__image">
          <img src="/gallery/25.jpg" alt="Teacher in front of class.">
        </div>
        <div class="curiculum__container">
          <div class="curiculum__content" v-html="curiculum"/>
          <div class="curiculum__content-link">
            <nuxt-link :to="'/teach'">
              Time is your most valuable resource.
              <br>Find out about donating your
              <span class="underline">time and expertise</span>here.
            </nuxt-link>
          </div>
        </div>
      </section>
      <section class="teaser">
        <div class="teaser__container">
          <h1>Women Coding teaser</h1>
          <div class="teaser__content" v-html="teaser"/>
          <nuxt-link :to="'/teaser'">
            <span class="underline">Apply</span>
          </nuxt-link>
        </div>
        <div class="teaser__image">
          <img
            src="/gallery/22.jpg"
            alt="Close up, two women asking a question in the coding teaser."
          >
        </div>
      </section>
      <section class="hire">
        <div class="hire__image">
          <img src="/gallery/20.jpg" alt="Student receiving diploma after graduation.">
        </div>
        <div class="hire__container">
          <h1>Hire our graduates</h1>
          <div v-html="hire"/>
          <div>
            <nuxt-link :to="'/support'">
              Get in touch to talk about
              <span class="underline">hiring our graduates.</span>
            </nuxt-link>
          </div>
          <div v-html="laptops"/>
          <div>
            <nuxt-link :to="'/contact'">
              Contact us about
              <span class="underline">donating laptops.</span>
            </nuxt-link>
          </div>
        </div>
      </section>
    </main>
    <section class="chapters"/>
    <section class="makers">
      <graduates/>
    </section>
    <partners/>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import colors from "~/constants/colors";

import landscape from "~/components/index/Landscape";
import graduates from "~/components/graduates/Graduates";
import partners from "~/components/partners/Partners";
import youtubePlayer from "~/components/video/YoutubePlayer";

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
            about: data ? data : null,
            hire: hire ? hire : null,
            laptops: laptops ? laptops : null,
            teaser: teaser ? teaser : null,
            what,
            apply,
            curiculum,
            colors
        };
    },
    components: {
        landscape,
        graduates,
        partners,
        youtubePlayer
    }
};
</script>

<style lang="scss">
.about {
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
                font-size: 24px;
                line-height: 24px;
                margin: $base-vertical-rithm * 5 0;
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
                margin: $base-vertical-rithm * 5 40px;
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
        color: black;
        margin-left: 10%;
        font-size: 36px;
        line-height: 36px;
        font-weight: bold;
        @include breakpoint("mobile_landscape") {
            font-size: 24px;
            line-height: 24px;
        }
    }
}

.apply {
    margin: $base-vertical-rithm * 30 0;
    @include breakpoint("mobile_landscape") {
        margin: $base-vertical-rithm * 10 0;
    }
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
        width: 44%;
        display: inline-block;
        vertical-align: middle;
        @include breakpoint("mobile_landscape") {
            margin: $base-vertical-rithm * 10 $base-vertical-rithm * 6;
            width: 100%;
        }
        h1 {
            font-size: 36px;
            color: $color-purple;
            line-height: 50px;
            @include breakpoint("mobile_landscape") {
                font-size: 24px;
                line-height: 24px;
                margin: $base-vertical-rithm * 5 0;
            }
        }
        a {
            display: block;
            font-size: 24px;
            font-weight: bold;
            color: black;
            margin-top: $base-vertical-rithm * 5;
            span:after {
                bottom: -5px;
            }
        }
    }
}

.curiculum {
    margin: $base-vertical-rithm * 30 0;
    @include breakpoint("mobile_landscape") {
        margin: 0;
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
                font-size: 24px;
                line-height: 24px;
                width: 100%;
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
    }
    &__content {
        a {
            display: block;
            font-size: 24px;
            font-weight: bold;
            margin-top: $base-vertical-rithm * 5;
            span:after {
                bottom: -5px;
            }
        }
        &-link a {
            color: black;
        }
    }
}

.teaser {
    margin: $base-vertical-rithm * 30 $base-vertical-rithm * 10;
    @include breakpoint("mobile_landscape") {
        margin: $base-vertical-rithm * 15 0;
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
            line-height: 50px;
            margin: $base-vertical-rithm * 10 0;
            @include breakpoint("mobile_landscape") {
                width: 100%;
                font-size: 24px;
                line-height: 24px;
            }
        }
        a {
            display: block;
            font-size: 24px;
            color: black;
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
        width: 45%;
        margin: 0 auto;
        @include breakpoint("mobile_landscape") {
            width: 100%;
            margin-left: 0;
            margin-top: 0;
        }
    }
}

.hire {
    margin: $base-vertical-rithm * 10 $base-vertical-rithm * 10;
    @include breakpoint("mobile_landscape") {
        margin: $base-vertical-rithm * 5 0;
    }
    &__container {
        width: 45%;
        display: inline-block;
        margin: $base-vertical-rithm * 5;
        a {
            color: black;
        }
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
            font-size: 24px;
            line-height: 24px;
        }
    }

    &__image {
        width: 50%;
        display: inline-block;
        vertical-align: bottom;
        @include breakpoint("mobile_landscape") {
            width: 100%;
            margin-left: 0;
            margin-top: 0;
        }
    }
}
</style>
