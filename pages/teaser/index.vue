<template>
  <div>
    <Main class="TeaserPage container">
      <div class="TeaserPage__header">
        <h1>Women Coding Teaser</h1>
        <div class="TeaserPage__header-image">
          <img src="/gallery/21.jpg" alt="Group of women who get their first coding class.">
        </div>
        <div class="TeaserPage__header-dates" v-html="teaser_dates"/>
        <div class="TeaserPage__header-about" v-html="teaser_about"/>
      </div>
      
      <div ref="TeaserPage__form" class="TeaserPage__form form">
        <h2>Apply for our next teaser day:</h2>
        <form method="POST" @submit.prevent="formUrlApply">
          <fieldset>

            <div class="half-width inputContainer">
              <label for="firstName">First Name *</label>
              <input id="firstName" type="text" class="input" name="firstName" @focus="setActive">
            </div>

            <div class="half-width inputContainer">
              <label for="lastName">Last Name *</label>
              <input id="lastName" type="text" class="input" name="lastName" @focus="setActive">
            </div>
  
            <div class="half-width inputContainer">
              <label for="email">E-mail *</label>
              <input id="email" ref="email" type="email" class="input" name="email" @focus="setActive">
            </div>
            
            <div class="half-width inputContainer">
              <label for="phone">Phone</label>
              <input id="phone" type="number" class="input" name="phone" @focus="setActive">
            </div>

            <div class="half-width computer inputContainer">
              <label for="computer">I have my own laptop *</label>
              <select id="computer" name="computer" class="input" @focus="setActive">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div class="half-width computer inputContainer">
              <label for="experience">I have programmed before *</label>
              <select id="experience" name="experience" class="input" @focus="setActive">
                <option value="true">Yes</option>
                <option value="false">No</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="full-width inputContainer">
              <label for="eductation">Education / Work Background *</label>
              <input id="education" type="text" class="input" name="education" @focus="setActive">
            </div>

            <div class="full-width inputContainer">
              <label for="message">Is there something else you would like to notify us about?</label>
              <input id="message" type="text" class="input" name="message" @focus="setActive">
            </div>

            <div class="apply-btn">
              <input type="submit" value="Apply">
            </div>
          </fieldset>
        </form>
        <div v-if="applied.tried" class="blur-screen"> 
          <div class="applied-popup">
            <p>{{ applied.success ? successMessage : failedMessage }}</p>
            <button @click="applied.tried = false; applied.success = false">Close</button>
          </div>
        </div>
      </div>
	  
    </Main>
  </div>
</template>
<script>
import axios from "~/plugins/axios";
export default {
    data: () => {
        return {
            successMessage:
                "Thank you for applying, we will contact you as soon as possible",
            failedMessage: "Sorry something went wrong, please try again.",
            applied: { tried: false, success: false }
        };
    },
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
                await axios.post(`${process.env.lambdaUrl}teaser`, fields);
                this.applied.success = true;
                this.applied.tried = true;
                this.$el.querySelectorAll(".input").forEach(i => {
                    i.value = "";
                    i.parentNode.classList.remove("active");
                });
            } catch (error) {
                if (error.response.data.errors) {
                    const message = error.response.data.errors.reduce(
                        (sum, current, index) => {
                            if (!index) {
                                return (sum = current.msg);
                            }
                            return (sum = `${sum}, ${current.msg}`);
                        },
                        ""
                    );
                    this.failedMessage = message;
                }

                this.applied.success = false;
                this.applied.tried = true;
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
                width: 100%;
                font-size: 24px;
                line-height: 24px;
                margin: $base-vertical-rithm * 5;
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
                vertical-align: top;
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
        position: relative;
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
        .blur-screen {
            position: absolute;
            z-index: 98;
            left: 0;
            top: 0;
            width: 100%;
            min-height: 100%;
            background: rgba(0, 0, 0, 0.1);
        }

        .applied-popup {
            z-index: 99;
            display: flex;
            flex-direction: column;
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -100px 0 0 -170px;
            font-size: 20px;
            width: 350px;
            height: 220px;
            border: 2px solid rgb(219, 213, 213);
            background-color: rgb(255, 255, 255);
            border-radius: 5px;
            -webkit-box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.21);
            -moz-box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.21);
            box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.21);
            animation: fadeIn 0.5s;
            @include breakpoint("mobile_portrait") {
                width: 330px;
            }

            p {
                margin: 0;
                text-align: center;
                padding: 50px 5px 5px 5px;
                color: #293a7d;
            }

            button {
                margin: auto;
                border: 2px solid rgb(219, 213, 213);
                background-color: rgb(255, 255, 255);
                border-radius: 5px;
                padding: 5px;
            }
        }
    }
    &__successMessage {
        margin-top: $base-vertical-rithm * 10;
        font-weight: bold;
        font-size: 24px;
        color: $color-purple;
        text-align: center;
    }
    &__errorMessage {
        margin-top: $base-vertical-rithm * 10;
        font-weight: bold;
        font-size: 18px;
        color: $color-purple;
        text-align: center;
    }
}
</style>
