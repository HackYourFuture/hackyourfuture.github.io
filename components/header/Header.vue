<template>
  <header class="Header">
    <div class="container max-width">
      <div class="icon menu-button">
        <span class="icon-menu"/>
        <span class="icon-cross"/>
      </div>
      <HeaderNav/>
      <nuxt-link :to="'/donate'" class="donate-btn">Donate</nuxt-link>
    </div>
  </header>
</template>

<script>
import HeaderNav from "./HeaderNav";
export default {
    components: {
        HeaderNav
    }
};
</script>

<style lang="scss">
.Header {
    position: fixed;
    width: 100%;
    background: white;
    z-index: 10;
    top: 0;

    .HeaderNav {
        margin: $base-vertical-rithm * 2;
        text-align: center;
        @include breakpoint("mobile_landscape") {
            display: none;
        }
    }
    .donate-btn {
        border: 2px solid $color-purple;
        padding: 0px 10px;
        text-transform: uppercase;
        font-weight: 100;
        position: absolute;
        top: 2px;
        right: 0;
        margin: $base-vertical-rithm * 1 $base-vertical-rithm * 5;
        @include breakpoint("mobile_landscape") {
            display: none;
        }
    }
    .menu-button {
        top: 23px;
        position: absolute;
        left: 16px;
        width: 22px;
        height: 22px;
        overflow: hidden;
        &.pressed {
            .icon-menu {
                transform: translateY(-18px) rotate(90deg);
            }
            .icon-cross {
                transform: translateY(-23px) rotate(0deg);
            }
        }
        .icon-menu,
        .icon-cross {
            position: absolute;
            transition: transform 0.25s ease-out;
        }
        .icon-cross {
            top: 20px;
            font-size: 21px;
            transform: rotate(90deg);
        }
    }
}
</style>
