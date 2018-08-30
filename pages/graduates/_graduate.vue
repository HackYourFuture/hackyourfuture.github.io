<template>
  <div>
    <main class="Graduates container">
      <div class="Graduates__active">
        <div class="Graduates__active-frame">
            <img :src="'/graduates/' + $route.params.graduate + '.jpg'">
        </div>  
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
            siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
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
        &-frame{
            width: 35%;
            background-color:$color-purple;
            display:inline-block;
        }
        h1{
            margin-bottom: $base-vertical-rithm * 5;
        }
        a{
            text-decoration: underline;
        }
        img {
            padding: $base-vertical-rithm * 5;
            width: 100%;
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
