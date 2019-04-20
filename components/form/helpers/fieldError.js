import validator from "validator";

export default class FieldError {
    constructor(value) {
        this.errors = [];
        this.value = value;
    }

    isRequired(options) {
        if (validator.isEmpty(this.value, options)) {
            this.errors = ["This field is required!"];
        }

        return this;
    }

    isURL(options) {
        if (!validator.isURL(this.value, options)) {
            this.errors.push("Please provide a valid url");
        }
        return this;
    }

    isLength({ min, max }) {
        if (!validator.isLength(this.value, { min })) {
            this.errors.push("Is too short");
        }
        if (!validator.isLength(this.value, { max })) {
            this.errors.push("Is too long");
        }

        return this;
    }

    isAlpha(options) {
        if (this.value === "") return this;

        if (!validator.isAlpha(this.value, options)) {
            this.errors.push("just letters please");
        }

        return this;
    }

    isEmail(options) {
        if (!validator.isEmail(this.value, options)) {
            this.errors.push("Invalid email");
        }
        return this;
    }

    isMobilePhone(options) {
        if (!validator.isMobilePhone(this.value, options)) {
            this.errors.push("Invalid number");
        }
        return this;
    }
}
