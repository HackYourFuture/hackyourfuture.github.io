<template>
  <div>
    <Main class="Teach container">
      <div class="Teach__header">
        <div class="Teach__header-image">
          <img src="/gallery/26.jpg">
        </div>
        <h1>What we teach</h1>
      </div>
      
      <div class="Teach__container what">
        <div class="links">
          <nuxt-link :to="'/'">Check-out our<br> <span class="underline">curriculum</span></nuxt-link>
          <nuxt-link :to="'/chapters'">Setup your <br><span class="underline">chapter</span></nuxt-link>
        </div>
        <div v-html="what_we_teach"/>
      </div>
    
      <div class="Teach__container who">
        <div v-html="who_are_our_teachers"/>
        <div class="Teach__container-image">
          <img src="/gallery/13.jpg">
        </div>
      </div>

      <div class="Teach__container teach">
        <div class="Teach__container-image">
          <img src="/gallery/10.jpg">
        </div>
        <div v-html="what_it_means_to_teach"/>
         
      </div>
        
      <div class="Teach__form form">
        <h1>Join our teacher team</h1>
          
        <form @submit.prevent="submitForm">
          <fieldset>
            <div class="half-width inputContainer">
              <label for="firstName">Fist Name</label>
              <input id="firstName" type="text" name="firstName" required @focus="setActive">
            </div>
            <div class="half-width inputContainer">
              <label for="lastName">Last Name</label>
              <input id="lastName" type="text" name="lastName" required @focus="setActive">
            </div>
            <div class="half-width inputContainer">
              
              <select id="country" name="country" @focus="setActive">
                <option value="nl">The Netherlands</option>
              </select>
            </div>
            <div class="half-width inputContainer">
              
              <label for="email">e-mail</label>
              <input id="email" type="email" name="email" required @focus="setActive">
            </div>
            <div class="full-width inputContainer">
            
              <label for="message">Please tell us something about yourself</label>
              <input id="message" type="message" name="message" pattern=".{10,}" title="At least 10 characters" required @focus="setActive">
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
        let what_we_teach;
        let who_are_our_teachers;
        let what_it_means_to_teach;
        try {
            let req = await axios.get(
                "/content/en/teach/teach-what_we_teach.json"
            );
            let req1 = await axios.get(
                "/content/en/teach/teach-who_are_our_teachers.json"
            );
            let req2 = await axios.get(
                "/content/en/teach/teach-what_it_means_to_teach.json"
            );
            what_we_teach = req.data.body;
            who_are_our_teachers = req1.data.body;
            what_it_means_to_teach = req2.data.body;
        } catch (e) {
            console.log(e);
            what_we_teach = false;
            who_are_our_teachers = false;
            what_it_means_to_teach = false;
        }
        return {
            siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
            what_we_teach: what_we_teach ? what_we_teach : null,
            who_are_our_teachers: who_are_our_teachers
                ? who_are_our_teachers
                : null,
            what_it_means_to_teach: what_it_means_to_teach
                ? what_it_means_to_teach
                : null
        };
    },
    methods: {
        async submitForm(e) {
            const fields = {};
            Object.values(e.target.elements).forEach(
                input => (fields[input.name] = input.value)
            );

            try {
                await axios.post(`${process.env.lambdaUrl}teach`, fields);
                this.applied.success = true;
                this.applied.tried = true;
                this.$el
                    .querySelectorAll(".inputContainer")
                    .forEach((i, index) => {
                        if (index !== 2) {
                            i.childNodes[1].value = "";
                            i.classList.remove("active");
                        }
                    });
            } catch (error) {
                if (error.response.data.message) {
                    this.failedMessage = error.response.data.message;
                }
                this.applied.success = false;
                this.applied.tried = true;
            }
        },

        setActive(e) {
            this.$el.querySelectorAll(".inputContainer").forEach((i, index) => {
                if (index !== 2 && i.childNodes[1].value.length === 0) {
                    i.classList.remove("active");
                }
            });
            e.target.parentNode.classList.add("active");
        }
    }
};
</script>

<style lang="scss">
.Teach {
    &__header {
        padding: $base-vertical-rithm * 10;
        @include breakpoint("mobile_landscape") {
            padding: 0;
        }
        h1 {
            margin: $base-vertical-rithm * 15 $base-vertical-rithm * 10
                $base-vertical-rithm * 2;
            width: 30%;
            color: $color-purple;
            font-weight: bold;
            font-size: 60px;
            line-height: 1.25em;
            display: inline-block;
            @include breakpoint("mobile_landscape") {
                width: 100%;
                margin: $base-vertical-rithm * 8;
                font-size: 32px;
                line-height: 40px;
            }
        }
        &-image {
            width: 60%;
            display: inline-block;
            vertical-align: top;
            @include breakpoint("mobile_landscape") {
                width: 100%;
            }
        }
    }

    &__container {
        margin: 0 $base-vertical-rithm * 10;
        @include breakpoint("mobile_landscape") {
            margin: 0;
        }
        h1 {
            margin-bottom: $base-vertical-rithm * 2;
            color: $color-purple;
            font-weight: normal;
            font-size: 42px;
            line-height: 50px;
            @include breakpoint("mobile_landscape") {
                font-size: 24px;
                line-height: 24px;
            }
        }
        & > div {
            display: inline-block;
            width: calc(50% - 100px);
            vertical-align: top;
            margin: 50px;
            @include breakpoint("mobile_landscape") {
                width: calc(100% - 80px);
                margin: 40px;
            }
            a {
                color: $color-purple;
                font-weight: bold;
                font-size: 32px;
                line-height: 40px;
                margin-bottom: 40px;
                display: block;
                span:after {
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
            margin-left: 0%;
            .Teach__container-image {
                margin-left: 0;
            }
        }
        &.who {
            margin-right: -100px;
            @include breakpoint("mobile_landscape") {
                margin-right: 0;
            }
            .Teach__container-image {
                margin-right: 0;
                @include breakpoint("mobile_landscape") {
                    width: 100%;
                    margin: 0;
                }
            }
        }
        &.teach {
            margin-left: -50px;
            @include breakpoint("mobile_landscape") {
                margin-left: 0;
            }
            .Teach__container-image {
                margin-left: 0;
                @include breakpoint("mobile_landscape") {
                    width: 100%;
                }
            }
        }

        .links {
            margin-left: $base-vertical-rithm * 10;
            width: 25%;
            display: inline-block;
            @include breakpoint("mobile_landscape") {
                width: 100%;
                margin-bottom: 0;
                margin-top: 0;
            }
            a {
                color: black;
                display: block;
                margin-top: 40px;
                font-weight: bold;
                font-size: 18px;
                .underline:after {
                    bottom: -5px;
                }
                &:nth-child(1) {
                    margin-top: 0;
                }
            }
        }
    }

    &__form {
        margin-top: $base-vertical-rithm * 10;
        width: 70%;
        margin-left: 15%;
        position: relative;
        @include breakpoint("mobile_landscape") {
            width: 100%;
            margin-left: 0;
        }
        h1 {
            margin-left: 50px;
            color: $color-purple;
            font-weight: bold;
            font-size: 36px;
            width: 40%;
            line-height: 36px;
            @include breakpoint("mobile_landscape") {
                width: calc(100% - 80px);
                margin: 40px;
                font-size: 32px;
                line-height: 40px;
            }
        }
    }
    .Teach__form {
        position: relative;
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
