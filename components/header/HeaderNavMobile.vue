<template>

<nav 
    class="MobileNav" 
    :class="{ toggled: toggled }"
    @click="onClick">
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
            <nuxt-link :to="'/support/'">Support</nuxt-link>
        </li>
         <li>
            <nuxt-link :to="'/chapters/'">Chapters</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/news/'">News</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/about/'">About</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/contact/'">Contact</nuxt-link>
        </li>
         <li>
          <nuxt-link :to="'/upload/'">Upload</nuxt-link>
        </li>
        
    </ul>
</nav>

</template>
<script>
// import eventBus from '~/utils/event-bus';

export default {
  data() {
    return {
      toggled: false
    };
  },
  created() {
    // eventBus.$on('toggle-mobile-nav', this.toggleNav)
  },
  methods: {
    toggleSearch() {
      // this.$store.commit('TOGGLE_SEARCH_VIEW', true);
    },
    onClick(e) {
      if (e.target.nodeName === "A") {
        if (e.target.classList.contains("nuxt-link-active")) return;
        // eventBus.$emit('toggle-mobile-nav', false)
      }
    },
    toggleNav(toggle) {
      this.toggled = toggle;
    }
  }
};
</script>

<style lang="scss">
.MobileNav {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 220px;
  z-index: 9999;
  background: white;
  border-right: 1px solid rgba(#111, 0.12);

  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;

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