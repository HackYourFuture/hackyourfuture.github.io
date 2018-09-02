<template>
  <div>
    <Main class="TeaserPage container">
      <div class="TeaserPage__header">
        <h1>Women Coding Teaser</h1>
        <div class="TeaserPage__header-image">
          <img src="/gallery/21.jpg">
        </div>
        <div class="TeaserPage__header-dates" v-html="teaser_dates"/>
        <div class="TeaserPage__header-about" v-html="teaser_about"/>
      </div>
      
      <div ref="TeaserPage__form" class="TeaserPage__form form">
        <h2>Apply for our next teaser day:</h2>
        <form method="POST" @submit.prevent="formUrlApply">
          <fieldset>
            <div class="half-width inputContainer">
              <label for="email">e-mail</label>
              <input id="email" ref="email" type="email" class="input" name="email" @focus="setActive">
            </div>
            
            <div class="half-width inputContainer">
              <label for="userName">Name</label>
              <input id="userName" ref="userName" type="text" class="input" name="userName" @focus="setActive">
            </div>

            <div class="half-width inputContainer">
              <label for="userSurname">Surname</label>
              <input id="userSurname" ref="userSurname" type="text" class="input" name="userSurname" @focus="setActive">
            </div>

            <div class="half-width inputContainer">
              <label for="phone">Phone Number</label>
              <input id="phone" ref="phone" type="number" class="input" name="phone" @focus="setActive">
            </div>

            <div class="full-width computer inputContainer">
              <label for="computer">Do you have your own laptop?</label>
              <select id="computer" ref="computer" name="computer" class="input" @focus="setActive">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div class="full-width inputContainer">
              <label for="eductation">Education / Work Background</label>
              <input id="education" ref="education" type="text" class="input" name="education" @focus="setActive">
            </div>

            <div class="full-width computer inputContainer">
              <label for="experience">Do you have any prior programming experience?</label>
              <select id="experience" ref="experience" name="experience" class="input" @focus="setActive">
                <option value="true">Yes</option>
                <option value="false">No</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="full-width inputContainer">
              <label for="message">Is there something else you would like to notify us about?</label>
              <input id="message" ref="message" type="text" class="input" name="message" @focus="setActive">
            </div>

            <div class="apply-btn">
              <input type="submit" value="Apply">
            </div>
          </fieldset>
        </form>
      </div>

      <div>
        <p ref="successMessage" class="TeaserPage__successMessage"/>
      </div>
      <div ref="errMsg"> 
        <p ref="errorMessage" class="Apply__errorMessage"/>
      </div>
    </Main>
  </div>
</template>
<script>
import axios from "~/plugins/axios";
export default {
    async asyncData() {
        let teaser_dates;
        let teaser_about;
        try {
            let req = await axios.get("/content/en/teaser/teaser-dates.json");
            let req1 = await axios.get("/content/en/teaser/teaser-about.json");
            teaser_dates = req.data.body;
            teaser_about = req1.data.body;
        } catch (e) {
            console.log(e);
            teaser_dates = false;
            teaser_about = false;
        }
        return {
            siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
            teaser_dates: teaser_dates ? teaser_dates : null,
            teaser_about: teaser_about ? teaser_about : null
        };
    },
    mounted: function() {
        this.$el.querySelectorAll(".input").forEach(i => {
            if (i.value.length == 0) {
                i.parentNode.classList.remove("active");
            } else {
                i.parentNode.classList.add("active");
            }
        });
    },
    methods: {
        async formUrlApply(e) {
            const fields = {};
            Object.values(e.target.elements).forEach(
                input => (fields[input.name] = input.value)
      ); // eslint-disable-line
            try {
                let req = await axios.post(// eslint-disable-line
                    process.env.lambdaUrl + "teaser",
                    fields
                ); // eslint-disable-line
            } catch (error) {
                if (error.response) {
                    let obj = error.response.data;
                    for (let key in obj) {
                        console.log(key);
                        for (let i = 0; i < 7; i++) {
                            this.$refs.errorMessage.innerHTML +=
                                `<br/>` +
                                obj.requestErrors[i].param +
                                " : " +
                                obj.requestErrors[i].msg;
                        }
                    }
                }
            }
        },
        setActive(e) {
            this.$el.querySelectorAll(".input").forEach(i => {
                if (i.value.length == 0) {
                    i.parentNode.classList.remove("active");
                }
            });
            e.target.parentNode.classList.add("active");
        }
    }
};
</script>

<style lang="scss">

