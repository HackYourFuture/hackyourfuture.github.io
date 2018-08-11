<template>
        <div>
        <Main class="UploadAssignment container">
            <div class="UploadAssignment__header">
                <h1>Upload your Assignment. </h1>
               
            </div>

            <div class="UploadAssignment__form form">
                <form id="assignmentUploadForm">
                    <fieldset>   
                        <div class="half-width inputContainer">
                            <label for="url">Assignment URL: (*)</label>
                            <input type="url" id="url" ref="url" class="input" name="url" v-on:change="handleFileUpload()" @focus="setActive">
                        </div>
                      
                         <div id="assignmentDiv">
                            <P v-on:click="openUploadFileDialogue()">+ Upload Assignment screenshot (*)</P>            
                            <input type="file" class="UploadAssignment__form__inputText" id="file1" ref="file1" v-on:change="handleFileUpload1()" />
                            <div id="assignmentName"><span id="assignmentLabel" class="UploadAssignment__form__assignemntLabel"></span>
                            <button class="UploadAssignment__form__remove-btn" @click.prevent="removeAssignmentFile()">Remove</button>                                                       
                            </div>
                        </div>

                        <div class="half-width inputContainer">
                            <label for="email">e-mail (*)</label>
                            <input type="email" id="email" ref="email" class="input" name="email" value=""                                           
                             v-on:change="handleEmail()" @focus="setActive">
                        </div>

                      
                          <div class="full-width inputContainer">
                            <label for="message">Is there anything you would like to notify us about?</label>
                            <input type="message" id="message" ref="message" name="message" value="" v-on:change="handleMessage()" @focus="setActive">
                          </div>

                           
                        <div class="apply-btn">
                            <input type="submit" value="Apply" @click.prevent="submitFile()" true>
                        </div>
                    
                    </fieldset>
                     <div>
                  <p id="success-Msg"></p>
                </div>
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
      formUrlApply: process.env.lambdaUrl + "apply/upload1",
      siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I"
    };
  },
  components: {
    Upload
  },
  data() {
    return {
      url: "",
      file1: "",
      email: "",
      message: ""
    };
  },

  mounted: function() {
    this.assignmentNameHide();
  },

  methods: {
    submitFile() {
      // Initialize the form data
      let formData = new FormData();

      // Add the form data we need to submit
      formData.append("url", this.url.value);
      formData.append("file1", this.file1);
      formData.append("email", this.email.value);
      formData.append("message", this.message.value);

      // Make the request to the POST /single-file URL
      if (
        document.getElementById("email").value !== "" &&
        document.getElementById("email").value !== null &&
        document.getElementById("email").value !== "Required field" &&
        document.getElementById("url").value !== "" &&
        document.getElementById("url").value !== null &&
        document.getElementById("url").value !== "Required field" &&
        document.getElementById("assignmentLabel").innerHTML !== ""
      ) {
        axios
          .post("/apply/upload1", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })

          .then(function() {
            console.log("SUCCESS!!");
            console.log(...formData); // to see which files have been sent by POST
          })
          .catch(function() {
            console.log("FAILURE!!");
          });
        this.successMSG();
      } else {
        if (document.getElementById("email").value === "") {
          document
            .getElementById("email")
            .parentNode.classList.remove("active");
          document.getElementById("email").parentNode.classList.add("active");
          document.getElementById("email").value = "Required field";
        }
        if (document.getElementById("url").value === "") {
          document.getElementById("url").parentNode.classList.remove("active");
          document.getElementById("url").parentNode.classList.add("active");
          document.getElementById("url").value = "Required field";
        }
      }
      this.removeAssignmentFile();
    },

    // Handles a change on the url upload
    handleFileUpload() {
      this.url = this.$refs.url;
      document.getElementById("url").value = this.url.value;
    },

    handleFileUpload1() {
      this.file1 = this.$refs.file1.files[0];
      this.assignmentNameShow();
      document.getElementById("assignmentLabel").innerHTML =
        "You Uploaded the file: " + this.file1.name;
    },

    handleEmail() {
      this.email = this.$refs.email;
      document.getElementById("email").value = this.email.value;
    },

    handleMessage() {
      this.message = this.$refs.message;
      document.getElementById("message").value = this.message.value;
    },

    successMSG() {
      document.getElementById("success-Msg").innerHTML =
        "You Have Submitted Successfully !";
      document.getElementById("email").value = "";
      document.getElementById("url").value = "";
      document.getElementById("message").value = "";
      console.log("success uploaded");
    },

    // Handles when the add file clicked
    openUploadFileDialogue() {
      document.getElementById("file1").click();
    },

    // Removes a select file the user has uploaded
    removeAssignmentFile() {
      delete this.file1;
      this.assignmentNameHide();
    },

    setActive(e) {
      this.$el.querySelectorAll(".input").forEach(i => {
        if (i.value.length == 0) {
          i.parentNode.classList.remove("active");
        }
      });
      e.target.parentNode.classList.add("active");
    },

    hideAssgnmentiDiv() {
      var x = document.getElementById("assignmentDiv");
      x.style.display = "none";
    },

    assignmentNameShow() {
      var x = document.getElementById("assignmentName");
      x.style.display = "block";
    },

    assignmentNameHide() {
      var x = document.getElementById("assignmentName");
      x.style.display = "none";
    }
  }
};
</script>

<style lang="scss">
.UploadAssignment {
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
  }

  &__form {
    width: 75%;
    margin-left: 2.5%;
    padding: $base-vertical-rithm * 10;

    p {
      margin-top: $base-vertical-rithm * 10;
      font-weight: bold;
      font-size: 24px;
      margin-left: 50px;
      color: $color-purple;
    }

    &__assignemntLabel {
      margin: $base-vertical-rithm * 10;
      margin-bottom: $base-vertical-rithm * 2;
      margin-left: 60px;
      font-size: 14px;
      line-height: 5px;
      display: inline-block;
    }

    &__inputText {
      font-size: 18px;
      padding: 10px 10px 10px 5px;
      display: block;
      width: 100%;
      border: none;
      background: transparent;
      display: none;
    }
    &__remove-btn {
      border: 2px solid $color-purple;
      padding: 0px 10px;
      text-transform: uppercase;
      font-weight: 100;
      top: 2px;
      right: 0;
      margin: $base-vertical-rithm * 1 $base-vertical-rithm * 5;
    }
  }
}
</style>
