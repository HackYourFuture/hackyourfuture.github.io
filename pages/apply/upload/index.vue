<template>
        <div>
        <Main class="Apply container">
            <div class="Apply__header">
                <h1>Upload Your CV & Motivation Letter Here.</h1>
                <div class="Apply__header-image"></div> 
            </div>
<div>Don't have a CV? Please click on the checkbox to let us know a few things about you. (Refresh the page if you clicked by mistake!)
  
<!-- <input type="radio" name="radio" value="Yes" id="cvYes" v-on:click="showCvDiv()"> YES -->
  
<input type="radio" name="radio" value="No" id="cvNo" v-on:click="showCvText()"> I have no CV.
    
 </div>
            <div class="Apply__form form">
                <form>
                    <fieldset>   

                        <div id="cvDiv">
                            <P><img src="http://www.iconarchive.com/show/ios7-icons-by-icons8/User-Interface-Plus-icon.html" v-on:click="openUploadFileDialogue()"  class="imageIcon" align="middle" />Click the Icon to Upload Your CV (*)</P>                           
                            <input type="file" class="input text" id="file" ref="file" v-on:change="handleFileUpload()" />
                            <div id="cvLabel" class="full-width text"></div>
                        </div>

                      
                         <div id="mlDiv">
                            <P><img src="http://www.iconarchive.com/show/ios7-icons-by-icons8/User-Interface-Plus-icon.html" v-on:click="openUploadFileDialogue1()"  class="imageIcon" align="middle" />Click the Icon to Upload Your Motivation Letter (*)</P>                           
                            <input type="file" class="input text" id="file1" ref="file1" v-on:change="handleFileUpload1()" />
                            <div id="mlLabel" class="full-width text"></div>
                        </div>

                        <div class="half-width inputContainer">
                            <label for="email">Click to enter e-mail(*)</label>
                            <input type="email" id="email" ref="email" class="input" name="email" value="" v-on:change="handleEmail()" @focus="setActive">
                        </div>

                      
                          <div class="full-width inputContainer">
                            <label for="message">Click to add additional info and/or work experience.</label>
                            <input type="message" id="message" ref="message" name="message" value="" v-on:change="handleMessage()" @focus="setActive">
                          </div>

                        <div class="Apply__header">
                        <h6>NOTE: (*) indicates compulsory field.</h6>
            </div>

                        <div class="apply-btn">
                            <input type="submit" value="Apply" v-on:click.prevent="submitFile">
                        </div>
                       
                    </fieldset>
                </form>
            </div>
          </Main>
               
            </div>

</template>

<script>
import axios from "~/plugins/axios";
import Upload from "~/components/upload/upload";

export default {
  async asyncData() {
    // let description;
    //  let dates;

    try {
      //   let req = await axios.get("/content/en/upload/upload.json");
      //    let req1 = await axios.get("/content/en/apply/apply-dates.json"); // im
      // description = req.data.body;
      // dates = req1.data.body;
    } catch (e) {
      // description = false;
      // dates = false;
    }
    return {
      formUrlApply: process.env.lambdaUrl + "apply/upload",
      siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I"
      // description: description ? description : null,
      // dates: dates ? dates : null
    };
  },

  components: {
    Upload
  },

  data() {
    return {
      file: "",
      file1: "",
      email: "",
      message: ""
    };
  },

  mounted: function() {
    console.log("Hi the Page Loaded Successfully!");
    // this.hideMlDiv();
    // this.hideCvDiv();
    // this.hideCvText();
  },

  methods: {
    submitFile() {
      /*
                Initialize the form data
      */
      let formData = new FormData();

      /*
                Add the form data we need to submit
      */
      formData.append("file", this.file);
      formData.append("file1", this.file1);

      /*
          Make the request to the POST /single-file URL
      */
      if (
        document.getElementById("email").value !== "" &&
        document.getElementById("email").value !== null &&
        document.getElementById("email").value !== "Required field" &&
        document.getElementById("cvLabel").innerHTML !== "" &&
        document.getElementById("mlLabel").innerHTML !== ""
      ) {
        axios
          .post("/apply/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(function() {
            console.log("SUCCESS!!");
          })
          .catch(function() {
            console.log("FAILURE!!");
          });
      } else {
        if (document.getElementById("email").value === "") {
          if (document.getElementById("email").value === "") {
            document
              .getElementById("email")
              .parentNode.classList.remove("active");
          }
          document.getElementById("email").parentNode.classList.add("active");
          document.getElementById("email").value = "Required field";
        }

        if (document.getElementById("cvLabel").innerHTML === "") {
          document.getElementById("cvLabel").innerHTML = "Required field";
        }
        if (document.getElementById("mlLabel").innerHTML === "") {
          document.getElementById("mlLabel").innerHTML = "Required field";
        }
      }
    },

    /*
        Handles a change on the file upload
    */
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file.name);
      document.getElementById("cvLabel").innerHTML = this.file.name;
    },

    handleFileUpload1() {
      this.file1 = this.$refs.file1.files[0];
      console.log(this.file1.name);
      document.getElementById("mlLabel").innerHTML = this.file1.name;
    },

    handleEmail() {
      this.email = this.$refs.email;
      console.log(this.email.value);
      document.getElementById("email").value = this.email.value;
    },

    handleMessage() {
      this.message = this.$refs.message;
      console.log(this.message.value);
      document.getElementById("message").value = this.message.value;
    },

    /*
        Handles when the image clicked
    */

    openUploadFileDialogue() {
      document.getElementById("file").click();
    },

    openUploadFileDialogue1() {
      document.getElementById("file1").click();
    },
    /*
        Removes a select file the user has uploaded
    */
    removeFile(key) {
      this.file.splice(key, 1);
    },

    setActive(e) {
      this.$el.querySelectorAll(".input").forEach(i => {
        if (i.value.length == 0) {
          i.parentNode.classList.remove("active");
        }
      });
      e.target.parentNode.classList.add("active");
    },

    hideCvDiv() {
      var x = document.getElementById("cvDiv");

      x.style.display = "none";
    },
    // showCvDiv() {
    //   this.hideCvText();
    //   var x = document.getElementById("cvDiv");
    //   x.style.display = "block";
    // },

    hideMlDiv() {
      var x = document.getElementById("mlDiv");

      x.style.display = "none";
    },

    hideCvText() {
      var x = document.getElementById("cvText");
      x.style.display = "none";
    },
    showCvText() {
      this.hideCvDiv();
      var x = document.getElementById("cvText");
      x.style.display = "block";
    }
  }
};
</script>

<style lang="scss">
.pText {
  margin-top: $base-vertical-rithm * 10;
  font-weight: bold;
  font-size: 24px;
}
.imageIcon {
  width: 80px;
  height: 80px;
}
.uploadContainer {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
.text {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  background: transparent;
  display: none;
}
.email-input {
  background-color: lightgray;
  text-align: center;
  display: inline-block;
  margin: auto;
  width: 25%;
  padding: 0;
}

.wrapper {
  text-align: center;
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
.Apply {
  &__header {
    padding: $base-vertical-rithm * 10;
    h1 {
      margin: $base-vertical-rithm * 10;
      margin-bottom: $base-vertical-rithm * 2;
      width: 100%;
      color: $color-purple;
      font-weight: bold;
      font-size: 52px;
      line-height: 60px;
      display: inline-block;
    }
    &-image {
      width: 55%;
      display: inline-block;
    }
    &-dates {
      margin-left: $base-vertical-rithm * 15;
      margin-top: $base-vertical-rithm * 15;
      width: 100%;
      display: inline-block;
      vertical-align: top;
      div {
        display: inline-block;
        width: calc(25% - 20px);
      }
      h3 {
        font-weight: bold;
        color: $color-purple;
      }
      h4 {
        color: $color-purple;
        font-weight: bold;
      }
    }
  }
  &__content {
    width: 70%;
    margin: 0 auto;
    h1 {
      color: $color-purple;
    }
    ul li {
      list-style: disc;
    }
    ul + p {
      margin-top: 1rem;
    }
  }
  &__form {
    width: 75%;
    margin-left: 2.5%;
    padding: $base-vertical-rithm * 10;

    p,
    h1 {
      margin-left: 50px;
      color: $color-purple;
    }
    h1 {
      font-weight: bold;
      font-size: 36px;
      width: 60%;
      line-height: 36px;
    }
    p {
      margin-top: $base-vertical-rithm * 10;
      font-weight: bold;
      font-size: 24px;
    }
  }
}
.About {
  &__header {
    padding: $base-vertical-rithm * 5;
    text-align: center;

    a {
      color: $color-purple;
      font-weight: bold;
      font-size: 32px;
      line-height: 40px;
      span:after {
        bottom: -5px;
      }
    }
    &-content {
      display: inline-block;
      width: 50%;
      text-align: center;
      padding: $base-vertical-rithm * 5;
      & > div {
        margin-top: $base-vertical-rithm * 2;
      }
    }
    &-image {
      width: 50%;
      display: inline-block;
      vertical-align: top;
    }
  }
  &__container {
    margin: 0 $base-vertical-rithm * 5;
    h1 {
      margin-bottom: $base-vertical-rithm * 5;
      color: $color-purple;
      font-weight: normal;
      font-size: 42px;
      line-height: 50px;
    }
    &.how {
      margin-left: -50px;
      .About__container-image {
        margin-left: 0;
      }
    }

    &.who {
      margin-right: -100px;
      .About__container-image {
        margin-right: 0;
      }
    }

    &.footer {
      .About__container-image {
        margin-left: 25%;
        width: 50%;
      }
    }

    & > div {
      display: inline-block;
      width: calc(50% - 100px);
      vertical-align: top;
      margin: 50px;
      a {
        color: $color-purple;
        font-weight: bold;
        font-size: 32px;
        line-height: 40px;
        margin-bottom: 40px;
        display: block;
        span:after {
          bottom: -5px;
        }
      }
    }
  }
  &__footer {
    margin: 0 $base-vertical-rithm * 10;
    a {
      margin: 50px;
      display: inline-block;
      font-weight: bold;
      font-size: 30px;
      line-height: 40px;
      &:nth-child(2) {
        margin-left: 25%;
      }
    }
  }
}
</style>