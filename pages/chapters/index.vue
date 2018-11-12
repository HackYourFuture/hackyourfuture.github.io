<template>
  <div>
    <div class="chapters__map">
      <div class="chapters__map-map">
        <img src="/map/map.svg" alt="Map indicating the HackYourFuture chapters.">
      </div>
      <div class="chapters__map-list">
        <p v-for="chapter in chapterPoints" :key="chapter.name">{{ chapter.name }}</p>
      </div>
    </div>
    <main class="chapters container">
      <div class="chapters__information">
        <h1>Start your own chapter</h1>
        <div v-html="chapters_info"/>
        <div class="chapters__information-image">
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
        let chapters_info;
        try {
            let req = await axios.get(
                "/content/en/chapters/chapters_info.json"
            );
            chapters_info = req.data.body;
        } catch (e) {
            chapters_info = false;
        }
        return {
            chapters_info: chapters_info ? chapters_info : null
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
                    cords: [4.844456, 52.348763]
                },
                {
                    name: "Brussels",
                    cords: [4.3517, 50.8503]
                },
                {
                    name: "Copenhagen",
                    cords: [12.569647, 55.677584]
                },
                {
                    name: "Malmö",
                    cords: [13.00925, 55.606281]
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
.chapters {
    &.container {
        margin-bottom: 200px;
    }

    &__map {
        margin-top: 100px;

        @include breakpoint("mobile_landscape") {
            margin-top: 0;
        }
        &-map {
            width: 50%;
            margin-left: 25%;
            display: inline-block;
            @include breakpoint("mobile_landscape") {
                margin-left: 0;
                width: 100%;
            }
            img {
                @include breakpoint("mobile_landscape") {
                    width: 150%;
                }
            }
        }
        &-list {
            padding: $base-vertical-rithm * 10;
            width: 20%;
            display: inline-block;
            vertical-align: top;
            color: $color-purple;
            @include breakpoint("mobile_landscape") {
                position: absolute;
                left: 0;
                padding: $base-vertical-rithm * 5;
                margin-top: 270px;
            }
            a {
                display: block;
            }
        }
    }

    &__information {
        padding: $base-vertical-rithm * 10;
        a {
            color: black;
        }
        @include breakpoint("mobile_landscape") {
            padding: $base-vertical-rithm * 8;
        }

        &-image {
            margin-top: $base-vertical-rithm * 10;
            width: 50%;
            margin-left: 25%;
            margin-bottom: -250px;
            @include breakpoint("mobile_landscape") {
                margin-left: 0;
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
                width: 80%;
                margin: $base-vertical-rithm * 5 0;
                font-size: 24px;
                line-height: 24px;
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
