<template>
  <div :class="color" class="Signup">
    <nuxt-link :to="'/'">sign up for newsletter</nuxt-link>
  </div>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: ""
        }
    }
};
</script>

<style lang="scss">
.Signup {
    padding: 10 * $base-vertical-rithm;
    background: $color-purple;
    text-align: center;
    &.grey {
        background: $color-grey;
        a {
            color: $color-purple;
            &:after {
                background: $color-purple;
            }
        }
    }
    a {
        color: white;
        position: relative;
        font-size: 18px;
        font-weight: 100;
        font-family: $fontSpaceMono;
        &:after {
            content: "";
            position: absolute;
            bottom: -5px;
            left: 0px;
            width: 100%;
            height: 1px;
            background: white;
        }
    }
}
</style>
