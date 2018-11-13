<template>
  <div>
    <Header/>
    <HeaderNavMobile/>
    <div class="app-main">
      <nuxt/>
      <Footer/>
    </div>
  </div>
</template>

<script>
import Header from "~/components/header/header";
import Footer from "~/components/footer/footer";
import HeaderNavMobile from "~/components/header/headerNavMobile";
export default {
    components: {
        Header,
        HeaderNavMobile,
        Footer
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
