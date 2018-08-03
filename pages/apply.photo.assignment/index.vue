<template>
    <div>
        <Main class="Apply container">
            <div class="Apply__header">
                <h1>Join <br> Us!</h1>
                <div class="Apply__header-image">
                    <img src="/gallery/05.jpg">
                </div>
                <div class="Apply__header-dates" v-html="dates"></div>
            </div>

            <div class="Apply__content" v-html="content">
            </div>

            <div class="Apply__form form">
                <form :action="formUrl" method="POST">
                    <fieldset>
                        <div class="half-width inputContainer">
                            <label for="upload_photo">Upload Photograph of Technical Assignment</label>

                            <input type="file" id="photo" class="text" name="photo" @focus="setActive">
                        </div>
                        
                        <div class="half-width inputContainer">
                            <label for="link">Write link to technical assignment here</label>

                            <input type="text" id="link" class="input" name="link" @focus="setActive">
                        </div>
                       
                        <div class="half-width inputContainer">
                            <label for="email">e-mail</label>
                            <input type="email" id="email" class="input" name="email" @focus="setActive">
                        </div>

                        <div class="half-width inputContainer">
                            <label for="info">Is there something you would like to notify us about?</label>

                            <input type="text" id="info" class="input" name="info" @focus="setActive">
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
             let req  = await axios.get('/content/en/apply/apply-dates.json')
             let req1 = await axios.get('/content/en/apply/apply-content.json')
             dates = req.data.body
             content = req1.data.body
         } catch (e) {
             console.log(e)
             dates = false
             content = false
         }
         return {
             formUrl: process.env.lambdaUrl,
             siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
             dates: dates ? dates : null,
             content: content ? content : null
         }
     },
     methods: {
        setActive(e) {
            this.$el.querySelectorAll('.input').forEach(function(i) {
            if(i.value.length == 0) { i.parentNode.classList.remove('active');}
            });
            e.target.parentNode.classList.add('active'); 
        },
        addFiles() {
        this.$refs.files.click();
     },
     components: {
     }
 }
</script>

<style lang="scss">
 .Apply {
     &__header {
         padding: $base-vertical-rithm * 10;
         h1 {
             margin: $base-vertical-rithm * 10;
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
         &-dates {
             margin-left: $base-vertical-rithm * 5;
             width: 10%;
             display: inline-block;
             vertical-align: top;
             h3 {
                 font-weight: bold;
             }
         }
     }
     &__content {
         width: 70%;
         margin: 0 auto;
     }
     &__form {
         width: 75%;
         margin-left: 2.5%;
         padding: $base-vertical-rithm * 10;
     }
 }
</style>
