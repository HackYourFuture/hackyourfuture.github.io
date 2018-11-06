<template>
  <div>
    <div class="apply-btn">
      <input :value="buttonLabel" type="submit">
    </div>
  </div>
</template>
<script>
export default {
    props: { buttonLabel: String },
    methods: {
        check() {
            return true;
        }
    }
};
</script>
