<template>
  <div>
    <main class="Graduates container">
      <div class="Graduates__active">
        <img :src="'/makers/' + $route.params.graduate + '.png'">
        <div class="Graduates__active-content" v-html="content"/>
      </div>
      <Makers/>
    </main>
  </div>
</template>

<script>
import Makers from "~/components/makers/Makers";
import axios from "~/plugins/axios";
export default {
    async asyncData({ params }) {
        let content;
        try {
            let req = await axios.get(
                "/content/en/graduates/" + params.graduate + ".json"
            );
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
        Makers
    }
};
</script>

<style lang="scss">
.Graduates {
    position: relative;
    &__active {
        padding: $base-vertical-rithm * 20 $base-vertical-rithm * 8;
        img {
            width: 30%;
            display: inline-block;
            @include breakpoint("mobile_landscape") {
                width: 100%;
            }
        }
        &-content {
            margin-left: 10%;
            width: 50%;
            display: inline-block;
            vertical-align: top;
            @include breakpoint("mobile_landscape") {
                width: 100%;
                margin-left: 0;
                margin-top: 20px;
            }
        }
    }
}
</style>
