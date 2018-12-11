<template>
  <div class="main">
    <div class="donate-text">
      <h1>Support us!</h1>
      <h4>Support the developers of tomorrow</h4>
      <p>Help refugees build digital skills for a career in web development. We're a nonprofit that relies on support from people like you. Thanks to your support we can keep our programme free of charge for students.</p>
      <p>By supporting HackYourFuture you’re helping every year:</p>
      <ul>
        <li>150 newcomers get an introduction to web development</li>
        <li>60 students participate in our intensive 6-months programme</li>
        <li>40 graduates find a job in the IT sector</li>
      </ul>
    </div>
    <Donate class="donate-component"/>
  </div>
</template>
<script>
import Donate from "~/components/donate";

export default {
    components: {
        Donate
    }
};
</script>
<style lang="scss" scoped>
.main {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 8em auto;
    h1 {
        margin-bottom: 1em;
        line-height: 1.3;
        align-self: flex-start;
    }

    .donate-text {
        width: 50%;
        margin-right: 1em;
        h4 {
            font-weight: bold;
        }

        li {
            list-style-type: square;
            margin-left: 1em;
        }
    }
    .donate-component {
        margin: 50px auto;
    }
}

@media screen and (max-width: 767px) {
    .main {
        padding: 1em;
        width: initial;
        flex-direction: column;
        .donate-text {
            width: 100%;
        }
        .donate-component {
            margin-bottom: 0;
        }
    }
}
</style>
