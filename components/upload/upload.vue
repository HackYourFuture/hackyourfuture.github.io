<template>
  <div class="upload" :class="color">
    <span class="qText">Have you any question? Please Notify Us!</span>
    <br>
   
    <textarea id="question" ref="question"></textarea>
    <div class="wrapper"> 
      <button class="button" v-on:click="sendQ()">Submit</button>
    </div>
    
    
  </div>
</template>

<script>
export default {
  props: ["color"],
  methods: {
    sendQ: function() {
      console.log(document.getElementById("question").value);
    }
  }
};
</script>

<style lang="scss">
.textArea {
  background-color: lightgray;
  text-align: center;
  display: inline-block;
  margin: auto;
  width: 25%;
  padding: 0;
}
.qText {
  margin: auto;
  display: inline-block;
  padding: 5px;
  color: bisque;
  font-size: 16px;
}
.wrapper {
  text-align: center;
}
textarea {
  overflow-y: scroll;
  height: 100px;
  resize: none; /* Remove this if you want the user to resize the textarea */
}
.button {
  position: relative;
  background-color: lightgray;
  color: black;
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  margin-top: 40px;
}
.upload {
  padding: 10 * $base-vertical-rithm;
  background: $color-purple;
  text-align: center;
  &.grey {
    background: $color-grey;
    a {
      color: $color-purple;
      &:after {
        background: $color-purple;
      }
    }
  }
  a {
    color: white;
    position: relative;
    font-size: 18px;
    font-weight: 100;
    font-family: $fontSpaceMono;
    &:after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0px;
      width: 100%;
      height: 1px;
      background: white;
    }
  }
}
</style>
