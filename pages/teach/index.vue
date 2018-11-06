<template>
  <div>
    <main class="teach container">
      <div class="teach__header">
        <div class="teach__header-image">
          <img src="/gallery/26.jpg" alt="teacher in front on class of students.">
        </div>
        <h1>What we teach</h1>
      </div>
      <div class="teach__container what">
        <div class="links">
          <nuxt-link :to="'/'">Check-out our
            <br>
            <span class="underline">curriculum</span>
          </nuxt-link>
          <nuxt-link :to="'/chapters'">Setup your
            <br>
            <span class="underline">chapter</span>
          </nuxt-link>
        </div>
        <div v-html="what_we_teach"/>
      </div>
      <div class="teach__container who">
        <div v-html="who_are_our_teachers"/>
        <div class="teach__container-image">
          <img src="/gallery/13.jpg" alt="Student and teacher solving a problem behind computer.">
        </div>
      </div>
      <div class="teach__container teach">
        <div class="teach__container-image">
          <img src="/gallery/10.jpg" alt="teacher with project group.">
        </div>
        <div v-html="what_it_means_to_teach"/>
      </div>
      <div class="teach__form form">
        <h1>Join our teacher team</h1>
        <formComponent :action="`${lambdaUrl}teach`" :inputs="inputs"/>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import formComponent from "~/components/form/form";
import fieldError from "~/components/form/helpers/fieldError";

const inputs = [
    {
        type: "input-text",
        className: "half-width",
        props: {
            label: "First Name *",
            name: "firstName",
            validate: value =>
                new fieldError(value)
                    .isLength({ min: 2, max: 100 })
                    .isAlpha()
                    .isRequired().errors
        }
    },
    {
        type: "input-text",
        className: "half-width",
        props: {
            label: "Last Name *",
            name: "lastName",
            validate: value =>
                new fieldError(value)
                    .isLength({ min: 2, max: 100 })
                    .isAlpha()
                    .isRequired().errors
        }
    },
    {
        type: "input-drop",
        className: "half-width",
        props: {
            label: "Country *",
            name: "country",
            options: [
                { id: 1, value: "nl", label: "The Netherlands" },
                { id: 2, value: "dk", label: "Denmark" },
                { id: 3, value: "se", label: "Sweden" }
            ],
            validate: value => {
                console.log(value);
                return new fieldError(value).isRequired().errors;
            }
        }
    },
    {
        type: "input-text",
        className: "half-width",
        props: {
            label: "E-mail *",
            name: "email",
            validate: value =>
                new fieldError(value).isEmail().isRequired().errors
        }
    },
    {
        type: "input-text",
        className: "full-width",
        props: {
            label: "Please tell us something about yourself *",
            name: "note",
            validate: value =>
                new fieldError(value)
                    .isLength({ min: 2, max: 200 })
                    .isAlpha()
                    .isRequired().errors
        }
    },
    {
        type: "input-button",
        props: {
            buttonLabel: "Join us"
        }
    }
];

export default {
    components: {
        formComponent
    },
    data: () => {
        return {
            lambdaUrl: process.env.lambdaUrl,
            inputs
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
            what_we_teach: what_we_teach ? what_we_teach : null,
            who_are_our_teachers: who_are_our_teachers
                ? who_are_our_teachers
                : null,
            what_it_means_to_teach: what_it_means_to_teach
                ? what_it_means_to_teach
                : null
        };
    }
};
</script>

<style lang="scss">
.teach {
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
            width: 55%;
            display: inline-block;
            vertical-align: top;
        }
        &.what {
            margin-left: 0%;
            .teach__container-image {
                margin-left: 0;
            }
        }
        &.who {
            margin-right: -100px;
            @include breakpoint("mobile_landscape") {
                margin-right: 0;
            }
            .teach__container-image {
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
            .teach__container-image {
                margin-left: 0;
                @include breakpoint("mobile_landscape") {
                    width: 100%;
                }
            }
        }

        .links {
            margin-left: $base-vertical-rithm * 10;
            width: 20%;
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
}
</style>
