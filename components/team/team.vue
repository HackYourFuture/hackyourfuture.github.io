<template>
  <div>
    <div class="team">
      <h1>Meet the Amsterdam team</h1>
      <div class="team__core-team">
        <div v-for="(member, key) in team" :key="key" class="team__core-team-member">
          <img :src="member.src">
          <h3>{{ member.name }}</h3>
          <p>{{ member.function }}</p>
          <div class="icon-wrap">
            <a :href="member.mail">
              <img src="/icons/mail.svg">
            </a>
            <a :href="member.href">
              <img src="/icons/in.svg">
            </a>
          </div>
        </div>
      </div>
      <h2>Mentors</h2>
      <div class="team__teacher-team">
        <div v-for="(teacher, key) in teachers" :key="key" class="team__teacher-team-member">
          <img :src="teacher.src">
          <h3>{{ teacher.name }}</h3>
          <a :href="teacher.href">
            <div :class="['icon', teacher.class]"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: { teachers: Array, team: Array }
};
</script>

<style lang="scss">
.team {
  width: 95%;
  margin: 0 auto;
  @include breakpoint("mobile_landscape") {
    width: 100%;
    padding: 0;
  }
  h1,
  h2 {
    color: $color-purple;
    font-family: $fontWorkSans;
    font-weight: normal;
    font-size: 42px;
    line-height: 50px;
    text-align: center;
    padding: $base-vertical-rithm * 10;
    @include breakpoint("mobile_landscape") {
      padding: $base-vertical-rithm * 6;
      font-size: 24px;
      font-weight: bold;
    }
  }
  &__core-team,
  &__teacher-team {
    display: flex;
    align-items: baseline;
    justify-content: space-evenly;
    flex-wrap: wrap;
    &-member {
      width: calc(18% - 50px);
      text-align: center;
      margin: $base-vertical-rithm * 4;
      margin-bottom: 25px;
      img {
        height: 100%;
        border-radius: 50%;
        display: block;
      }
      @include breakpoint("ipad_landscape") {
        width: calc(25% - 20px);
        margin: 5px 5px;
      }
      @include breakpoint("mobile_portrait") {
        width: calc(45% - 20px);
        margin: 5px 5px;
      }

      h3,
      p,
      a {
        color: $color-purple;
        display: inherit;
      }
      a {
        margin: 0 auto;
        width: 20px;
      }
      p {
        margin-bottom: $base-vertical-rithm * 3;
        @include breakpoint("mobile_landscape") {
          margin: $base-vertical-rithm * 2 0;
        }
      }
      h3 {
        margin: $base-vertical-rithm * 3 0;
        font-weight: bold;
        @include breakpoint("mobile_landscape") {
          margin: $base-vertical-rithm * 2 0;
          font-size: 18px;
        }
      }
      .icon {
        width: 20px;
        height: 20px;
        background-image: url(/icons/in.svg);
      }
      .icon.heart {
        background-image: url(/icons/heart.svg);
      }
      .icon-wrap {
        display: flex;
        justify-content: center;
        a {
          margin: 3px;
        }
      }
    }
  }
}
</style>
