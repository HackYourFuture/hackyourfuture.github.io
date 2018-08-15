<template>
  <div class="Partners">
    <h3>Official partners & supporters</h3>
    <div class="Partners__items">
      <p>github</p>
      <p>oranje fonds</p>
      <p>vsb</p>
      <p>etc</p>
    </div>
  </div>
</template>

<script>
</script> 

<style lang="scss">
.Partners {
    margin: $base-vertical-rithm * 20 $base-vertical-rithm * 8;
    margin-bottom: $base-vertical-rithm * 5;
    h3 {
        font-size: 24px;
        color: $color-purple;
        font-weight: bold;
    }
    &__items {
        margin-top: $base-vertical-rithm * 5;
        display: -webkit-box;
        display: -ms-flexbox;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        position: relative;
        p {
            display: flex;
            font-weight: bold;
            color: $color-purple;
        }
    }
}
</style>
