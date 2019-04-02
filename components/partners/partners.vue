<template>
  <div class="partners">
    <h3>Official partners & supporters</h3>
    <div class="partners__items">
      <a
        target="_blank"
        href="https://www.ing.nl/de-ing/over-de-ing/ingnederlandfonds/onze_partners/index.html"
      >
        <img src="/partners/ing.svg" alt="ING">
      </a>
      <a target="_blank" href="https://www.doen.nl/wat-we-doen/stichting-hack-your-future.htm">
        <img src="/partners/doen.svg" alt="Stichting doen">
      </a>
      <a target="_blank" href="https://www.atlassian.com/">
        <img src="/partners/atlasian.svg" alt="Atlassian">
      </a>
      <a target="_blank" href="https://backbase.com/">
        <img src="/partners/backbase.svg" alt="Backbase">
      </a>
    </div>
  </div>
</template>

<style lang="scss">
.partners {
    margin: 0 $base-vertical-rithm * 10 $base-vertical-rithm * 15 !important;
    margin-bottom: $base-vertical-rithm * 5;
    @include breakpoint("mobile_landscape") {
        margin-top: $base-vertical-rithm * 5;
    }
    @include breakpoint("mobile_portrait") {
        margin-top: $base-vertical-rithm * 10;
    }
    h3 {
        font-size: 24px;
    }
    &__items {
        margin-top: $base-vertical-rithm * 5;
        display: flex;
        justify-content: space-between;
        @include breakpoint("mobile_portrait") {
            flex-wrap: wrap;
        }
        a {
            font-weight: bold;
            color: $color-purple;
            width: calc(15% - 5px);
            padding: 0 15px;
            @include breakpoint("mobile_landscape") {
                padding: 0;
            }
            @include breakpoint("mobile_portrait") {
                width: calc(45% - 20px);
                padding: 0 10px;
            }
        }
    }
}

@media only screen and (max-width: 560px) {
    .partners {
        margin: $base-vertical-rithm * 15 $base-vertical-rithm * 10 !important;
        &__items {
            img {
                margin: 1em 0;
            }
        }
    }
}
</style>
