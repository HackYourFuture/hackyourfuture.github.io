<template>
  <div>
    <main class="technical container">
      <div class="technical__header">
        <div class="technical__header-content" v-html="technical_assignment"/>
        <div ref="technical__form" class="technical__form form">
          <formComponent :action="`${lambdaUrl}technical`" :inputs="inputs"/>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import formComponent from "~/components/form/form";
import fieldError from "~/components/form/helpers/fieldError";

const inputs = [
    {
        type: "input-text",
        className: "full-width",
        props: {
            label: "url codepen *",
            name: "url",
            validate: value => new fieldError(value).isURL().errors
        }
    },
    {
        type: "input-file",
        className: "full-width",
        props: {
            label: "screenshot KhanAcedemy*",
            name: "screenshot"
        }
    },
    {
        type: "input-button",
        props: {
            buttonLabel: "Apply"
        }
    }
];

export default {
    components: {
        formComponent
    },
    data: () => {
        return {
            lambdaUrl: process.env.lambdaUrl,
            inputs
        };
    },
    async asyncData() {
        let technical_assignment;
        try {
            let req = await axios.get(
                "/content/en/application/technical_assignment.json"
            );
            technical_assignment = req.data.body;
        } catch (e) {
            console.log(e);
            technical_assignment = false;
        }
        return {
            technical_assignment: technical_assignment
                ? technical_assignment
                : null
        };
    }
};
</script>

<style lang="scss">
.technical {
    &__header {
        padding: $base-vertical-rithm * 10;
        @include breakpoint("mobile_landscape") {
            padding: 0;
        }
        &-content {
            padding: $base-vertical-rithm * 6;
        }
        h1 {
            font-size: 36px;
            color: #293a7d;
            width: 80%;
            line-height: 50px;
            margin: 50px 0;
            font-weight: bold;
        }
    }
    &__form {
        margin-top: $base-vertical-rithm * 10;
        width: 70%;
        margin-left: 15%;
        position: relative;
        @include breakpoint("ipad_portrait") {
            width: 80%;
            margin: $base-vertical-rithm * 10 auto;
        }
    }
}
</style>
