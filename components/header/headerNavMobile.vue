<template>
  <nav :class="{ toggled: toggled }" class="mobileNav" @click="onClick">
    <ul>
      <li>
        <nuxt-link :to="'/'">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="'/apply/'">Apply</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="'/teach/'">Teach</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="'/hire/'">Hire</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="'/international/'">International</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="'/about/'">About</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="'/contact/'">Contact</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="'/teaser/'">WCT</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="'/hire/donate/'" class="donate-btn">Donate</nuxt-link>
      </li>
    </ul>
  </nav>
</template>
<script>
import eventBus from "~/utils/event-bus";

export default {
    data() {
        return {
            toggled: false
        };
    },
    watch: {
        "$route.name": function() {
            this.toggled = false;
        }
    },
    created() {
        eventBus.$on("toggle-mobile-nav", this.toggleNav);
    },
    methods: {
        toggleSearch() {},
        onClick(e) {
            if (e.target.nodeName === "A") {
                if (e.target.classList.contains("nuxt-link-active")) return;
            }
        },
        toggleNav(toggle) {
            this.toggled = toggle;
        }
    }
};
</script>

<style lang="scss">
.mobileNav {
    position: fixed;
    top: 60px;
    bottom: 0;
    left: 0;
    width: 220px;
    z-index: 9999;
    background: white;
    border-right: 1px solid rgba(#111, 0.12);
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    @include breakpoint("mobile_landscape") {
        overflow-y: scroll;
    }

    &.toggled {
        transform: translateX(0);
    }

    ul {
        padding: 0;
        margin: 0;
        li {
            border-bottom: 1px solid rgba(#111, 0.12);
            &.nuxt-link-active {
                a {
                    color: $color-purple;
                }
            }
            a {
                display: block;
                padding: 1rem 1rem;
                color: $color-purple;
            }
        }
    }
}
</style>
