<template>
  <div>
    <Main class="Support container">
      <div class="Support__header">
        <div class="Support__header-image">
          <img src="/gallery/19.jpg">
        </div>
        <div class="Support__header-content">
          <nuxt-link :to="'/'">Hire<br> <span class="underline">Alumni</span></nuxt-link>
          <div v-html="hire_alumni"/>
        </div>
      </div>
    </Main>
    <div class="Support__companies">
      <h3>Where our students work</h3>
      <div class="Support__companies-items">
        <img src="/partners/bijenkorf.svg">
        <img src="/partners/booking.svg">
        <img src="/partners/klm.svg">
        <!-- <img src="/partners/kpmg.svg"> -->
        <img src="/partners/nuon.svg">
        <!-- <img src="/partners/owlin.svg"> -->
        <!-- <img src="/partners/screen6.svg"> -->
      </div>
    </div>
    <Partners/>
    <Signup :color="'grey'"/>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import Signup from "~/components/signup/Signup";
import Partners from "~/components/partners/Partners";
export default {
    async asyncData() {
        let hire_alumni;
        try {
            let req = await axios.get(
                "/content/en/support/support-hire_alumni.json"
            );
            hire_alumni = req.data.body;
        } catch (e) {
            console.log(e);
            hire_alumni = false;
        }
        return {
            siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
            hire_alumni: hire_alumni ? hire_alumni : null
        };
    },
    components: {
        Signup,
        Partners
    }
};
</script>

<style lang="scss">
.Support {
    &__header {
        padding: $base-vertical-rithm * 10;
        @include breakpoint("mobile_landscape") {
            padding: 0;
        }
        a {
            color: $color-purple;
            font-weight: bold;
            font-size: 52px;
            line-height: 60px;
            span:after {
                bottom: -5px;
            }
        }
        &-content {
            display: inline-block;
            width: 40%;
            padding: $base-vertical-rithm * 10;
            @include breakpoint("mobile_landscape") {
                width: 100%;
                padding: $base-vertical-rithm * 8;
            }
            & > div {
                margin-top: $base-vertical-rithm * 5;
            }
        }
        &-image {
            width: 60%;
            display: inline-block;
            vertical-align: top;
            @include breakpoint("mobile_landscape") {
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
        margin: $base-vertical-rithm * 20 $base-vertical-rithm * 8;
        margin-bottom: $base-vertical-rithm * 5;
        h3 {
            font-size: 24px;
            color: $color-purple;
            font-weight: bold;
        }
        &-items {
            margin-top: $base-vertical-rithm * 5;
            display: -webkit-box;
            display: -ms-flexbox;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            position: relative;
            img {
                display: flex;
                font-weight: bold;
                color: $color-purple;
                width: calc(15% -5px);
                height: 150px;
                margin: 15px;
            }
            .hoi {
                height: 10%;
                width: auto;
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
