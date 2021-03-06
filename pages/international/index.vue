<template>
  <div>
    <div class="international__map">
      <div class="international__map-map">
        <img src="/map/map.svg" alt="Map indicating the HackYourFuture international.">
      </div>
      <div class="international__map-list">
        <h2>
          HackYourFuture
          <br>is active in:
        </h2>
        <a v-for="chapter in chapterPoints" :key="chapter.name" :href="chapter.link">
          <span class="underline">{{ chapter.name }}</span>
        </a>
      </div>
    </div>
    <main id="setup-chapter" class="international container">
      <div class="international__information">
        <h1>Start your own chapter</h1>
        <div v-html="international_info"/>
        <div class="international__information-image">
          <img src="/gallery/01.jpg" alt="Group picture of team and students.">
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
export default {
    async asyncData() {
        let international_info;
        try {
            let req = await axios.get(
                "/content/en/international/international_info.json"
            );
            international_info = req.data.body;
        } catch (e) {
            international_info = false;
        }
        return {
            international_info: international_info ? international_info : null
        };
    },
    data() {
        return {
            zoom: 4,
            center: [14, 50],
            rotation: 0,
            browser: false,
            chapterPoints: [
                {
                    name: "Amsterdam",
                    cords: [4.844456, 52.348763],
                    link: "/"
                },
                {
                    name: "Brussels",
                    cords: [4.3517, 50.8503],
                    link: "https://hackyourfuture.be/"
                },
                {
                    name: "Copenhagen",
                    cords: [12.569647, 55.677584],
                    link: "https://www.hackyourfuture.dk/"
                },
                {
                    name: "Toronto",
                    cords: [12, 55],
                    link:
                        "https://helpingnewcomerswork.ca/program/hack-your-future/"
                }
            ]
        };
    },
    mounted() {
        this.browser = true;
    },
    methods: {
        strToLower(str) {
            return str.toLowerCase();
        }
    }
};
</script>

<style lang="scss">
.international {
    &.container {
        margin-bottom: 200px;
        position: relative;
    }
    &__map {
        margin-top: 100px;
        @include breakpoint("mobile_landscape") {
            margin-top: 0;
        }
        &-map {
            width: 50%;
            margin-left: 50%;
            display: inline-block;
            @include breakpoint("mobile_landscape") {
                margin-left: 50%;
            }
            @include breakpoint("mobile_portrait") {
                margin-left: 0;
                width: 170%;
            }
        }
        &-list {
            width: 50%;
            color: $color-purple;
            position: absolute;
            z-index: 1;
            top: 55%;
            left: 25%;
            transform: translateX(-25%);
            transform: translateY(-55%);
            @include breakpoint("ipad_portrait") {
                top: 20%;
                left: 10%;
                transform: translateX(-10%);
                transform: translateY(-20%);
            }
            @include breakpoint("mobile_landscape") {
                top: 20%;
                transform: translateY(-20%);
            }
            @include breakpoint("mobile_portrait") {
                top: 75%;
                left: 5%;
                transform: translateX(-5%);
                transform: translateY(-75%);
            }
            h2 {
                @include breakpoint("mobile_landscape") {
                    display: none;
                }
            }
            .list {
                margin: 30px;
            }
            a {
                display: block;
                width: 125px;
                font-weight: 700;
                font-family: Space Mono, monospace;
                letter-spacing: 0.2px;
                color: black;
                @include breakpoint("mobile_landscape") {
                    padding: 5px 0;
                }
            }
        }
    }

    &__information {
        padding: $base-vertical-rithm * 10;
        a {
            color: black;
        }
        @include breakpoint("mobile_landscape") {
            padding: 0;
            width: 80%;
            margin: 0 auto;
        }

        &-image {
            margin-top: $base-vertical-rithm * 10;
            width: 50%;
            margin-left: 25%;
            margin-bottom: -250px;
            @include breakpoint("mobile_landscape") {
                margin-left: 0;
                margin-bottom: -110px;
            }
        }
        h1 {
            width: 25%;
            margin: $base-vertical-rithm * 5;
            margin-right: $base-vertical-rithm * 15;
            margin-top: 0px;
            color: $color-purple;
            font-weight: normal;
            font-size: 42px;
            line-height: 50px;
            display: inline-block;
            vertical-align: top;
            @include breakpoint("mobile_landscape") {
                width: 100%;
                margin: $base-vertical-rithm * 5 0;
                font-size: 32px;
                line-height: 40px;
                font-weight: bold;
            }
        }
        & > div {
            width: 50%;
            display: inline-block;
            vertical-align: top;
            @include breakpoint("mobile_landscape") {
                width: 100%;
            }
        }
    }
}
</style>
