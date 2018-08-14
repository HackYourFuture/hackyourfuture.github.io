<template>
        <div>
        <Main class="UploadAssignment container">
            <div class="UploadAssignment__header">
                <h1>Upload your Assignment. </h1>
               
            </div>

            <div id="UploadAssignment__form" class="UploadAssignment__form form">
                <form id="assignmentUploadForm">
                    <fieldset>   
                        <div class="half-width inputContainer">
                            <label for="url">Assignment URL: (*)</label>
                            <input type="url" id="url" ref="url" class="input" name="url" v-on:change="handleFileUpload()" @focus="setActive" @click="emptyUrlRequired()">
                        </div>
                      
                         <div id="assignmentDiv">
                            <P v-on:click="openUploadFileDialogue()">+ Upload Assignment screenshot (*)</P>            
                            <input type="file" class="UploadAssignment__form__inputText" id="input_file_assignment" ref="input_file_assignment" v-on:change="handleFileUpload1()" />
                            <h3 ref="requiredMSG"></h3>
                            <div id="assignmentName"><span id="assignmentLabel" ref="assignmentLabel" class="UploadAssignment__form__assignemntLabel"></span>
                            <button class="UploadAssignment__form__remove-btn" @click.prevent="removeAssignmentFile()">Remove</button>                                                       
                            </div>
                        </div>

                        <div class="half-width inputContainer">
                            <label for="email">e-mail (*)</label>
                            <input type="email" id="email" ref="email" class="input" name="email" value=""                                           
                             v-on:change="handleEmail()" @focus="setActive" @click="emptyEmailRequired()">
                        </div>

                        <div id="message_TextArea" class="UploadAssignment__form__section">
                          <p class="messageLabel">Is there anything you would like to notify us about?</p>
                          <textarea id="message" ref="message" class="UploadAssignment__form__textarea" rows="4" cols="50" placeholder="Your Question" v-on:change="handleMessage()"></textarea>
                        </div>
                           
                        <div class="apply-btn">
                            <input type="submit" value="Apply" @click.prevent="submitFile()" true>
                        </div>
                    
                    </fieldset>
                </form>
                
            </div>
            <div>
                  <p id="success-Msg" class="UploadAssignment__success-Msg"></p>
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
      urlData: "",
      assignmentData: "",
      emailData: "",
      messageData: ""
    };
  },

  mounted: function() {
    this.assignmentNameHide();
  },

  methods: {
    submitFile() {
      // Initialize the form data
      let formData = new FormData();
      const {
        url,
        input_file_assignment,
        email,
        message,
        assignmentLabel
      } = this.$refs;

      // Add the form data we need to submit
      formData.append("url", this.urlData.value);
      formData.append("input_file_assignment", this.assignmentData);
      formData.append("email", this.emailData.value);
      formData.append("message", this.messageData.value);

      // Make the request to the POST /single-file URL
      if (
        email.value !== "" &&
        email.value !== null &&
        email.value !== "Required field" &&
        url.value !== "" &&
        url.value !== null &&
        url.value !== "Required field" &&
        assignmentLabel.innerHTML !== ""
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
        if (email.value === "") {
          email.parentNode.classList.remove("active");
          email.parentNode.classList.add("active");
          email.value = "Required field";
        }
        if (url.value === "") {
          url.parentNode.classList.remove("active");
          url.parentNode.classList.add("active");
          url.value = "Required field";
        }
        if (input_file_assignment.value === "") {
          this.$refs.requiredMSG.innerHTML = "Required field";
        }
      }
      this.removeAssignmentFile();
    },

    // Handles a change on the url upload
    handleFileUpload() {
      this.urlData = url;
      url.value = this.urlData.value;
    },

    handleFileUpload1() {
      this.assignmentData = input_file_assignment.files[0];
      this.assignmentNameShow();
      this.$refs.requiredMSG.innerHTML = "";
      assignmentLabel.innerHTML =
        "You Uploaded the file: " + this.assignmentData.name;
    },

    handleEmail() {
      this.emailData = email;
      email.value = this.emailData.value;
    },

    handleMessage() {
      this.messageData = message;
      message.value = this.messageData.value;
    },

    successMSG() {
      document.getElementById("success-Msg").innerHTML =
        "You Have Submitted Successfully !";
      email.value = "";
      url.value = "";
      message.value = "";
      this.hideForm();
    },

    // Handles when the add file clicked
    openUploadFileDialogue() {
      input_file_assignment.click();
    },

    // Removes a select file the user has uploaded
    removeAssignmentFile() {
      delete this.assignmentData;
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
    },
    emptyEmailRequired() {
      if (email.value) {
        email.parentNode.classList.remove("active");
      }
      email.parentNode.classList.add("active");
      email.value = "";
    },
    emptyUrlRequired() {
      if (url.value) {
        url.parentNode.classList.remove("active");
      }
      url.parentNode.classList.add("active");
      url.value = "";
    },
    hideForm() {
      var x = document.getElementById("UploadAssignment__form");
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
    h3 {
      margin-top: $base-vertical-rithm * 2;
      font-size: 16px;
      margin-left: 50px;
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
    &__section {
      display: grid;
      grid-auto-flow: row;
    }
    &__textarea {
      overflow: auto;
      outline: none;
      background-color: #e6e6e6;
      padding: 12px 20px;
      box-sizing: border-box;
      border: 2px solid $color-purple;
      border-radius: 5px;
      margin-left: 50px;
      font-size: 16px;
    }
  }

  &__success-Msg {
    margin-top: $base-vertical-rithm * 10;
    font-weight: bold;
    font-size: 24px;
    color: $color-purple;
    text-align: center;
  }
}
</style>