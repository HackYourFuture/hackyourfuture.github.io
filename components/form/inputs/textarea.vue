<template>
  <div>
    <div v-if="errorMessage" class="error" v-html="errorMessage"/>
    <div class="check">
      <span ref="label">{{ label }}</span>
    </div>
    <textarea ref="textarea" :name="name" :cols="cols" @keyup="resize" />
  </div>
</template>

<script>
export default {
    props: {
        label: String,
        name: String,
        cols: String,
        rows: String,
        errorMessage: String
    },
    methods: {
        resize() {
            const { textarea } = this.$refs;
            textarea.style.height = "1px";
            textarea.style.height = 25 + textarea.scrollHeight + "px";
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
