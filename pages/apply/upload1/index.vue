<template>
  <div>
    <Main class="UploadAssignment container">
      <div class="UploadAssignment__header">
        <h1 ref="pageNameHeader">Upload your Assignment. </h1>
      </div>

      <div ref="UploadAssignment__form" class="UploadAssignment__form form">
        <form>
          <fieldset>
            <div class="half-width inputContainer">
              <label for="url">Assignment URL: (*)</label>
              <input ref="url" type="url" name="url" class="input" @change="handleFileUpload()" @focus="setActive" @click="emptyUrlRequired()">
            </div>
                      
            <div ref="assignmentDiv">
              <P @click="openUploadFileDialogue()">+ Upload Assignment screenshot (*)</P>            
              <input ref="input_file_assignment" type="file" class="UploadAssignment__form-inputText" name="input_file_assignment" @change="handleFileUpload1();imgCheckExtension()" >
              <h3 ref="requiredMSG"/>
              <div ref="assignmentName"><span ref="assignmentLabel" class="UploadAssignment__form-assignemntLabel"/>
                <button class="UploadAssignment__form-remove-btn" @click.prevent="removeAssignmentFile()">Remove</button>                                                       
              </div>
            </div>

            <div class="half-width inputContainer">
              <label for="email">e-mail (*)</label>
              <input ref="email" type="email" name="email" class="input" value=""                                           
                     @change="handleEmail()" @focus="setActive" @click="emptyEmailRequired()">
            </div>

            <div class="UploadAssignment__form-byTextArea">
              <p>Is there anything you would like to notify us about?</p>
              <textarea ref="message" name="message" class="UploadAssignment__form-textarea" rows="4" cols="50" placeholder="This can be anything :)" @change="handleMessage()"/>
            </div>
                           
            <div class="apply-btn">
              <input type="submit" name="Apply" value="Apply" true @click.prevent="submitForm()">
            </div>
                    
          </fieldset>
        </form>
                
      </div>
      <div>
        <p ref="successMessage" class="UploadAssignment__successMessage"/>
      </div>
    </Main>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import Upload from "~/components/upload/upload";
export default {
    async asyncData() {
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
        submitForm() {
            // Initialize the form data
            let formData = new FormData();
            const {
                url,
                input_file_assignment,
                email,
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
                email.value !== "Invalid Email" &&
                url.value !== "" &&
                url.value !== null &&
                url.value !== "Required field" &&
                url.value !== "Invalid URL" &&
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
            const { url } = this.$refs;
            if (this.checkUrl() === true) {
                this.urlData = url;
                url.value = this.urlData.value;
            }
        },
        checkUrl() {
            const { url } = this.$refs;
            var inputUrl = url.value;
            var pattern = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-[\]/]))?/;
            if (!pattern.test(inputUrl)) {
                url.parentNode.classList.remove("active");
                url.parentNode.classList.add("active");
                url.value = "Invalid URL";
                url.focus;
                return false;
            } else {
                return true;
            }
        },
        handleFileUpload1() {
            const { input_file_assignment, assignmentLabel } = this.$refs;
            this.assignmentData = input_file_assignment.files[0];
            this.assignmentNameShow();
            this.$refs.requiredMSG.innerHTML = "";
            assignmentLabel.innerHTML =
                "You Uploaded the file: " + this.assignmentData.name;
        },
        handleEmail() {
            const { email } = this.$refs;
            if (this.isValidEmail() === true) {
                this.emailData = email;
                email.value = this.emailData.value;
            }
        },
        isValidEmail() {
            const { email } = this.$refs;
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(email.value)) {
                email.parentNode.classList.remove("active");
                email.parentNode.classList.add("active");
                email.value = "Invalid Email";
                email.focus;
                return false;
            } else {
                return true;
            }
        },
        //validate screenshot exetinsion
        imgCheckExtension() {
            const { assignmentLabel } = this.$refs;
            var file = this.$refs.input_file_assignment;
            if (
                /\.(jpg|jpeg|png|gif|ico|svg)$/i.test(file.files[0].name) ===
                false
            ) {
                this.$refs.requiredMSG.innerHTML = "Invalid File Type!";
                this.assignmentNameShow();
                assignmentLabel.innerHTML = "";
                this.removeAssignmentFile();
                return false;
            }
        },

        handleMessage() {
            const { message } = this.$refs;
            this.messageData = message;
            message.value = this.messageData.value;
        },
        successMSG() {
            const { url, email, message, successMessage } = this.$refs;
            successMessage.innerHTML =
                "You have submitted your Assignment successfully.";
            email.value = "";
            url.value = "";
            message.value = "";
            this.hideForm();
        },
        // Handles when the add file clicked
        openUploadFileDialogue() {
            const { input_file_assignment } = this.$refs;
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
            var x = this.$refs.assignmentDiv;
            x.style.display = "none";
        },
        assignmentNameShow() {
            var x = this.$refs.assignmentName;
            x.style.display = "block";
        },
        assignmentNameHide() {
            var x = this.$refs.assignmentName;
            x.style.display = "none";
        },
        emptyEmailRequired() {
            const { email } = this.$refs;
            if (email.value) {
                email.parentNode.classList.remove("active");
            }
            email.parentNode.classList.add("active");
            email.value = "";
        },
        emptyUrlRequired() {
            const { url } = this.$refs;
            if (url.value) {
                url.parentNode.classList.remove("active");
            }
            url.parentNode.classList.add("active");
            url.value = "";
        },
        hideForm() {
            var x = this.$refs.UploadAssignment__form;
            var y = this.$refs.pageNameHeader;
            y.style.display = "none";
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
            cursor: pointer;
        }
        h3 {
            margin-top: $base-vertical-rithm * 2;
            font-size: 16px;
            margin-left: 50px;
        }
        &-assignemntLabel {
            margin: $base-vertical-rithm * 10;
            margin-bottom: $base-vertical-rithm * 2;
            margin-left: 60px;
            font-size: 14px;
            line-height: 5px;
            display: inline-block;
        }
        &-inputText {
            font-size: 18px;
            padding: 10px 10px 10px 5px;
            display: block;
            width: 100%;
            border: none;
            background: transparent;
            display: none;
            cursor: pointer;
        }
        &-remove-btn {
            border: 2px solid $color-purple;
            padding: 0px 10px;
            text-transform: uppercase;
            font-weight: 100;
            top: 2px;
            right: 0;
            margin: $base-vertical-rithm * 1 $base-vertical-rithm * 5;
        }
        &-byTextArea {
            display: grid;
            grid-auto-flow: row;
        }
        &-textarea {
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
    &__successMessage {
        margin-top: $base-vertical-rithm * 10;
        font-weight: bold;
        font-size: 24px;
        color: $color-purple;
        text-align: center;
    }
}
</style>
