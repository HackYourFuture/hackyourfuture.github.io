<template>
  <header class="Header">
    <div class="container max-width">
      <div :class="{pressed: menuOpen}" class="icon menu-button" @click="toggleMenu">
        <span class="icon-menu"/>
        <span class="icon-cross"/>
      </div>
      <HeaderNav/>
      <nuxt-link :to="'/support/donate/'" class="donate-btn">Donate</nuxt-link>
    </div>
  </header>
</template>

<script>
import eventBus from "~/utils/event-bus";
import HeaderNav from "./HeaderNav";
import HeaderNavMobile from "./HeaderNavMobile";
export default {
    components: {
        HeaderNav,
        HeaderNavMobile
    },
    data() {
        return {
            menuOpen: false
        };
    },
    watch: {
        "$route.name": function() {
            this.menuOpen = false;
        }
    },
    methods: {
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
            eventBus.$emit("toggle-mobile-nav", this.menuOpen);
        }
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
    @include breakpoint("mobile_landscape") {
        height: 60px;
    }

    .container {
        display: flex;
        flex-direction: row;
    }

    .HeaderNav {
        flex: auto;
        display: flex;
        flex-direction: row;
        margin: $base-vertical-rithm * 2;
        text-align: center;
        @include breakpoint("mobile_landscape") {
            display: none;
        }
    }
    .donate-btn {
        align-self: center;
        border: 2px solid $color-purple;
        padding: 0px 10px;
        text-transform: uppercase;
        font-weight: bold;
        color: $color-purple;
        width: 120px;
        top: 2px;
        right: 0;
        margin: $base-vertical-rithm * 1 $base-vertical-rithm * 5;
        @include breakpoint("mobile_landscape") {
            display: none;
        }
        &:hover {
            color: white;
            background: $color-purple;
        }
    }
    .menu-button {
        top: 20px;
        position: absolute;
        left: 20px;
        width: 22px;
        height: 22px;
        overflow: hidden;
        display: none;
        @include breakpoint("mobile_landscape") {
            display: block;
        }
        &.pressed {
            .icon-menu {
                transform: translateX(50px);
            }
            .icon-cross {
                transform: translateX(0px);
            }
        }
        .icon-menu,
        .icon-cross {
            position: absolute;
            transition: transform 0.25s ease-out;
            background-size: cover;
            background-repeat: no-repeat;
            top: 0px;
            width: 100%;
            height: 100%;
        }
        .icon-menu {
            background-image: url("/icons/002-menu-button.svg");
        }
        .icon-cross {
            background-image: url("/icons/001-cancel.svg");
            transform: translateX(-50px);
        }
    }
}
</style>
