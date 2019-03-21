<template>
  <div>
    <main class="apply_page container">
      <div class="apply_page__header">
        <h1>Join
          <br>Us!
        </h1>
        <div class="apply_page__header-image">
          <img src="/gallery/11.jpg" alt="Group of students working in class.">
        </div>
        <div class="apply_page__header-dates" v-html="dates"/>
      </div>
      <div class="apply_page__content" v-html="content"/>
      <div id="apply_form_ams" ref="apply_page__form" class="apply_page__form form">
        <h3>Apply for our next Amsterdam class:</h3>
        <FormComponent :action="action" :inputs="inputs"/>
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
        type: "input-text",
        className: "half-width",
        props: {
            label: "City of residence *",
            name: "city",
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
            validate: value =>
                new FieldError(value).isEmail().isRequired().errors
        }
    },
    {
        type: "input-text",
        className: "half-width",
        props: {
            label: "Phone *",
            name: "phone",
            validate: value =>
                new FieldError(value).isMobilePhone().isRequired().errors
        }
    },
    {
        type: "input-text",
        className: "full-width",
        props: {
            label: "Educational Background *",
            name: "education",
            validate: value =>
                new FieldError(value)
                    .isLength({ min: 2, max: 100 })
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
            validate: value => new FieldError(value).isRequired().errors
        }
    },
    {
        type: "input-text",
        className: "full-width",
        props: {
            label: "How did you hear about us? *",
            name: "how_hear",
            validate: value =>
                new FieldError(value)
                    .isLength({ min: 2, max: 200 })
                    .isRequired().errors
        }
    },
    {
        type: "input-textarea",
        className: "full-width",
        props: {
            label: "Something else you would like to notify us about?",
            name: "note",
            validate: value =>
                new FieldError(value).isLength({ min: 0, max: 200 }).errors
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
        FormComponent
    },
    data: () => {
        return {
            action: `${process.env.lambdaUrl}apply`,
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
html {
    scroll-behavior: smooth;
}
.apply_page {
    .applyBtn {
        text-align: center;
        background-color: #293a7d;
        padding: 1em;
        color: white !important;
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
            font-size: 60px;
            line-height: 1.25em;
            font-weight: bold;
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
            width: 90%;
            margin: $base-vertical-rithm * 15 auto $base-vertical-rithm * 2;
            justify-content: space-evenly;
            display: flex;
            vertical-align: top;
            flex-wrap: wrap;
            @include breakpoint("mobile_landscape") {
                width: 100%;
                margin: 10px 0;
            }
            div {
                display: inline-block;
                width: calc(25% - 20px);
                margin: 10px;

                @include breakpoint("mobile_landscape") {
                    width: calc(45% - 20px);
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
        h2 {
            margin: 0 $base-vertical-rithm * 10 $base-vertical-rithm * 10;
            @include breakpoint("mobile_landscape") {
                margin: 0 auto;
            }
        }
        ul li {
            list-style: disc;
            margin: 5px;
        }
        ul + p {
            margin-top: 1rem;
        }
        h3 {
            font-weight: bold;
            color: $color-purple;
            font-size: 36px;
            width: 40%;
            line-height: 36px;
            @include breakpoint("mobile_landscape") {
                font-size: 32px;
                line-height: 40px;
                width: calc(100% - 60px);
                margin: 30px;
                margin-left: 0;
            }
        }
    }
    &__form {
        width: 75%;
        margin: 0 auto;
        padding: $base-vertical-rithm * 10;
        @include breakpoint("mobile_landscape") {
            width: 100%;
            padding: $base-vertical-rithm * 2;
            margin: 0;
        }
        p,
        h1 {
            margin-left: 50px;
            color: $color-purple;
        }
        h1 {
            width: 60%;
        }
        h3 {
            font-weight: bold;
            font-size: 36px;
            width: 40%;
            line-height: 36px;
            @include breakpoint("mobile_landscape") {
                font-size: 32px;
                line-height: 40px;
                width: calc(100% - 60px);
                margin: 30px;
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
