<template>
  <div>
    <label ref="label">{{ label }}</label>
    <div v-if="errorMessage" class="error" v-html="errorMessage"/>
    <input ref="input" :name="name" type="text" @keyup="onKeyUp">
  </div>
</template>

<script>
export default {
    props: {
        label: String,
        name: String,
        validate: String
    },

    data() {
        return {
            errorMessage: "",
            valid: true
        };
    },

    methods: {
        check() {
            if (this.validate) {
                const errors = this.validate(this.$refs.input.value);
                this.errorMessage = errors.join("<br/>");
                this.valid = errors.length === 0;
            }

            return this.valid;
        },

        onKeyUp() {
            this.check();
        },

        serialize() {
            return {
                key: this.$refs.input.name,
                value: this.$refs.input.value
            };
        }
    }
};
</script>
