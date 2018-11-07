<template>
  <div>
    <label>{{ label }}</label>
    <div v-if="errorMessage" class="error" v-html="errorMessage"/>
    <select ref="input" :name="name">
      <option :value="null" disabled selected/>
      <option v-for="(option, key) in options" :key="key" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>
<script>
export default {
    props: {
        label: String,
        name: String,
        options: Array,
        validate: Function
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
        }
    }
};
</script>
