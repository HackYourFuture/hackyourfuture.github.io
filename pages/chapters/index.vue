<template>
  <div>
    <div class="Chapters__map">

      <div class="Chapters__map-map">
        <img src="/map/map.svg">
      </div>

     <div class="Chapters__map-list">
       <p v-for="(chapter, key) in chapterPoints">{{chapter.name}}</p>
     </div>
    </div>
    <Main class="Chapters container">
      <div class="Chapters__information">
        <h1>get with the program</h1>
        <div v-html="chapters_info"></div>
         <div class="Chapters__information-image">
          <img src="/gallery/03.jpg">
        </div>
      </div>
    </Main>
    <Signup :color="'grey'"/>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Signup from '~/components/signup/Signup';
 export default {
     async asyncData () {
         let chapters_info
         try {
             let req  = await axios.get('/content/en/chapters/chapters_info.json')
             chapters_info = req.data.body
         } catch (e) {
             chapters_info = false
         }
         return {
             siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
             chapters_info: chapters_info ? chapters_info : null
         }
     },
     methods: {
       strToLower (str) {
        return str.toLowerCase();
       }
     },
     mounted () {
        this.browser = true;
     },
     data () {
        return {
          zoom: 4,
          center: [14, 50],
          rotation: 0,
          browser: false,
          chapterPoints: [
            {
              name: 'Amsterdam',
              cords: [4.844456, 52.348763]
            },
            {
              name: 'Copenhagen',
              cords: [12.569647, 55.677584]
            },
            {
              name: 'Dublin',
              cords: [-6.229248, 53.348937]
            },
            {
              name: 'Malmö',
              cords: [13.009250, 55.606281]
            },
            {
              name: 'Paris',
              cords: [2.350388, 48.859638]
            },
            {
              name: 'Stockholm',
              cords: [18.105469, 59.313396]
            },
            {
              name: 'Reykjavik',
              cords: [-21.807861, 64.123866]
            }
          ]
        }
      },
     components: {
       Signup
     }
 }
</script>

<style lang="scss">
.Chapters {
  &.container {
    margin-bottom: 200px;
  }

  &__map {
    margin-top: 100px;
    &-map {
      width: 50%;
      margin-left: 25%;
      display: inline-block;
    }
    &-list {
      padding: $base-vertical-rithm * 10;
      width: 20%;
      display: inline-block;
      vertical-align: top;
      a {
        display: block;
      }
    }
  }

  &__information {
    padding: $base-vertical-rithm * 10;
    &-image {
      margin-top: $base-vertical-rithm * 10;
      width: 50%;
      margin-left: 25%;
          margin-bottom: -250px;
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
    }
    & > div {
      width: 50%;
      display: inline-block;
      vertical-align: top;
    }
  }
}
</style>
