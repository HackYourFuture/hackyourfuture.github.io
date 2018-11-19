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
        <div class="teach__container what_teach">
          <div v-html="what_we_teach"/>
        </div>
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
        <FormComponent :action="`${lambdaUrl}teach`" :inputs="inputs"/>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import FormComponent from "~/components/form/form";
import FieldError from "~/components/form/helpers/fieldError";

const inputs = [
  {
    type: "input-text",
    className: "half-width",
    props: {
      label: "First Name *",
      name: "firstName",
      validate: value =>
        new FieldError(value)
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
        new FieldError(value)
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
        return new FieldError(value).isRequired().errors;
      }
    }
  },
  {
    type: "input-text",
    className: "half-width",
    props: {
      label: "E-mail *",
      name: "email",
      validate: value => new FieldError(value).isEmail().isRequired().errors
    }
  },
  {
    type: "input-text",
    className: "full-width",
    props: {
      label: "Please tell us something about yourself *",
      name: "note",
      validate: value =>
        new FieldError(value)
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
    FormComponent
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
      let req = await axios.get("/content/en/teach/teach-what_we_teach.json");
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
      who_are_our_teachers: who_are_our_teachers ? who_are_our_teachers : null,
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
    display: flex;
    @include breakpoint("mobile_landscape") {
      padding: 0;
      flex-wrap: wrap;
    }
    h1 {
      margin: $base-vertical-rithm * 15 $base-vertical-rithm * 10
        $base-vertical-rithm * 2;
      width: 30%;
      font-size: 60px;
      line-height: 1.25em;
      @include breakpoint("ipad_landscape") {
        margin: $base-vertical-rithm * 6;
      }
      @include breakpoint("mobile_landscape") {
        width: 100%;
        margin: $base-vertical-rithm * 8;
        font-size: 32px;
        line-height: 40px;
      }
    }
    &-image {
      width: 60%;
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
      font-weight: normal;
    }
    &.what {
      margin-left: 0%;
      margin-bottom: $base-vertical-rithm * 10;
      display: flex;
      .teach__container-image {
        margin-left: 0;
      }
      @include breakpoint("mobile_landscape") {
        margin-top: 0;
        flex-wrap: wrap;
      }
    }
    &.what_teach {
      width: 60%;
      margin: $base-vertical-rithm * 10;
      @include breakpoint("ipad_portrait") {
        margin-top: 0;
      }
      @include breakpoint("mobile_landscape") {
        margin: $base-vertical-rithm * 10;
        margin-bottom: $base-vertical-rithm * 5;
      }
    }
    &.who {
      margin-right: -100px;
      display: flex;
      & > div {
        width: calc(50% - 100px);
        margin: $base-vertical-rithm * 10;
        @include breakpoint("ipad_portrait") {
          width: auto;
          margin-top: $base-vertical-rithm * 5;
          margin-bottom: $base-vertical-rithm * 5;
        }
      }
      @include breakpoint("ipad_portrait") {
        margin: 0;
        flex-wrap: wrap;
      }
      @include breakpoint("mobile_landscape") {
        margin: $base-vertical-rithm * 10 0;
        margin-top: 0;
      }
      .teach__container-image {
        @include breakpoint("mobile_landscape") {
          margin: 0;
        }
      }
    }
    &.teach {
      margin-left: -50px;
      display: flex;
      & > div {
        margin: $base-vertical-rithm * 10;
        width: calc(50% - 100px);
        @include breakpoint("ipad_portrait") {
          width: auto;
          margin-bottom: $base-vertical-rithm * 5;
        }
      }
      @include breakpoint("ipad_portrait") {
        flex-wrap: wrap;
        margin-left: 0;
        margin-right: 0;
      }
      .teach__container-image {
        margin-left: 0;
        @include breakpoint("mobile_landscape") {
          width: 100%;
          margin: 0;
        }
      }
    }

    .links {
      margin: $base-vertical-rithm * 10;
      width: 20%;
      display: inline-block;
      @include breakpoint("mobile_landscape") {
        width: 90%;
        display: flex;
        margin: 0 auto;
        justify-content: space-around;
      }
      a {
        color: black;
        line-height: 40px;
        display: block;
        font-weight: bold;
        font-size: 18px;
        margin: 30px;
        .underline:after {
          bottom: -5px;
        }
        @include breakpoint("mobile_landscape") {
          margin-top: 0;
          margin-bottom: 0;
        }
        @include breakpoint("mobile_portrait") {
          width: max-content;
          margin: 0 auto;
        }

        // &:nth-child(1) {
        //   margin-top: 0;
        // }
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
      padding: $base-vertical-rithm * 2;
    }
    h1 {
      margin-left: 50px;
      color: $color-purple;
      font-weight: bold;
      font-size: 36px;
      width: 40%;
      line-height: 36px;
      @include breakpoint("mobile_landscape") {
        width: calc(100% - 60px);
        margin: 30px;
        font-size: 32px;
        line-height: 40px;
      }
    }
  }
}
</style>
