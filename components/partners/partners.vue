<template>
  <div class="partners">
    <h3>Official partners & supporters</h3>
    <div class="partners__items">
      <img src="/partners/ing.svg" alt="ING.">
      <img src="/partners/doen.svg" alt="Stichting doen.">
      <img src="/partners/atlasian.svg" alt="Atlassian.">
      <img src="/partners/backbase.svg" alt="Backbase.">
    </div>
  </div>
</template>

<style lang="scss">
.partners {
    margin: $base-vertical-rithm * 15 $base-vertical-rithm * 10;
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
        img {
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
</style>
