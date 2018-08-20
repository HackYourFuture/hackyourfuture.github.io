<template>
  <nav class="HeaderNav">
    <nuxt-link :to="'/'">Home</nuxt-link>
    <nuxt-link :to="'/apply/'">Apply</nuxt-link>
    <nuxt-link :to="'/teach/'">Teach</nuxt-link>
    <nuxt-link :to="'/support/'">Hire</nuxt-link>
    <nuxt-link :to="'/chapters/'">Chapters</nuxt-link>
    <nuxt-link :to="'/about/'">About</nuxt-link>
    <nuxt-link :to="'/contact/'">Contact</nuxt-link>
 
    
  </nav>
</template>

<script>
export default {
    mounted() {
        this.paymentStatus();
    },
    methods: {
        paymentStatus() {
            const orderId = this.$route.query.orderid;
            if (orderId !== undefined) {
                let donationStatusURL =
                    process.env.GET_DONATION_STATUS_URL ||
                    "http://localhost:3005/donation/status";

                donationStatusURL = donationStatusURL.concat(
                    "/?orderid=",
                    orderId
                );
                fetch(donationStatusURL)
                    .then(response => response.json())
                    .then(json => console.log(json))
                    .catch(err => console.log(err));
            } else console.log(orderId);
        }
    }
};
</script>

<style lang="scss">
.HeaderNav {
    a {
        position: relative;
        margin-right: $base-vertical-rithm * 8;
        &:last-child {
            margin-right: 0;
        }
        text-transform: uppercase;
        font-family: $fontWorkSans;
        font-weight: bold;
        letter-spacing: 0.5px;
        &.nuxt-link-exact-active {
            &:after {
                content: "";
                position: absolute;
                height: 2px;
                bottom: -$base-vertical-rithm;
                left: -$base-vertical-rithm;
                right: -$base-vertical-rithm;
                background-color: $link-color;
            }
        }
    }
}
</style>
