<template>
  <div>
    <Main class="Teach container">
      <div class="Teach__header">
        <div class="Teach__header-image">
          <img src="/gallery/03.jpg">
        </div>
        <h1>What we teach</h1>
      </div>
      
      <div class="Teach__container what">
        <div class="links">
          <nuxt-link :to="'/'">Check-out our<br> <span class="underline">curriculum</span></nuxt-link>
          <nuxt-link :to="'/chapters'">Setup your <br><span class="underline">chapter</span></nuxt-link>
        </div>
          <div v-html="what_we_teach"></div>
        </div>
    
        <div class="Teach__container who">
          <div v-html="who_are_our_teachers"></div>
          <div class="Teach__container-image">
            <img src="/gallery/03.jpg">
          </div>
        </div>

        <div class="Teach__container teach">
           <!-- Not sure if we need another image here -->
          
            <div class="Teach__container-image">
            <img src="/gallery/03.jpg">
          </div>
          <div v-html="what_it_means_to_teach"></div>
         
        </div>
        
        <div class="Teach__form form">
          <h1>Join our teacher team</h1>
          
          <form action="">
          <fieldset>
            <div class="half-width inputContainer">
              <label for="firstName">Fist Name</label>
              
              <input type="text" id="firstName" name="firstName" @focus="setActive">
            </div>
            <div class="half-width inputContainer">
              <label for="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" @focus="setActive">
            </div>
            <div class="half-width inputContainer">
              
              <select name="country" id="country" @focus="setActive">
                <option value="nl">The Netherlands</option>
              </select>
            </div>
            <div class="half-width inputContainer">
              
              <label for="email">e-mail</label>
              <input type="email" id="email" name="email" @focus="setActive">
            </div>
            <div class="full-width inputContainer">
            
            <label for="message">Please tell us something about your work or educational background</label>
            <input type="message" id="message" name="message" @focus="setActive">
          </div>
  
            <div class="apply-btn">
              <input type="submit" value="Apply">
            </div>
          </fieldset>
          </form>
        </div>
    
    </Main>

  </div>
</template>

<script>
import axios from '~/plugins/axios'

 export default {
     async asyncData () {
         let what_we_teach
         let who_are_our_teachers
         let what_it_means_to_teach
         try {
             let req  = await axios.get('/content/en/teach/teach-what_we_teach.json')
             let req1  = await axios.get('/content/en/teach/teach-who_are_our_teachers.json')
             let req2 = await axios.get('/content/en/teach/teach-what_it_means_to_teach.json')
            what_we_teach = req.data.body
            who_are_our_teachers = req1.data.body
            what_it_means_to_teach = req2.data.body
           
         } catch (e) {
             console.log(e)
            what_we_teach = false
            who_are_our_teachers = false
            what_it_means_to_teach = false
         }
         return {
             siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
          what_we_teach: what_we_teach ? what_we_teach : null,
          who_are_our_teachers: who_are_our_teachers ? who_are_our_teachers : null,
          what_it_means_to_teach: what_it_means_to_teach ? what_it_means_to_teach : null
         }
     },
     methods: {
      setActive(e) {
        this.$el.querySelectorAll('.inputContainer').forEach(function(i) {
          i.classList.remove('active');
        });
        e.target.parentNode.classList.add('active');
      }
    },
    components: {
    }
 }
</script>

<style lang="scss">
.Teach {
  &__header {
    padding: $base-vertical-rithm * 10;
    h1 {
      margin: $base-vertical-rithm * 10;
      margin-bottom: $base-vertical-rithm * 2;
      width: 30%;
      color: $color-purple;
      font-weight: bold;
      font-size: 60px;
      line-height: 70px;
      display: inline-block;
    }
    &-image {
      width: 60%;
      display: inline-block;
      vertical-align: top;
    }
   
  }

  &__container {
    margin: 0 $base-vertical-rithm * 10;
    h1 {
      margin-bottom: $base-vertical-rithm * 2;
      color: $color-purple;
      font-weight: normal;
      font-size: 42px;
      line-height: 50px;
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
    &-image {
      width: 50%;
      display: inline-block;
      vertical-align: top;
    }
    &.what {
      margin-left: 20%;
      .Teach__container-image {
        margin-left: 0;
      }
    }
    &.who {
      margin-right: -100px;
      .Teach__container-image {
        margin-right: 0;
      }
    }
    &.teach {
      margin-left: -50px;
      .Teach__container-image {
        margin-left: 0;
      }
    }
    
    .links {
      margin-left: $base-vertical-rithm * 10;
      width: 25%;
      display: inline-block;
      a {
        display: block;
        margin-top: 40px;
        font-weight: bold;
        font-size: 18px;
        .underline:after {
          bottom: -5px;
        }
        &:nth-child(1) {
          margin-top:0;
        }
      }
    }
    
  }

  &__form {
    margin-top: $base-vertical-rithm * 10;
    width: 70%;
    margin-left: 15%;
    position: relative;
    h1 {
      margin-left: 50px;
      color: $color-purple;
      font-weight: bold;
      font-size:36px;
      width: 40%;
      line-height: 36px;
    }
  }
  
}
</style>

