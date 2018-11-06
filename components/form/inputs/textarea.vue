<template>
  <div>
    <div v-if="errorMessage" class="error" v-html="errorMessage"/>
    <div class="check">
      <input :name="name" type="checkbox">
      <span ref="label">{{ label }}</span>
    </div>
    <textarea :cols="cols" :rows="rows"/>
  </div>
</template>

<script>
export default {
    props: ["label", "name", "cols", "rows"]
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
</style>
