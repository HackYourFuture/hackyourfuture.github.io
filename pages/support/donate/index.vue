<template>
  <div class="main">
    <h1>Thank you for donating!</h1>
    <donate class="donate-component"/>
  </div>
</template>
<script>
import donate from "~/components/donate";

export default {
    components: {
        donate
    }
};
</script>
<style lang="scss" scoped>
.main {
    display: flex;
    align-items: center;
    flex-direction: column;
    h1 {
        margin: 50px 30px 0 30px;
        line-height: 1.3;
        align-self: flex-start;
    }
    .donate-component {
        margin-top: 50px;
    }
}

@media screen and (min-width: 767px) {
    .main {
        h1 {
            line-height: normal;
            margin: 100px 100px 0 100px;
        }
    }
}
</style>
