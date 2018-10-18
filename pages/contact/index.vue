<template>
  <div>
    <Main class="Contact container">
      <div class="Contact__header">
        <h1>Frequently Asked Questions</h1>
      </div>
      <nuxt-link :to="'/'" class="Contact__quicklink">Take me<br> to <span class="underline">contact</span></nuxt-link>
      <div class="Contact__content" v-html="content"/>
      <div class="Contact__form form">
        <h1>Reach us for any other questions</h1>
        <p>General Inquiries</p>
        <form @submit.prevent="submitForm">
          <fieldset>
            <div class="half-width inputContainer">
              <label for="firstName">Fist Name *</label>
              <input id="firstName" type="text" name="firstName" @focus="setActive">
              <div class="invalid-feedback">This field is required.</div>
            </div>
            <div class="half-width inputContainer">
              <label for="lastName">Last Name *</label>
              <input id="lastName" type="text" name="lastName" @focus="setActive">
            </div>
            <div class="half-width inputContainer">
              <label for="phone">Phone</label>
              <input id="phone" type="number" name="phone" @focus="setActive">
            </div>
            <div class="half-width inputContainer">
              <label class="active label" for="country">Chapter *</label>
              <select id="country" name="country" class="input" @focus="setActive">
                <option value="nl">The Netherlands</option>
                <option value="dk">Denmark</option>
                <option value="se">Sweden</option>
              </select>
            </div>
            <div class="half-width inputContainer">
              <label for="email">E-mail *</label>
              <input id="email" type="email" name="email" @focus="setActive">
            </div>
            <div class="full-width inputContainer">
              <label for="message">What would you like to contact us about? *</label>
              <input id="message" type="message" name="message" @focus="setActive">
            </div>
            <div class="apply-btn">
              <input type="submit" value="Contact">
            </div>
          </fieldset>
        </form>
        <div v-if="contacted.tried" class="blur-screen"> 
          <div class="contacted-popup">
            <p>{{ contacted.success ? successMessage : failedMessage }}</p>
            <button @click="contacted.tried = false; contacted.success = false">Close</button>
          </div>
        </div>
      </div>
    </Main>
  </div>
</template>

<script>
import axios from "~/plugins/axios";

export default {
    components: {},
    data: () => {
        return {
            successMessage:
                "Thank you for contacting us, we will get back to you as soon as possible",
            failedMessage: "Sorry something went wrong, please try again.",
            contacted: { tried: false, success: false }
        };
    },
    async asyncData() {
        let content;
        try {
            let req = await axios.get(
                "/content/en/contact/contact-questions.json"
            );
            content = req.data.body;
        } catch (e) {
            console.log(e);
            content = false;
        }
        return {
            siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
            content: content ? content : null
        };
    },
    methods: {
        async submitForm(e) {
            const fields = {};
            Object.values(e.target.elements).forEach(
                input => (fields[input.name] = input.value)
            );
            try {
                await axios.post(`${process.env.lambdaUrl}contact-us`, fields);
                this.contacted.success = true;
                this.contacted.tried = true;
                this.$el
                    .querySelectorAll(".inputContainer")
                    .forEach((i, index) => {
                        if (index !== 3) {
                            i.childNodes[1].value = "";
                            i.classList.remove("active");
                        }
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
                this.contacted.success = false;
                this.contacted.tried = true;
            }
        },
        setActive(e) {
            this.$el.querySelectorAll(".inputContainer").forEach((i, index) => {
                if (index !== 3 && i.childNodes[1].value.length === 0) {
                    i.classList.remove("active");
                }
            });
            e.target.parentNode.classList.add("active");
        }
    }
};
</script>

<style lang="scss">
.Contact {
    position: relative;
    &__header {
        padding: $base-vertical-rithm * 10;
        @include breakpoint("mobile_landscape") {
            padding: $base-vertical-rithm * 8;
        }
        h1 {
            margin: $base-vertical-rithm * 10;
            margin-bottom: $base-vertical-rithm * 2;
            width: 30%;
            color: $color-purple;
            font-weight: bold;
            font-size: 60px;
            line-height: 1.25em;
            display: inline-block;
            @include breakpoint("mobile_landscape") {
                margin-left: 0;
                font-size: 32px;
                line-height: 40px;
            }
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
        color: black;
        span:after {
            bottom: -5px;
        }
        @include breakpoint("mobile_landscape") {
            position: relative;
            margin: 0;
        }
    }
    &__content {
        width: 50%;
        margin-left: 40%;
        @include breakpoint("mobile_landscape") {
            width: 80%;
            margin: $base-vertical-rithm * 10 auto;
        }

        h4 {
            font-weight: bold;
            color: $color-purple;
        }
    }
    &__form {
        margin-top: $base-vertical-rithm * 10;
        width: 70%;
        margin-left: 15%;
        position: relative;
        @include breakpoint("mobile_landscape") {
            width: 80%;
            margin: $base-vertical-rithm * 10 auto;
        }
        p,
        h1 {
            margin-left: 50px;
            color: $color-purple;
            @include breakpoint("mobile_landscape") {
                margin: 0;
            }
        }
        h1 {
            font-weight: bold;
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

    .Contact__form {
        position: relative;
    }
    .blur-screen {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        min-height: 100%;
        background: rgba(0, 0, 0, 0.1);
        @include breakpoint("mobile_portrait") {
            background: rgba(0, 0, 0, 0);
        }
    }
    .contacted-popup {
        z-index: 2;
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 50%;
        top: 50%;
        font-size: 20px;
        width: 450px;
        height: 220px;
        margin-top: -150px;
        margin-left: -210px;
        border: 2px solid rgb(219, 213, 213);
        background-color: rgb(255, 255, 255);
        border-radius: 5px;
        -webkit-box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.21);
        -moz-box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.21);
        box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.21);
        animation: fadeIn 0.5s;
        @include breakpoint("mobile_portrait") {
            width: 260px;
            height: 200px;
            margin-top: 0;
            margin-left: -130px;
        }

        p {
            margin: 0;
            text-align: center;
            padding: 50px 10px 10px 10px;
            color: #293a7d;
            @include breakpoint("ipad_portrait") {
                padding-top: 25px;
            }
        }
        button {
            margin: auto;
            border: 2px solid rgb(219, 213, 213);
            background-color: rgb(255, 255, 255);
            border-radius: 5px;
            padding: 5px;
        }
    }
    @-webkit-keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
}
</style>
