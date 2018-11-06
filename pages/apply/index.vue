<template>
  <div>
    <Main class="apply container">
      <div class="apply__header">
        <h1>Join
          <br>Us!
        </h1>
        <div class="apply__header-image">
          <img src="/gallery/11.jpg" alt="Group of students working in class.">
        </div>
        <div class="apply__header-dates" v-html="dates"/>
      </div>
      <div class="apply__content" v-html="content"/>
      <div ref="apply__form" class="apply__form form">
        <h2>apply for our next class:</h2>
        <formComponent :action="`${lambdaUrl}apply`" :inputs="inputs"/>
      </div>
    </Main>
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
        type: "input-text",
        className: "half-width",
        props: {
            label: "City *",
            name: "city",
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
        className: "half-width",
        props: {
            label: "Phone *",
            name: "phone",
            validate: value =>
                new fieldError(value).isMobilePhone().isRequired().errors
        }
    },
    {
        type: "input-text",
        className: "full-width",
        props: {
            label: "Educational Background *",
            name: "education",
            validate: value =>
                new fieldError(value)
                    .isLength({ min: 2, max: 100 })
                    .isAlpha()
                    .isRequired().errors
        }
    },
    {
        type: "input-radio",
        className: "full-width",
        props: {
            label: "Do you have a computer? *",
            name: "computer",
            options: [
                { label: "yes", value: "yes" },
                { label: "no", value: "no" }
            ],
            validate: value => new fieldError(value).isRequired().errors
        }
    },
    {
        type: "input-text",
        className: "full-width",
        props: {
            label: "How did you hear about us? *",
            name: "how_hear",
            validate: value =>
                new fieldError(value)
                    .isLength({ min: 2, max: 200 })
                    .isAlpha()
                    .isRequired().errors
        }
    },
    {
        type: "input-text",
        className: "full-width",
        props: {
            label: "Something else you would like to notify us about?",
            name: "note",
            validate: value =>
                new fieldError(value).isLength({ min: 0, max: 200 }).isAlpha()
                    .errors
        }
    },
    {
        type: "input-button",
        props: {
            buttonLabel: "Apply"
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
            dates: dates ? dates : null,
            content: content ? content : null
        };
    }
};
</script>

<style lang="scss">
.apply {
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
            width: 65%;
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
        margin: 0 auto;
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
