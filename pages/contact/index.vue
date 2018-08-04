<template>
  <div>
    <Main class="Contact container">
      <div class="Contact__header">
        <h1>Frequently Asked Questions</h1>
      </div>

      <nuxt-link :to="'/'" class="Contact__quicklink">Take me<br> to <span class="underline">contact</span></nuxt-link>
      <div class="Contact__content" v-html="content">
      </div>
      <div class="Contact__form form">
        <h1>Reach us and facilitate change!</h1>
        <p>General Inquiries</p>
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
            <label for="city">City</label>
            <input type="text" id="city" name="city" @focus="setActive">
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
          <div class="half-width inputContainer">
            
            <label for="phone">phone</label>
            <input type="number" id="phone" name="phone" @focus="setActive">
          </div>
          <div class="full-width inputContainer">
            
            <label for="education">Educational Background</label>
            <input type="education" id="education" name="education" @focus="setActive">
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
         let dates
         let content
         try {
             let req  = await axios.get('/content/en/contact/contact-questions.json')
             content = req.data.body
         } catch (e) {
             console.log(e)
             content = false
         }
         return {
             siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
             content: content ? content : null
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
.Contact {
  position: relative;
  &__header {
    padding: $base-vertical-rithm * 10;
    h1 {
      // margin: $base-vertical-rithm * 10;
      margin-bottom: $base-vertical-rithm * 2;
      width: 20%;
      color: $color-purple;
      font-weight: bold;
      font-size: 52px;
      line-height: 60px;
      display: inline-block;
    }
    &-image {
      width: 55%;
      display: inline-block;
    }
  }
  &__quicklink {
    position: absolute;
    margin: $base-vertical-rithm * 10;
    font-weight: bold;
    font-size: 18px;
    span:after {
      bottom: -5px;
    }
  }
  &__content {
    width: 40%;
    margin-left: 50%;
    color: $color-purple;
    h4 {
      font-weight: bold;
    }
  }
  &__form {
    margin-top: $base-vertical-rithm * 10;
    width: 70%;
    margin-left: 15%;
    position: relative;
    p, h1 {
      margin-left: 50px;
      color: $color-purple;
    }
    h1 {
      font-weight: bold;
      font-size:36px;
      width: 40%;
      line-height: 36px;
    }
    p {
      margin-top: $base-vertical-rithm * 10;
      font-weight: bold;
      font-size: 24px;
    }
  }
}
</style>

