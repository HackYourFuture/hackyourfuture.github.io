<template>
  <div>
    <main class="teaserPage container">
      <div class="teaserPage__header">
        <h1>Women Coding Teaser</h1>
        <div class="teaserPage__header-image">
          <img src="/gallery/21.jpg" alt="Group of women who get their first coding class.">
        </div>
      </div>
      <div class="teaserPage__content">
        <div class="teaserPage__content-dates" v-html="teaser_dates"/>
        <div class="teaserPage__content-about" v-html="teaser_about"/>
      </div>
      <div ref="teaserPage__form" class="teaserPage__form form">
        <h2>Apply for our next teaser day:</h2>
        <formComponent :action="action" :inputs="inputs"/>
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
            label: "Do you have programming experience? *",
            name: "experience",
            options: [
                { label: "yes", value: "yes" },
                { label: "no", value: "no" }
            ],
            validate: value => new FieldError(value).isRequired().errors
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
            name: "hear",
            validate: value =>
                new FieldError(value)
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
                new FieldError(value).isLength({ min: 0, max: 200 }).isAlpha()
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
        FormComponent
    },
    data: () => {
        return {
            action: `${process.env.lambdaUrl}apply/teaser`,
            inputs
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
            teaser_dates: teaser_dates ? teaser_dates : null,
            teaser_about: teaser_about ? teaser_about : null
        };
    }
};
</script>

<style lang="scss">
.teaserPage {
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
            width: 25%;
            font-weight: bold;
            font-size: 60px;
            line-height: 1.25em;
            display: inline-block;
            @include breakpoint("mobile_landscape") {
                width: 100%;
                font-size: 32px;
                line-height: 40px;
                margin: $base-vertical-rithm * 5;
                margin-top: $base-vertical-rithm * 10;
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
    &__content {
        &-links a {
            font-size: 18px;
        }
        &-dates {
            margin: $base-vertical-rithm * 15;
            width: 90%;
            display: flex;
            flex-wrap: wrap;
            vertical-align: top;
            align-content: space-between;
            @include breakpoint("mobile_landscape") {
                margin: 0 auto;
            }
            div {
                display: inline-block;
                width: calc(25% - 20px);
                vertical-align: top;
                @include breakpoint("mobile_landscape") {
                    width: calc(50% - 10px);
                    margin: $base-vertical-rithm * 5 auto 0;
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
                margin-bottom: $base-vertical-rithm * 5;
            }
        }
    }
    &__form {
        position: relative;
        width: 75%;
        margin: 0 auto;
        padding: $base-vertical-rithm * 15;
        @include breakpoint("mobile_landscape") {
            width: 100%;
            padding: $base-vertical-rithm * 2;
            margin: 0;
        }
        h2 {
            font-weight: bold;
        }
    }
}
</style>
