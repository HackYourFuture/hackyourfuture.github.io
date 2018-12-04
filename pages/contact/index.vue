<template>
  <div>
    <main class="contact container">
      <div class="contact__header">
        <h1>Contact</h1>
      </div>
      <a href="#contactForm" class="contact__quicklink">Contact
        <br>
        <span class="underline">Form</span>
        <br>
        <img src="/icons/arrow-down.svg">
      </a>
      <h2>Frequently Asked Questions</h2>
      <div class="contact__content" v-html="content"/>
      <div id="contactForm" class="contact__form form">
        <h1>Reach us for any other questions</h1>
        <p>General Inquiries</p>
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
                    .isLength({
                        min: 2,
                        max: 100
                    })
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
                    .isLength({
                        min: 2,
                        max: 100
                    })
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
                {
                    id: 1,
                    value: "nl",
                    label: "The Netherlands"
                },
                {
                    id: 2,
                    value: "dk",
                    label: "Denmark"
                },
                {
                    id: 3,
                    value: "se",
                    label: "Sweden"
                }
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
            label: "Phone",
            name: "phone",
            validate: value => new FieldError(value).isMobilePhone().errors
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
        className: "full-width",
        props: {
            label: "What would you like to contact us about? *",
            name: "about",
            validate: value =>
                new FieldError(value)
                    .isLength({
                        min: 2,
                        max: 200
                    })
                    .isAlpha()
                    .isRequired().errors
        }
    },
    {
        type: "input-button",
        props: {
            buttonLabel: "Contact"
        }
    }
];
export default {
    components: {
        FormComponent
    },
    data: () => {
        return {
            action: `${process.env.lambdaUrl}contact`,
            inputs
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
            content: content ? content : null
        };
    }
};
</script><style lang="scss">
.contact {
    position: relative;
    &__header {
        padding: $base-vertical-rithm * 10;
        @include breakpoint("ipad_landscape") {
            //display: inline-block;
        }
        @include breakpoint("ipad_portrait") {
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
            @include breakpoint("ipad_portrait") {
                margin-left: 0;
                font-size: 32px;
                line-height: 40px;
                width: 100%;
                margin: 0;
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
        font-size: 24px;
        display: inline-block;
        line-height: 1.2em;
        color: black;
        span:after {
            bottom: -5px;
        }
        @include breakpoint("ipad_portrait") {
            left: -60px;
            top: 60px;
        }
        @include breakpoint("mobile_landscape") {
            font-size: 18px;
            right: -40px;
            top: 25px;
            left: auto;
        }
        img {
            width: 20px;
            height: 20px;
            position: relative;
            margin: $base-vertical-rithm * 3;
            animation: bounce 1.5s infinite ease;
        }
        @keyframes bounce {
            0% {
                transform: scale(1, 1) translateY(0px);
            }
            10% {
                transform: scale(1.1, 0.9);
            }
            40% {
                transform: scale(0.9, 1.1) translateY(15px);
            }
            60% {
                transform: scale(1, 1) translateY(0px);
            }
            100% {
                transform: scale(1, 1) translateY(0px);
            }
        }
    }

    &__content,
    h2 {
        margin: $base-vertical-rithm * 5 auto;
        width: 60%;
        margin-left: 30%;
        @include breakpoint("ipad_portrait") {
            width: 80%;
            margin: 0 auto;
        }
        h4 {
            font-weight: bold;
            color: $color-purple;
        }
    }
    h2 {
        @include breakpoint("ipad_portrait") {
            margin: $base-vertical-rithm * 5 auto;
        }
    }
    &__form {
        padding-top: $base-vertical-rithm * 10;
        width: 70%;
        margin-left: 15%;
        position: relative;
        @include breakpoint("ipad_portrait") {
            width: 80%;
            margin: $base-vertical-rithm * 10 auto;
        }

        p,
        h1 {
            margin-left: 50px;
            color: $color-purple;
            @include breakpoint("ipad_portrait") {
                margin: 0;
            }
        }
        h1 {
            font-weight: bold;
            font-size: 36px;
            width: 40%;
            line-height: 36px;
            @include breakpoint("ipad_portrait") {
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
    .contact__form {
        position: relative;
    }
}
</style>
