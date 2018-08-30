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
              <input id="email" ref="email" type="email" class="input" name="email" @focus="setActive" @click="emptyRequiredField($refs.email)">
            </div>
            
            <div class="half-width inputContainer">
              <label for="userName">Name</label>
              <input id="userName" ref="userName" type="text" class="input" name="userName" @focus="setActive" @click="emptyRequiredField($refs.userName)">
            </div>

            <div class="half-width inputContainer">
              <label for="userSurname">Surname</label>
              <input id="userSurname" ref="userSurname" type="text" class="input" name="userSurname" @focus="setActive" @click="emptyRequiredField($refs.userSurname)">
            </div>

            <div class="half-width inputContainer">
              <label for="phone">Phone Number</label>
              <input id="phone" ref="phone" type="number" class="input" name="phone" @focus="setActive" @click="emptyRequiredField($refs.phone)">
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
              <input id="education" ref="education" type="text" class="input" name="education" @focus="setActive" @click="emptyRequiredField($refs.education)">
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
            if (this.emptyInputs() === true) {
                const fields = {};
                Object.values(e.target.elements).forEach(
                    input => (fields[input.name] = input.value)
        ); // eslint-disable-line
        let req = await axios.post(process.env.lambdaUrl + "teaser", fields); // eslint-disable-line
            }
        },
        setActive(e) {
            this.$el.querySelectorAll(".input").forEach(i => {
                if (i.value.length == 0) {
                    i.parentNode.classList.remove("active");
                }
            });
            e.target.parentNode.classList.add("active");
        },
        emptyInputs() {
            const inputs = [
                this.$refs.email,
                this.$refs.userName,
                this.$refs.userSurname,
                this.$refs.phone,
                this.$refs.education
            ];
            inputs.forEach(element => {
                if (element.value === "" || element.value === null) {
                    element.parentNode.classList.add("active");
                    element.value = "Required field";
                    return false;
                } else {
                    this.successMSG();
                    return true;
                }
            });
            return true;
        },
        emptyRequiredField(e) {
            e.parentNode.classList.add("active");
            e.value = "";
        },
        successMSG() {
            const { successMessage } = this.$refs;
            this.$refs.TeaserPage__form.style.display = "none";
            successMessage.innerHTML = "You have applied successfully.";
        }
    }
};
</script>

<style lang="scss">
.TeaserPage {
    &__container {
        margin: 0 $base-vertical-rithm * 10;
        & > div {
            display: inline-block;
            width: calc(50% - 100px);
            vertical-align: top;
            margin: 50px;
        }
    }
    &__header {
        padding: $base-vertical-rithm * 10;
        @include breakpoint("mobile_landscape") {
            padding: 0;
        }
        h1 {
            margin: $base-vertical-rithm * 10;
            margin-bottom: $base-vertical-rithm * 2;
            width: 20%;
            color: $color-purple;
            font-weight: bold;
            font-size: 52px;
            line-height: 60px;
            display: inline-block;
            @include breakpoint("mobile_landscape") {
                font-size: 24px;
                line-height: 24px;
            }
        }
        &-image {
            width: 50%;
            display: inline-block;
            vertical-align: top;
            @include breakpoint("mobile_landscape") {
                width: 100%;
            }
        }
        &-links a {
            font-size: 18px;
        }
        &-dates {
            margin: $base-vertical-rithm * 15;
            // margin-left: $base-vertical-rithm * 15;
            width: 90%;
            display: inline-block;
            vertical-align: top;
            @include breakpoint("mobile_landscape") {
                margin: $base-vertical-rithm * 5;
            }
            div {
                display: inline-block;
                width: calc(25% - 20px);
                @include breakpoint("mobile_landscape") {
                    width: calc(50% - 10px);
                    margin: $base-vertical-rithm * 5 auto;
                }
            }
            h4 {
                font-size: 18px;
                color: $color-purple;
                font-weight: bold;
            }
        }
        &-about {
            width: 90%;
            margin: 0 auto;
            @include breakpoint("mobile_landscape") {
                width: 80%;
                margin: 0 auto;
            }
            h2 {
                color: $color-purple;
                font-weight: bold;
                font-size: 28px;
                line-height: 1;
                margin-bottom: $base-vertical-rithm * 5;
            }
        }
    }
    &__form {
        width: 75%;
        margin-left: 2.5%;
        padding: $base-vertical-rithm * 15;
        @include breakpoint("mobile_landscape") {
            width: 100%;
            padding: $base-vertical-rithm * 5;
            margin: 0;
        }
        p,
        h1 {
            margin-left: 50px;
            color: $color-purple;
        }
        h1 {
            font-weight: bold;
            font-size: 30px;
            width: 60%;
            line-height: 36px;
        }
        h2 {
            font-weight: bold;
            color: $color-purple;
            font-size: 36px;
            width: 40%;
            line-height: 36px;
            @include breakpoint("mobile_landscape") {
                width: 100%;
                font-size: 32px;
                line-height: 40px;
            }
        }
        p {
            margin-top: $base-vertical-rithm * 10;
            font-weight: bold;
            font-size: 24px;
        }
    }
    &__successMessage {
        margin-top: $base-vertical-rithm * 10;
        font-weight: bold;
        font-size: 24px;
        color: $color-purple;
        text-align: center;
    }
}
</style>
