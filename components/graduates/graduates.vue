<template>
  <div class="graduates">
    <h1>Meet our graduates</h1>
    <div class="graduates__items">
      <div class="graduates__items-inner">
        <div v-for="(graduate, key) in graduates" :key="key" class="graduates__item">
          <nuxt-link :to="'/graduates/' + graduate.route">
            <div class="graduates__item-image">
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
.graduates {
    margin: $base-vertical-rithm * 20 $base-vertical-rithm * 8;
    @include breakpoint("mobile_portrait") {
        margin: 0;
    }
    h1 {
        @include breakpoint("mobile_portrait") {
            text-align: center;
        }
    }
    &__items {
        margin: 25px -25px;
        overflow-x: scroll;
        @include breakpoint("mobile_portrait") {
            width: 95%;
            margin: 0 auto;
            overflow-x: none;
        }
        &-inner {
            width: max-content;
            height: 460px;
            @include breakpoint("mobile_portrait") {
                height: auto;
                width: 85%;
                margin: 0 auto;
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
            margin: 5px;
            width: 275px;
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
