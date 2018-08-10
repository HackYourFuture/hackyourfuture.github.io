<template>
        <div>
        <Main class="Apply container">
            <div class="Apply__header">
                <h1>Upload your Assignment. </h1>
                <div class="Apply__header-image"></div> 
            </div>

            <div class="Apply__form form">
                <form>
                    <fieldset>   
                        <div class="half-width inputContainer">
                            <label for="url">Assignment URL: (*)</label>
                            <input type="url" id="url" ref="url" class="input" name="url" value="" v-on:change="handleEmail()" @focus="setActive">
                        </div>
                      
                         <div id="assiDiv">
                            <P v-on:click="openUploadFileDialogue1()">+ Upload Assignment screenshot (*)</P>            
                            <input type="file" class="text" id="file1" ref="file1" v-on:change="handleFileUpload1()" />
                            <div id="assiName"><span id="assiLabel"></span>
                            <button @click="removeAssiFile()">Remove</button>                                                       
                            </div>
                        </div>

                        <div class="half-width inputContainer">
                            <label for="email">e-mail (*)</label>
                            <input type="email" id="email" ref="email" class="input" name="email" value="" v-on:change="handleEmail()" @focus="setActive">
                        </div>

                      
                          <div class="full-width inputContainer">
                            <label for="message">Is there anything you would like to notify us about?</label>
                            <input type="message" id="message" ref="message" name="message" value="" v-on:change="handleMessage()" @focus="setActive">
                          </div>

                           
                        <div class="apply-btn">
                            <input type="submit" value="Apply" v-on:click.prevent="submitFile" true>
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
    try {
    } catch (e) {}
    return {
      formUrlApply: process.env.lambdaUrl + "apply/upload",
      siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I"
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
    this.assiNameHide();
  },

  methods: {
    submitFile() {
      // Initialize the form data
      let formData = new FormData();
      //  Add the form data we need to submit
      formData.append("file", this.file);
      formData.append("file1", this.file1);
      formData.append("email", this.email.value);
      formData.append("message", this.message.value);
      //  Make the request to the POST /single-file URL
      if (
        document.getElementById("email").value !== "" &&
        document.getElementById("email").value !== null &&
        document.getElementById("email").value !== "Required field" &&
        document.getElementById("url").value !== "" &&
        document.getElementById("url").value !== null &&
        document.getElementById("url").value !== "Required field" &&
        document.getElementById("assiLabel").innerHTML !== ""
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

        if (document.getElementById("url").value === "") {
          if (document.getElementById("url").value === "") {
            document
              .getElementById("url")
              .parentNode.classList.remove("active");
          }
          document.getElementById("url").parentNode.classList.add("active");
          document.getElementById("url").value = "Required field";
        }

        if (document.getElementsByClassName("imageIcon").innerHTML === "") {
          document.getElementsByClassName("imageIcon").innerHTML =
            "Required field";
        }
      }
      document.getElementById("assignmentUploadForm").reset();
      this.removeAssiFile();
    },
    // Handles a change on the file upload
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file.name);
      let xx = this.file;
      console.log(xx);
    },

    handleFileUpload1() {
      this.file1 = this.$refs.file1.files[0];
      console.log(this.file1.name);
      this.assiNameShow();
      document.getElementById("assiLabel").innerHTML =
        "You Uploaded the file: " + this.file1.name;
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

    // Handles when the image clicked
    openUploadFileDialogue() {
      document.getElementById("file").click();
    },

    openUploadFileDialogue1() {
      document.getElementById("file1").click();
    },

    // Removes a select file the user has uploaded
    removeAssiFile() {
      delete this.file1;
      this.assiNameHide();
      console.log(this.file1);
    },

    setActive(e) {
      this.$el.querySelectorAll(".input").forEach(i => {
        if (i.value.length == 0) {
          i.parentNode.classList.remove("active");
        }
      });
      e.target.parentNode.classList.add("active");
    },

    hideAssiDiv() {
      var x = document.getElementById("assiDiv");
      x.style.display = "none";
    },

    assiNameShow() {
      var x = document.getElementById("assiName");
      x.style.display = "block";
    },
    assiNameHide() {
      var x = document.getElementById("assiName");
      x.style.display = "none";
    }
  }
};
</script>
<style lang="scss">
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

    .imageIcon {
      width: 30px;
      height: 30px;
      margin: 10px;
    }

    #assiLabel {
      margin: $base-vertical-rithm * 10;
      margin-bottom: $base-vertical-rithm * 2;
      margin-left: 60px;
      font-size: 14px;
      line-height: 5px;
      display: inline-block;
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
  }
}
</style>