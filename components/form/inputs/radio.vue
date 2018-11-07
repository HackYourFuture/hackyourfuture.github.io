<template>
  <div>
    <div class="radios">
      <label class="hoi">{{ label }}</label>
      <div v-if="errorMessage" class="error" v-html="errorMessage"/>
      <div v-for="(option, key) in options" :key="key" class="wrap">
        <input ref="options" :value="option.value" :name="name" type="radio">
        <span>{{ option.label }}</span>
      </div>
    </div>
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
                const checkedOption = this.$refs.options.filter(
                    el => !!el.checked
                );
                const value =
                    checkedOption.length > 0 ? checkedOption.value : "";
                const errors = this.validate(value);
                this.errorMessage = errors.join("<br/>");
                this.valid = errors.length === 0;
            }

            return this.valid;
        }
    }
};
</script>
<style lang="scss">
.radios {
    display: flex;
    align-items: flex-start;
    & label {
        position: relative;
        flex: 1;
    }
    & .wrap {
        right: 0px;
        width: 15%;
        padding: 10px;
        white-space: nowrap;
        display: flex;
        align-items: baseline;
    }
}
</style>
