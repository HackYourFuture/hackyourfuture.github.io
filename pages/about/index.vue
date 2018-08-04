<template>
  <div>
    <Main class="About container">
      <div class="About__header">

        <div class="About__header-content">
          <div v-html="why_exist"></div>
        </div>

        <div class="About__header-image">
          <img src="/gallery/03.jpg">
        </div>
        
      </div>
      
      <div class="About__container results">
       <div v-html="results_today"></div>
       <div class="links">
          <nuxt-link :to="'/'">You want<br> to <span class="underline">help?</span></nuxt-link>
          <nuxt-link :to="'/chapters'">You want <br>to <span class="underline">donate</span></nuxt-link>
       </div>
      </div>

      <div class="About__container how">
        <div class="About__container-image">
          <img src="/gallery/03.jpg">
        </div>
        <div v-html="how_school_works"></div>
      </div>

      <div class="About__container who">
        <div v-html="for_who"></div>
        <div class="About__container-image">
          <img src="/gallery/03.jpg">
        </div>
      </div>

      <div class="About__container funded">
       <div v-html="how_funded"></div>
       <div class="links">
          <nuxt-link :to="'/'">You want<br> to <span class="underline">help?</span></nuxt-link>
          <nuxt-link :to="'/chapters'">You want <br>to <span class="underline">donate</span></nuxt-link>
       </div>
      </div>

      <div class="About__container footer">
        <div class="About__container-image">
          <img src="/gallery/03.jpg">
        </div>
      </div>

    </Main>
    <Signup/>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Signup from '~/components/signup/Signup';

 export default {
     async asyncData () {
         let why_exist
         let results_today
         let for_who
         let how_school_works
         let how_funded
         try {
            let req  = await axios.get('/content/en/about/about-why_exist.json')
            let req1  = await axios.get('/content/en/about/about-results_today.json')
            let req2  = await axios.get('/content/en/about/about-for_who.json')
            let req3  = await axios.get('/content/en/about/about-how_school_works.json')
            let req4  = await axios.get('/content/en/about/about-how_funded.json')
             why_exist = req.data.body
             results_today = req1.data.body
             for_who = req2.data.body
             how_school_works = req3.data.body
             how_funded = req4.data.body
         } catch (e) {
             console.log(e)
             why_exist = false
             results_today = false
             for_who = false
             how_school_works = false
             how_funded = false
         }
         return {
             siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
             why_exist: why_exist ? why_exist : null,
             results_today: results_today ? results_today : null,
             for_who: for_who ? for_who : null,
             how_school_works: how_school_works ? how_school_works : null,
             how_funded: how_funded ? how_funded : null
         }
     },
     components: {
       Signup
     }
 }
</script>

<style lang="scss">
.About {
  h1 {
      margin-bottom: $base-vertical-rithm * 2;
      color: $color-purple;
      font-weight: normal;
      font-size: 42px;
      line-height: 50px;
    }
  &__header {
    padding: $base-vertical-rithm * 10;
    margin-right: -100px;
    a {
      color: $color-purple;
      font-weight: bold;
      font-size: 32px;
      line-height: 40px;
      span:after{
        bottom: -5px;
      }
    }
    &-content {
      display: inline-block;
      width: 50%;
      padding: $base-vertical-rithm * 10;
      & > div {
        margin-top: $base-vertical-rithm * 5;
      }
    }
    &-image {
      width: 50%;
      display: inline-block;
      vertical-align: top;
    }
   
  }
  &__container {
    margin: 0 $base-vertical-rithm * 10;
    
    &.how {
      margin-left: -50px;
      .About__container-image {
        margin-left: 0;
      }
    }

    &.who {
      margin-right: -100px;
      .About__container-image {
        margin-right: 0;
      }
    }

    .links {
      width: 25%;
      margin-left: 20%;
      a {
        font-size: 24px;
        line-height: 30px;
      }
    }


    &.footer {
      .About__container-image {
        margin-left: 25%;
        width: 50%;
      }
    }
    
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
        span:after{
          bottom: -5px;
        }
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

