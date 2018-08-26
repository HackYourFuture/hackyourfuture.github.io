<template>
  <header class="Header">
    <div class="container max-width">
      <div class="icon menu-button" @click="toggleMenu" :class="{pressed: menuOpen}">
        <span class="icon-menu"/>
        <span class="icon-cross"/>
      </div>
      <HeaderNav/>
      <HeaderNavMobile/>
      <nuxt-link :to="'/donate'" class="donate-btn">Donate</nuxt-link>
    </div>
  </header>
</template>

<script>
import eventBus from '~/utils/event-bus';
import HeaderNav from "./HeaderNav";
import HeaderNavMobile from "./HeaderNavMobile";
export default {
    watch: {
        '$route.name': function () {
            this.menuOpen = false;
        }
    },
    data () {
        return {
            menuOpen: false
        }
    },
    methods: {
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
            eventBus.$emit('toggle-mobile-nav', this.menuOpen)
        }
    },
    components: {
        HeaderNav,
        HeaderNavMobile
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
            background-image: url('/icons/002-menu-button.svg');
        }
        .icon-cross {
            background-image: url('/icons/001-cancel.svg');
            transform:  translateX(-50px);
        }
    }
}
</style>
