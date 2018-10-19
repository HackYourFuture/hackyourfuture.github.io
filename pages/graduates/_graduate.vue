<template>
  <div>
    <main class="Graduates container">
      <div class="Graduates__active">
        <img :src="'/graduates/' + $route.params.graduate + '.jpg'" alt="Graduate of HackYourFuture">
        <div class="Graduates__active-content" v-html="content"/>
      </div>
      <Graduates/>
    </main>
  </div>
</template>

<script>
import Graduates from "~/components/graduates/Graduates";
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
            content: content ? content : null
        };
    },
    components: {
        Graduates
    }
};
</script>

<style lang="scss">
.Graduates {
    position: relative;
    &__active {
        padding: $base-vertical-rithm * 20 $base-vertical-rithm * 8;
        h1 {
            margin-bottom: $base-vertical-rithm * 5;
        }
        a {
            color: black;
        }
        img {
            width: 40%;
            display: inline-block;
            vertical-align: top;
            @include breakpoint("mobile_landscape") {
                width: 100%;
            }
        }
        &-content {
            margin-left: 7%;
            margin-top: 2%;
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
