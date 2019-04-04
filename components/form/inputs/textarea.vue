<template>
  <div>
    <div v-if="errorMessage" class="error" v-html="errorMessage"/>
    <div class="check">
      <span ref="label">{{ label }}</span>
    </div>
    <textarea ref="textarea" :name="name" :cols="cols" maxlength="1000" @keyup="resizeAndCheck"/>
  </div>
</template>

<script>
export default {
    props: {
        label: String,
        name: String,
        cols: String,
        rows: String,
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
                const errors = this.validate(this.$refs.textarea.value);
                this.errorMessage = errors.join("<br/>");
                this.valid = errors.length === 0;
            }

            return this.valid;
        },
        resizeAndCheck() {
            const { textarea } = this.$refs;
            textarea.style.height = "1px";
            textarea.style.height = 25 + textarea.scrollHeight + "px";

            this.check();
        }
    }
};
</script>
<style lang="scss">
.check {
    padding-bottom: $base-vertical-rithm * 3;
    display: flex;
    align-items: baseline;
}
input[type="checkbox"] {
    width: 14px;
    height: 14px;
    margin-right: 5px;
}
textarea {
    display: inline-block;
    min-height: 14px;
}
</style>
