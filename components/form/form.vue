<template>
  <form ref="form" @submit="e => onSubmit(e)">
    <div
      v-for="(input, key) in inputs"
      ref="input"
      :key="key"
      :is="input.type"
      v-bind="input.props || {}"
      :class="formRowClasses(input)"
    />
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
    "input-file": InputFile
};
export default {
    components,
    props: ["inputs", "action"],
    mounted() {
        Object.keys(components).forEach(componentName => {
            const component = components[componentName];
            if (!component.methods || component.methods.check === undefined) {
                console.warn(
                    `$ {
                    ` +
                        componentName +
                        `
                }
                doesn't implement check method, do you need validation?`
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
            const formElements = Array.from(
                this.$refs.form.querySelectorAll(allInputTypes)
            );
            return formElements.reduce((formArray, element) => {
                const obj = {};
                const tag = element.tagName.toLowerCase();
                const type = element.getAttribute("type");
                const name = element.getAttribute("name");
                const isCheckable = type === "checkbox" || type === "radio";
                const isCheckedInput =
                    tag === "input" && isCheckable && element.checked;
                switch (true) {
                    case isCheckedInput:
                        obj[name] = element.value;
                        break;
                    case tag === "textarea":
                        obj[name] = element.innerText;
                        break;
                    default:
                        if (!isCheckable) {
                            obj[name] = element.value;
                        }
                }
                if (Object.keys(obj).length > 0) {
                    formArray.push(obj);
                }
                return formArray;
            }, []);
        },
        async onSubmit(e) {
            e.preventDefault();
            if (this.isValid() === false) {
                return;
            }
            const { data } = await axios.post(this.action, this.formData());
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
.form {
    .half-width,
    .full-width {
        display: inline-block;
        position: relative;
        border-bottom: 2px solid $color-purple;
        margin: 25px 50px;
        vertical-align: top;
        @include breakpoint("ipad_portrait") {
            margin: 20px 20px;
        }
    }
    .half-width {
        width: calc(50% - 100px);
        @include breakpoint("ipad_portrait") {
            width: calc(100% - 40px);
        }
    }
    .full-width {
        width: calc(100% - 100px);
        @include breakpoint("ipad_portrait") {
            width: calc(100% - 40px);
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
