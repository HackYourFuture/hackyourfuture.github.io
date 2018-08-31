<template>
  <div class="Makers">
    <h1>Meet our graduates</h1>
    <div class="Makers__items">
      <div class="Makers__items-inner">
        <div v-for="(maker, key) in makers" :key="key" class="Makers__item">
          <nuxt-link :to="'/graduates/' + maker.route">
            <div class="Makers__item-image">
              <img :src="'/makers/' + maker.route + '.png'">
            </div>
            <h3>{{ maker.name }}</h3>
            <p>{{ maker.description }}</p>
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
            makers: [
                {
                    name: "Amena",
                    route: "amena",
                    description: "Currently working at NOS"
                },
                {
                    name: "Lamma",
                    route: "lamma",
                    description: "Currently working at NOS"
                },
                {
                    name: "Nazar",
                    route: "nazar",
                    description: "Currently working at NOS"
                },
                {
                    name: "Nazar",
                    route: "nazar",
                    description: "Currently working at NOS"
                }
            ]
        };
    }
};
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
