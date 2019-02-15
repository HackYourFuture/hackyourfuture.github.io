<template>
  <input :name="name" :value="value" type="hidden">
</template>
<script>
export default {
    props: {
        name: String,
        value: String
    }
};
</script>
