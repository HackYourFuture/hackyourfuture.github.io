<template>
  <div>
    <Main class="Apply container">
      <div class="Apply__header">
        <h1>Join <br> Us!</h1>
        <div class="Apply__header-image">
          <img src="/gallery/11.jpg" alt="Group of students working in class.">
        </div>
        <div class="Apply__header-dates" v-html="dates"/>
      </div>

      <div class="Apply__content" v-html="content"/>

      <div ref="Apply__form" class="Apply__form form">
        <h2>Apply for our next class:</h2>
        <form method="POST" @submit.prevent="formUrlApply">
          <fieldset>
            <div class="half-width inputContainer">
              <label for="firstName">First Name *</label>
              <input id="firstName" ref="firstName" type="text" class="input" name="firstName" @focus="setActive">
            </div>

            <div class="half-width inputContainer">
              <label for="lastName">Last Name *</label>
              <input id="lastName" ref="lastName" type="text" class="input" name="lastName" @focus="setActive">
            </div>

            <div class="half-width inputContainer">
              <label for="city">City *</label>
              <input id="city" ref="city" type="text" class="input" name="city" @focus="setActive">
            </div>

            <div class="half-width inputContainer">
              <label class="active label" for="country">Country *</label>
              <select id="country" name="country" class="input">
                <option value="nl">The Netherlands</option>
                <option value="dk">Denmark</option>
                <option value="se">Sweden</option>
              </select>
            </div>

            <div class="half-width inputContainer">
              <label for="email">E-mail *</label>
              <input id="email" ref="email" type="email" class="input" name="email" @focus="setActive">
            </div>

            <div class="half-width inputContainer">
              <label for="phone">Phone *</label>
              <input id="phone" ref="phone" type="number" class="input" name="phone" @focus="setActive">
            </div>

            <div class="full-width inputContainer">
              <label for="eductation">Educational Background *</label>
              <input id="education" ref="education" type="eductation" class="input" name="education" @focus="setActive">
            </div>

            <div class="full-width inputContainer">
              <label for="how-hear">How did you hear about us? *</label>
              <input id="how-hear" ref="how_hear" type="how-hear" class="input" name="how_hear" @focus="setActive">
            </div>

            <div class="full-width computer inputContainer">
              <label for="computer">I have a computer *</label>
              <select id="computer" ref="computer" name="computer" class="input" @focus="setActive">
                <option value="true">Yes</option>
                <option value="false">No</option>
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
        <p ref="successMessage" class="Apply__successMessage"/>
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
        let dates;
        let content;
        try {
            let req = await axios.get("/content/en/apply/apply-dates.json");
            let req1 = await axios.get("/content/en/apply/apply-content.json");
            dates = req.data.body;
            content = req1.data.body;
        } catch (e) {
            console.log(e);
            dates = false;
            content = false;
        }
        return {
            siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
            dates: dates ? dates : null,
            content: content ? content : null
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
            let obj = {};
            const fields = {};
            Object.values(e.target.elements).forEach(
                input => (fields[input.name] = input.value)
      ); // eslint-disable-line
            try {
                let req = await axios.post(// eslint-disable-line
                    process.env.lambdaUrl + "apply",
                    fields
                ); // eslint-disable-line
            } catch (error) {
                if (error.response) {
                    obj = error.response.data;
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
.Apply {
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
            font-size: 60px;
            line-height: 1.25em;
            display: inline-block;

            @include breakpoint("mobile_landscape") {
                margin: $base-vertical-rithm * 5;
                font-size: 32px;
                line-height: 40px;
            }
        }
        &-image {
            width: 60%;
            display: inline-block;
            @include breakpoint("mobile_landscape") {
                width: 100%;
            }
        }
        &-dates {
            margin-left: $base-vertical-rithm * 15;
            margin-top: $base-vertical-rithm * 15;
            width: 100%;
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
            h3 {
                font-weight: bold;
                color: $color-purple;
            }
            h4 {
                color: $color-purple;
                font-weight: bold;
            }
        }
    }
    &__content {
        width: 70%;
        margin: 0 auto;
        @include breakpoint("mobile_landscape") {
            width: 80%;
            margin: 0 auto;
        }
        h1 {
            color: $color-purple;
            line-height: 1;
            margin: 0 $base-vertical-rithm * 10 $base-vertical-rithm * 10;
            @media (max-width: 800px) {
                margin: 0 0 5 * $base-vertical-rithm;
            }
        }
        h2 {
            color: $color-purple;
            font-size: 2em;
            font-weight: bold;
        }
        ul li {
            list-style: disc;
            margin: 5px;
        }
        ul + p {
            margin-top: 1rem;
        }
    }
    &__form {
        width: 75%;
        margin-left: 2.5%;
        padding: $base-vertical-rithm * 10;
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
            font-size: 36px;
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
    &__errorMessage {
        margin-top: $base-vertical-rithm * 10;
        font-weight: bold;
        font-size: 18px;
        color: $color-purple;
        text-align: center;
    }
}
</style>
