<template>
  <div>
    <Header/>
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>
import Header from '~/components/header/Header';
import Footer from '~/components/footer/Footer';
export default {
  components: {
    Header,
    Footer
  }
}
</script>
