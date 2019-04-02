<template>
  <form ref="form" :action="action" @submit="e => onSubmit(e)">
    <div v-if="error" ref="error" style="margin: 40px 0;">
      <p>{{ error }}</p>
    </div>
    <div :class="{ fadeOutForm: success }">
      <div
        v-for="(input, key) in inputs"
        ref="input"
        :key="key"
        :is="input.type"
        v-bind="input.props || {}"
        :class="formRowClasses(input)"
      />
    </div>
    <div :class="{ fadeInMSG: success }" style="opacity: 0">
      <p class="fadeInMSG">{{ message }}</p>
    </div>
  </form>
</template>
<script>
import axios from "axios";
import InputText from "~/components/form/inputs/text";
import InputTextArea from "~/components/form/inputs/textarea";
import InputDrop from "~/components/form/inputs/drop";
import InputRadio from "~/components/form/inputs/radio";
import InputButton from "~/components/form/inputs/button";
import InputFile from "~/components/form/inputs/file";
import InputHidden from "~/components/form/inputs/hidden";
const allInputTypes = [
    "select",
    "input[type='search']",
    "input[type='email']",
    "input[type='text']",
    "input[type='radio']",
    "input[type='checkbox']",
    "textarea"
].join(",");
const components = {
    "input-text": InputText,
    "input-textarea": InputTextArea,
    "input-drop": InputDrop,
    "input-radio": InputRadio,
    "input-button": InputButton,
    "input-file": InputFile,
    "input-hidden": InputHidden
};
export default {
    components,
    props: { inputs: Array, action: String },
    data() {
        return {
            error: "",
            success: false,
            message: ""
        };
    },
    mounted() {
        Object.keys(components).forEach(componentName => {
            const component = components[componentName];
            if (!component.methods || component.methods.check === undefined) {
                console.warn(
                    `${componentName} doesn't implement check method, do you need validation?`
                );
            }
        });
        this.$el.addEventListener("focus", e => this.setActive(e), true);
    },
    methods: {
        isValid() {
            const validateFields = this.$refs.input.map(
                component => (component.check ? component.check() : true)
            );
            return (
                validateFields.filter(checked => checked !== true).length === 0
            );
        },

        serialize() {
            return {};
        },

        formRowClasses(input) {
            let classList = ["form-row", input.type];

            if (Array.isArray(input.className)) {
                classList.concat(input.classList);
            } else {
                classList.push(input.className);
            }

            return classList;
        },

        formData() {
            const data = new FormData(this.$refs.form);
            return new URLSearchParams(data);
        },

        async onSubmit(e) {
            e.preventDefault();
            if (this.isValid() === false) {
                return;
            }

            const config = {
                method: "post",
                url: this.action,
                data: this.formData(),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };

            try {
                const { data } = await axios(config);
                this.showSuccessMessage(data);
            } catch (error) {
                const { data } = error.response;
                this.error = data.error;
                this.scrollToError();
            }
        },

        scrollToError() {
            const { form } = this.$refs;
            const top = form.getBoundingClientRect().top + window.scrollY - 100;
            window.scroll({
                top,
                behavior: "smooth"
            });
        },

        showSuccessMessage(data) {
            const { message } = data;
            this.success = true;
            this.error = "";
            this.message = `${message}!`;
        },

        setActive(e) {
            let { parentNode } = e.target;
            while (!parentNode.classList.contains("form-row")) {
                parentNode = parentNode.parentNode;
            }
            parentNode.classList.add("active");
        }
    }
};
</script>

<style lang="scss">
.fadeOutForm {
    opacity: 0;
    display: none;
    -webkit-transition: all 1000ms linear;
    transition: all 1000ms linear;
}

.fadeInMSG {
    opacity: 1 !important;
    -webkit-transition: opacity 2000ms linear;
    transition: opacity 2000ms linear;
    width: 60vw;
    p {
        margin-top: 25px;
        margin-left: 50px;
    }
}

.form {
    .half-width,
    .full-width {
        display: inline-block;
        position: relative;
        border-bottom: 2px solid $color-purple;
        margin: 25px 50px;
        vertical-align: top;
        @include breakpoint("mobile_portrait") {
            margin: 20px 20px;
        }
    }
    .half-width {
        width: calc(50% - 100px);
        @include breakpoint("mobile_portrait") {
            width: calc(100% - 40px);
        }
    }
    .full-width {
        width: calc(100% - 100px);
        @include breakpoint("mobile_portrait") {
            width: calc(100% - 40px);
            padding-bottom: 15px;
        }
    }
}

.form {
    .half-width.input-textarea,
    .full-width.input-textarea,
    .half-width.input-file,
    .full-width.input-file {
        border-bottom: none;
    }
}

textarea {
    background: white;
    border: none;
    border-bottom: 2px solid $color-purple;
    box-sizing: border-box;
    width: 100%;
}

textarea:focus {
    outline: none;
}

input {
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    background: transparent;
}

select {
    border: none;
    background: transparent;
    display: block;
    margin: 10px 10px 10px 5px;
    font-size: 24px;
    color: $color-purple;
    width: 100%;
}

select:focus {
    outline: 0;
}

.error {
    border-bottom: 2px solid yellow;
    position: absolute;
    top: -10px;
    right: 0px;
    font-size: 16px;
}

.computer select {
    width: 25%;
    float: right;
    margin: 8px 0px;
}

.apply-btn {
    width: 200px;
    margin: 0 auto;
    margin-top: 5 * $base-vertical-rithm;
}

.apply-btn input {
    appearance: none;
    width: 100%;
    background-color: $color-purple;
    color: #fff;
    font-weight: bold;
    font-size: 24px;
    text-transform: uppercase;
    border: 0;
    cursor: pointer;
    position: relative;
}

input:focus {
    outline: none;
}

label {
    color: $color-purple;
    font-size: 24px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
    @include breakpoint("ipad_portrait") {
        font-size: 18px;
    }
}

.input-textarea label {
    top: -10px;
}

.form-row.active:not(.input-radio) label {
    top: -20px;
    font-size: 14px;
    color: $color-purple;
}
</style>
