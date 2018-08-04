<template>
  <div class="Makers">
    <h1>Meet our graduates</h1>
    <div class="Makers__items">
      <div class="Makers__item">
        <div class="Makers__item-image">
          <img src="/makers/amena.png">
        </div>
        <h3>Amena</h3>
        <p>Currently working at NOS</p>
      </div>

      <div class="Makers__item">
        <div class="Makers__item-image">
          <img src="/makers/lamma.png">
        </div>
        <h3>Lamma</h3>
        <p>Currently working at NOS</p>
      </div>

      <div class="Makers__item">
        <div class="Makers__item-image">
          <img src="/makers/nazar.png">
        </div>
        <h3>Nazar</h3>
        <p>Currently working at NOS</p>
      </div>
    </div>
  </div>
</template>

<script>

</script> 

<style lang="scss">
.Makers {
  margin: $base-vertical-rithm * 20 $base-vertical-rithm * 8;
  @include breakpoint("mobile_landscape") {
    margin: $base-vertical-rithm * 5 $base-vertical-rithm * 2;
  }
  h1 {
    font-size: 42px;
    font-weight: bold;
    color: $color-purple;
  }
  &__items {
    margin: 25px -25px;
    
  }
  &__item {
    background: $color-purple;
    padding: $base-vertical-rithm * 5;
    display: inline-block;
    width: calc(33% - 50px);
    margin: 25px;
    display: inline-block;
    
    @include breakpoint("mobile_landscape") {
      width: calc(50% - 50px);
    }
    &-image {

    }
    h3, p {
      color: white;
    }
    h3 {
      margin-top: $base-vertical-rithm * 5;
      font-weight: bold;
      font-size:24px;
    }
    p {
      margin-bottom: 0;
    }
  }
}
</style>
