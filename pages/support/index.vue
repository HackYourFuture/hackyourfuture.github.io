<template>
  <div>
    <Main class="Support container">
      <div class="Support__header">
        <div class="Support__header-image">
          <img src="/gallery/03.jpg">
        </div>
        <div class="Support__header-content">
          <nuxt-link :to="'/'">Hire<br> <span class="underline">Alumni</span></nuxt-link>
          <div v-html="hire_alumni"></div>
        </div>
      </div>
      
      <div class="Support__container">
        <div class="Support__container-sponsor">
           <nuxt-link :to="'/'">Sponsor<br> <span class="underline">Us</span></nuxt-link>
           <div v-html="sponsor_us"></div>
        </div>
        <div class="Support__container-donate">
           <nuxt-link :to="'/'">Donate<br> <span class="underline">Laptops</span></nuxt-link>
           <div v-html="donate_laptops"></div>
        </div>
      </div>

      <div class="Support__footer">
        <nuxt-link :to="'/'">become<br> a <span class="underline">partner</span></nuxt-link>
        <nuxt-link :to="'/'">become<br> a <span class="underline">trainer</span></nuxt-link>
      </div>
    </Main>
    <Partners/>
    <Signup :color="'grey'"/>
    
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Signup from '~/components/signup/Signup';
import Partners from '~/components/partners/Partners';
 export default {
     async asyncData () {
         let hire_alumni
         let sponsor_us
         let donate_laptops
         try {
             let req  = await axios.get('/content/en/support/support-hire_alumni.json')
             let req1  = await axios.get('/content/en/support/support-sponsor_us.json')
             let req2  = await axios.get('/content/en/support/support-donate_laptops.json')
             hire_alumni = req.data.body
             sponsor_us = req1.data.body
             donate_laptops = req2.data.body
         } catch (e) {
             console.log(e)
             hire_alumni = false
             sponsor_us = false
             donate_laptops = false
         }
         return {
             siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
             hire_alumni: hire_alumni ? hire_alumni : null,
             sponsor_us: sponsor_us ? sponsor_us : null,
             donate_laptops: donate_laptops ? donate_laptops : null
         }
     },
     components: {
       Signup,
       Partners
     }
 }
</script>

<style lang="scss">
.Support {
  &__header {
    padding: $base-vertical-rithm * 10;
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
      width: 40%;
      padding: $base-vertical-rithm * 10;
      & > div {
        margin-top: $base-vertical-rithm * 5;
      }
    }
    &-image {
      width: 60%;
      display: inline-block;
      vertical-align: top;
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

