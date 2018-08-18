<template>
  <div>
    <Main class="NewsPage container">
      <div :style="'background-image:url(/gallery/01.jpg)'" class="NewsPage__header">
        <div class="NewsPage__header-content">
          <h3>Briding the gap</h3>
          <p>A fresh batch of graduates avaiable to the techworld from 2018.</p>
          <nuxt-link :to="'/'">Read more</nuxt-link>
        </div>
      </div>
      <div class="NewsPage__items">
        <NewsItems/>
      </div>
    </Main>
    <Signup :color="'grey'"/>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import NewsItems from "~/components/news/NewsItems";
import Signup from "~/components/signup/Signup";
export default {
    async asyncData() {
        let content;
        try {
            let req = await axios.get("/content/en/News-questions.json");
            content = req.data.body;
        } catch (e) {
            console.log(e);
            content = false;
        }
        return {
            siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
            content: content ? content : null
        };
    },
    components: {
        NewsItems,
        Signup
    }
};
</script>

<style lang="scss">
.NewsPage {
    position: relative;
    &__header {
        height: 80vh;
        background: red;
        overflow: hidden;
        background-size: cover;
        position: relative;
        &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                to top,
                rgba(0, 0, 0, 0.65) 0%,
                rgba(0, 0, 0, 0) 50%
            );
        }
        &-content {
            position: absolute;
            z-index: 1;
            width: 25%;
            margin-left: 30%;
            bottom: $base-vertical-rithm * 10;
            h3,
            a {
                font-weight: bold;
            }
            a,
            h3,
            p {
                color: white;
                font-size: 20px;
            }
        }
    }
    &__items {
        margin-top: $base-vertical-rithm * 10;
        width: 80%;
        margin-left: 20%;
        color: $color-purple;
        h4 {
            font-weight: bold;
        }
    }
}
</style>
