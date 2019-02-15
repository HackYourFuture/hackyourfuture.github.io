<template>
  <input :name="name" :value="v" type="hidden">
</template>
<script>
export default {
    props: {
        name: String,
        value: Function
    },
    data() {
        return {
            v: ""
        };
    },
    mounted() {
        this.v = this.value();
    }
};
</script>
