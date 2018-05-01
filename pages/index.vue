<template>
  <div>
    <Landscape />
    <Main class="Main container">
      <section class="About">
        <div class="content" v-html="what"></div>

        <div class="About__video">
          <nuxt-link :to="'/'">More about <span>us</span></nuxt-link>
          <YoutubePlayer />
        </div>
      </section>

      <section class="Apply">
        <div class="Apply__image">
          <img src="">
        </div>
        <h1>Champion technology and frame the future</h1>
        <nuxt-link :to="'/'">Apply</nuxt-link>
      </section>

      <section class="Curiculum">
        <div class="Curiculum__header">
          <h1>Devising solutions with top-notch trainers</h1>
          <nuxt-link :to="'/'">Check out our <span>curiculum</span></nuxt-link>
        </div>
        <div class="Curiculum__image">
          <img src="">
        </div>
        <div class="Curiculum__content" v-html="curiculum"></div>
      </section>

      <section class="Hire">
        <h1>Help a brother out!</h1>
        <p>You can help us by donating money, knowledge
          and even laptops. Maybe you want to contri- bute to the local Hack Your Future chapter
          or do structural investments to our. Eather way we are very grateful for your generosity!
        </p>
        <nuxt-link :to="'/'">Hire Alumni</nuxt-link>
      </section>
    </Main>

    <section class="Chapters">

    </section>

    <section class="News">
      <News/>
    </section>

    <Signup/>

  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Colors from '~/constants/colors'

import Landscape from '~/components/index/Landscape';
import News from '~/components/news/News';
import Signup from '~/components/signup/Signup';
import YoutubePlayer from '~/components/video/YoutubePlayer';

 export default {
     async asyncData () {
         let data
         let what
         let apply
         let curiculum
         try {
             let req  = await axios.get('/content/en/index-about.json')
             let wReq  = await axios.get('/content/en/what.json')
             let aReq  = await axios.get('/content/en/apply.json')
             let cReq  = await axios.get('/content/en/curiculum.json')

             what = wReq.data.body
             apply = aReq.data.body
             data = req.data.body
             curiculum = cReq.data.body
         } catch (e) {
             console.log(e)
             data = false
         }
         return {
             siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
             about: data ? data : null,
             what,
             apply,
             curiculum,
             Colors
         }
     },
     components: {
       Landscape,
       News,
       Signup,
       YoutubePlayer
     }
 }
</script>
