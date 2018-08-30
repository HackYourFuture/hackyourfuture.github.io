<template>
  <div>
    <Main class="Apply container">
      <div class="Apply__header">
        <h1>Join <br> Us!</h1>
        <div class="Apply__header-image">
          <img src="/gallery/11.jpg">
        </div>
        <div class="Apply__header-dates" v-html="dates"/>
      </div>

      <div class="Apply__content" v-html="content"/>
      <div class="Apply__form form">
        <h2>Apply for our next class:</h2>
        <form method="POST" @submit.prevent="formUrlApply">
          <fieldset>
            <div class="half-width inputContainer">
              <label for="userName">Name</label>

              <input id="userName" type="text" class="input" name="userName" @focus="setActive">
            </div>
            <div class="half-width inputContainer">
              <label for="street">Street</label>

              <input id="street" type="text" class="input" name="street" @focus="setActive">
            </div>
            <div class="half-width inputContainer">
              <label for="city">City</label>

              <input id="city" type="text" class="input" name="city" @focus="setActive">
            </div>
            <div class="half-width inputContainer">

              <select id="country" name="country" class="input" @focus="setActive">
                <option value="nl">The Netherlands</option>
              </select>
            </div>
            <div class="half-width inputContainer">

              <label for="email">e-mail</label>
              <input id="email" type="email" class="input" name="email" @focus="setActive">
            </div>
            <div class="half-width inputContainer">

              <label for="phone">phone</label>
              <input id="phone" type="number" class="input" name="phone" @focus="setActive">
            </div>
            <div class="full-width inputContainer">

              <label for="eductation">Educational Background</label>
              <input id="education" type="eductation" class="input" name="education" @focus="setActive">
            </div>
            <div class="full-width inputContainer">

              <label for="how-hear">How did you hear about us?</label>
              <input id="how-hear" type="how-hear" class="input" name="how_hear" @focus="setActive" >
            </div>
            <div class="full-width computer inputContainer">

              <label for="computer">I have a computer</label>
              <select id="computer" name="computer" class="input" @focus="setActive">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
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
            const fields = {};
            Object.values(e.target.elements).forEach(
                input => (fields[input.name] = input.value)
      ); // eslint-disable-line
      let req = await axios.post(process.env.lambdaUrl + "apply", fields); // eslint-disable-line

            // TODO: redirect to application success route
            // TODO: try/catch for application POST failure
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
            font-size: 52px;
            line-height: 60px;
            display: inline-block;
            @include breakpoint("mobile_landscape") {
                margin: $base-vertical-rithm * 5;
                font-size: 32px;
                line-height: 40px;
            }
        }
        &-image {
            width: 55%;
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
            margin-bottom: $base-vertical-rithm * 5;
        }
        h2 {
            color: $color-purple;
        }
        ul li {
            list-style: disc;
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
}
</style>
