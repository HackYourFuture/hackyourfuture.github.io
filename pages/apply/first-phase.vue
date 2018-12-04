<template>
  <div>
    <main class="upload container">
      <div class="upload__header">
        <div class="upload__header-content" v-html="cv_assignment"/>
        <div ref="upload__form" class="upload__form form">
          <formComponent :action="action" :inputs="inputs" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import FormComponent from "~/components/form/form";

const inputs = [
    {
        type: "input-file",
        className: "full-width",
        props: {
            label: "CV *",
            name: "cv"
        }
    },
    {
        type: "input-textarea",
        className: "full-width",
        props: {
            label: "I would like to write something about myself *",
            name: "cv",
            cols: "50",
            rows: "1"
        }
    },
    {
        type: "input-file",
        className: "full-width",
        props: {
            label: "Motivation *",
            name: "motivation"
        }
    },
    {
        type: "input-textarea",
        className: "full-width",
        props: {
            label: "I would like to write my motivation letter",
            name: "motivation",
            cols: "50",
            rows: "1"
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
        FormComponent
    },
    data: () => {
        return {
            action: `${process.env.lambdaUrl}apply/profile`,
            inputs
        };
    },
    async asyncData() {
        let cv_assignment;
        try {
            let req = await axios.get(
                "/content/en/application/cv_assignment.json"
            );
            cv_assignment = req.data.body;
        } catch (e) {
            console.log(e);
            cv_assignment = false;
        }
        return {
            cv_assignment: cv_assignment ? cv_assignment : null
        };
    }
};
</script>

<style lang="scss">
.upload {
    &__header {
        padding: $base-vertical-rithm * 10;
        @include breakpoint("mobile_landscape") {
            padding: 0;
        }
        &-content {
            padding: $base-vertical-rithm * 6;
            h1 {
                font-size: 36px;
                color: #293a7d;
                width: 80%;
                line-height: 50px;
                margin: 50px 0;
                font-weight: bold;
            }
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
