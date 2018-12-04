<template>
  <div>
    <main class="hire container">
      <div class="hire__header">
        <div class="hire__header-image">
          <img src="/gallery/19.jpg" alt="Student presenting his final project.">
        </div>
        <div class="hire__header-content">
          <div v-html="hire_alumni"/>
        </div>
      </div>
    </main>
    <div id="graduates" class="graduates container">
      <div class="graduates__active">
        <img
          :src="'/graduates/' + $route.params.graduate + '.jpg'"
          alt="Graduate of HackYourFuture"
        >
        <div class="graduates__active-content" v-html="content"/>
      </div>
      <Graduates/>
    </div>
    <div class="hire__companies">
      <h3>Where our students work</h3>
      <div class="hire__companies-items">
        <img src="/partners/bijenkorf.svg" alt="Bijenkorf.">
        <img src="/partners/booking.svg" alt="Booking.com.">
        <img src="/partners/klm.svg" alt="KLM.">
        <img src="/partners/nuon.svg" alt="Nuon.">
        <img src="/partners/accenture.svg" alt="Accenture.">
        <img src="/partners/energie.svg" alt="Energie.">
        <img src="/partners/vruchtvlees.svg" alt="Vruchtvlees.">
        <img src="/partners/ilumy.svg" alt="Ilumy.">
        <img src="/partners/kpmg.svg" alt="Ilumy.">
      </div>
    </div>
    <Partners/>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import Partners from "~/components/partners/partners";
import Graduates from "~/components/graduates/graduates";
export default {
    async asyncData({ params }) {
        let hire_alumni;
        let content;
        try {
            let req = await axios.get("/content/en/hire/hire-alumni.json");
            let req1 = await axios.get(
                "/content/en/graduates/" + params.graduate + ".json"
            );
            hire_alumni = req.data.body;
            content = req1.data.body;
        } catch (e) {
            console.log(e);
            content = false;
            hire_alumni = false;
        }
        return {
            hire_alumni: hire_alumni ? hire_alumni : null,
            content: content ? content : null,
            currentStudent: null
        };
    },
    components: {
        Partners,
        Graduates
    }
};
</script>

<style lang="scss">
.hire {
    &__header {
        padding: $base-vertical-rithm * 10;
        display: flex;
        @include breakpoint("mobile_landscape") {
            padding: 0;
            flex-wrap: wrap;
        }
        &-content {
            width: 60%;
            margin: $base-vertical-rithm * 10 auto;
            @include breakpoint("mobile_landscape") {
                width: 80%;
                margin: $base-vertical-rithm * 5 auto;
            }
            h1 {
                font-weight: bold;
                font-size: 60px;
                line-height: 1.25em;
                @include breakpoint("mobile_landscape") {
                    width: 100%;
                    font-size: 32px;
                    line-height: 40px;
                }
            }
        }
        &-image {
            width: 95%;
            margin: 50px;
            margin-left: -70px;
            vertical-align: top;
            @include breakpoint("mobile_landscape") {
                margin: 0;
                width: 100%;
            }
        }
    }
    &__container {
        margin: 0 $base-vertical-rithm * 10;
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
    &__companies {
        margin: $base-vertical-rithm * 15 $base-vertical-rithm * 10
            $base-vertical-rithm * 5;
        @include breakpoint("mobile_landscape") {
            margin-top: $base-vertical-rithm * 5;
        }
        @include breakpoint("mobile_portrait") {
            margin-top: $base-vertical-rithm * 10;
        }
        h3 {
            font-size: 24px;
        }
        &-items {
            margin-top: $base-vertical-rithm * 5;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            @include breakpoint("mobile_portrait") {
                flex-wrap: wrap;
            }
            img {
                font-weight: bold;
                color: $color-purple;
                width: calc(15% - 5px);
                margin: 15px;
                padding: 0 15px;
                @include breakpoint("mobile_landscape") {
                    padding: 0;
                }
                @include breakpoint("mobile_portrait") {
                    width: calc(45% - 20px);
                    padding: 0 10px;
                }
            }
        }
    }
}
</style>
