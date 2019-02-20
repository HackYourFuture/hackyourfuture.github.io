<template>
  <nav class="headerNav">
    <nuxt-link :to="'/'">Home</nuxt-link>
    <nuxt-link :to="'/apply/'">Apply</nuxt-link>
    <nuxt-link :to="'/teach/'">Teach</nuxt-link>
    <nuxt-link :to="'/hire/'">Hire</nuxt-link>
    <nuxt-link :to="'/international/'">International</nuxt-link>
    <nuxt-link :to="'/about/'">About</nuxt-link>
    <nuxt-link :to="'/contact/'">Contact</nuxt-link>
    <nuxt-link :to="'/teaser/'">WCT</nuxt-link>
    <nuxt-link :to="'/hire/donate/'" class="donate-btn">Donate</nuxt-link>
  </nav>
</template>
<style lang="scss">
.headerNav {
    a {
        position: relative;
        margin-right: $base-vertical-rithm * 8;
        text-transform: uppercase;
        font-family: $fontWorkSans;
        font-weight: bold;
        letter-spacing: 0.5px;
        display: inline-block;
        margin-bottom: 10px;
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
    .donate-btn {
        background-color: #293a7d;
        color: white;
        padding: 5px 10px;
    }
}
</style>
