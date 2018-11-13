<template>
  <div>
    <main class="chapter">
      <div class="chapter__header container">
        <div class="chapter__header-welcome" v-html="welcome"/>
        <div class="chapter__header-image">
          <img src="/gallery/01.jpg">
        </div>
        <div class="chapter__header-description" v-html="description"/>
      </div>
      <section class="chapter__visit">
        <div class="chapter__visit-image">
          <img :src="'/chapters/' + city + '.jpg'">
        </div>
        <div class="chapter__visit-description" v-html="visit"/>
      </section>
      <section class="chapter__team">
        <h1>Meet the {{ city }} team</h1>
        <div class="chapter__team-members" v-html="members"/>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
export default {
  async asyncData({ params }) {
    let city = params.city;
    let welcome;
    let description;
    let visit;
    let members;
    try {
      let req = await axios.get(
        "/content/en/chapters/" + city + "/welcome.json"
      );
      let req1 = await axios.get(
        "/content/en/chapters/" + city + "/description.json"
      );
      let req2 = await axios.get(
        "/content/en/chapters/" + city + "/visit.json"
      );
      let req3 = await axios.get(
        "/content/en/chapters/" + city + "/members.json"
      );
      welcome = req.data.body;
      description = req1.data.body;
      visit = req2.data.body;
      members = req3.data.body;
    } catch (e) {
      console.log(e);
      welcome = false;
      description = false;
      visit = false;
      members = false;
    }
    return {
      welcome: welcome ? welcome : null,
      city: city,
      description: description ? description : null,
      visit: visit ? visit : null,
      members: members ? members : null
    };
  }
};
</script>

<style lang="scss">
.chapter {
  &__header {
    margin: 5%;
    padding: $base-vertical-rithm * 10;
    background: $color-grey;

    &-welcome {
      width: 25%;
      display: inline-block;
      @include breakpoint("mobile_landscape") {
        width: 100%;
      }
      h1 {
        color: $color-purple;
        @include breakpoint("mobile_landscape") {
          margin: $base-vertical-rithm * 5;
        }
      }
    }
    &-image {
      width: 60%;
      display: inline-block;
      @include breakpoint("mobile_landscape") {
        width: 100%;
      }
    }
    &-description {
      width: 70%;
      display: inline-block;
      margin-left: 15%;
      padding: $base-vertical-rithm * 10;
      @include breakpoint("mobile_landscape") {
        width: 100%;
        margin-left: 0;
      }
    }
  }
  &__visit {
    padding: $base-vertical-rithm * 20;
    background: $color-purple;
    width: 100%;
    &-image {
      width: 50%;
      display: inline-block;
      vertical-align: top;
    }
    &-description {
      width: 50%;
      display: inline-block;
      padding-left: $base-vertical-rithm * 20;
      h1,
      h2,
      h3,
      p {
        color: white;
      }
      h1 {
        font-size: 44px;
        line-height: 44px;
      }
    }
  }
}
</style>
