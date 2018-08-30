<template>
  <div class="Graduates">
    <h1>Meet our graduates</h1>
    <div class="Graduates__items">
      <div class="Graduates__items-inner">
        <div v-for="(graduate, key) in graduates" :key="key" class="Graduates__item">
          <nuxt-link :to="'/graduates/' + graduate.route">
            <div class="Graduates__item-image">
              <img :src="'/graduates/' + graduate.route + '.jpg'">
            </div>
            <h3>{{ graduate.name }}</h3>
            <p>{{ graduate.description }}</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            graduates: [
                {
                    name: "Rabih Alqaraweet",
                    route: "rabih",
                    description: "Currently working at Owlin"
                },
                {
                    name: "Sarea Al Kebaky",
                    route: "sarea",
                    description: "Currently working at ZIVVER"
                }
            ]
        };
    }
};
</script> 

<style lang="scss">
.Graduates {
    margin: $base-vertical-rithm * 20 $base-vertical-rithm * 8;
    @include breakpoint("mobile_landscape") {
        margin: $base-vertical-rithm * 5 $base-vertical-rithm * 2;
    }
    h1 {
        font-size: 42px;
        font-weight: bold;
        color: $color-purple;
        @include breakpoint("mobile_landscape") {
            font-size: 24px;
            line-height: 24px;
        }
    }
    &__items {
        margin: 25px -25px;
        overflow-x: scroll;
        &-inner {
            width: max-content;
            height: 460px;
            @include breakpoint("mobile_landscape") {
                width: 100%;
            }
        }
    }
    &__item {
        background: $color-purple;
        padding: $base-vertical-rithm * 5;
        display: inline-block;
        width: 350px;
        margin: 25px;
        display: inline-block;
        @include breakpoint("mobile_landscape") {
            width: calc(50% - 50px);
        }
        h3,
        p {
            color: white;
        }
        h3 {
            margin-top: $base-vertical-rithm * 5;
            font-weight: bold;
            font-size: 24px;
        }
        p {
            margin-bottom: 0;
        }
    }
}
</style>
