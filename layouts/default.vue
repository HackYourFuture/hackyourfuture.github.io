<template>
  <div>
    <pageHeader/>
    <headerNavMobile/>
    <div class="app-main">
      <nuxt/>
      <pageFooter/>
    </div>
  </div>
</template>

<script>
import pageHeader from "~/components/header/pageheader";
import pageFooter from "~/components/footer/pagefooter";
import headerNavMobile from "~/components/header/headerNavMobile";
export default {
    components: {
        pageHeader,
        headerNavMobile,
        pageFooter
    }
};
</script>

<style lang="scss">
.app-main {
    transition: transform 0.3s ease-in-out;
    @include breakpoint("mobile_landscape") {
        margin-top: 50px;
    }
    &.menuToggle {
        transform: translate3d(220px, 0, 0);
    }
}
</style>
