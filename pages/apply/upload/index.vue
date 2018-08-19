<template>
  <div>
    <Main class="UploadCv container">
      <div id="UploadCv__header" class="UploadCv__header">
        <h1 ref="pageNameHeader">Upload CV and Motivation Letter!</h1>
      </div>

      <div id="UploadCv__form" class="UploadCv__form form">
        <form id="cvUploadForm">
          <fieldset>  
            <div id="cvDiv">
              <p id="uploadCvText" ref="uploadCvText" @click="openUploadFileDialogue()">+ Upload Your CV (*)</p>                          
              <input id="input_file_cv" ref="input_file_cv" type="file" value="" class="UploadCv__form__inputText" name="input_file_cv" @change="setCVCheckBoxUnActive(); handleCvUpload();cvCheckExtension()" >
              <h3 ref="requiredCvMSG"/>
              <div id="cvName"><span id="cvLabel" ref="cvLabel" class="UploadCv__form__label"/>
                <button class="UploadCv__form__remove-btn" @click.prevent="removeCvFile()">Remove</button>
              </div>
            </div>

            <div id="cvDiv_TextArea" class="UploadCv__form__section">
              <div class="UploadCv__form__insideDiv">
                <p ref="cv2Lable" class="cv2Lable">I do not have a CV I can upload:</p>
                <div class="UploadCv__form__checkboxDiv">
                  <input id="input_checkbox_cv" ref="input_checkbox_cv" type="checkbox" value="" class="UploadCv__form__checkInput" name="check" @click="showCV2()" >
                </div>
              </div>
              <textarea id="textArea_cv" ref="textArea_cv" name="textArea_cv" class="UploadCv__form__textarea" rows="4" cols="50" placeholder="Please tell us something about your work and/or eduational background"/>
            </div>

            <div id="motivation_letter_Div">
              <P ref="uploadMlText" @click="openUploadFileDialogue1()">+ Upload Your Motivation Letter (*)</P>                          
              <input id="input_file_motivation_letter" ref="input_file_motivation_letter" type="file" class="UploadCv__form__inputText" name="input_file_motivation_letter" @change="setMlCheckBoxUnActive(); handleMotivationLetterUpload();mlCheckExtension()" >
              <h3 ref="requiredMlMSG"/>
              <div id="mlName"><span id="mlLabel" ref="mlLabel" class="UploadCv__form__label"/>
                <button class="UploadCv__form__remove-btn" @click.prevent="removeMlFile()">Remove</button>    
              </div>
            </div>
                       
            <div id="motivation_letterDiv_TextArea" class="UploadCv__form__section">
              <div class="UploadCv__form__insideDiv">
                <p ref="ml2Lable" class="ml2Lable">I rather write my motivation letter in a text box:</p>
                <div class="UploadCv__form__checkboxDiv">
                  <input id="input_checkbox_motivation_letter" ref="input_checkbox_motivation_letter" type="checkbox" value="" class="UploadCv__form__checkInput" name="check" @click="showML2()" >
                </div>
              </div>
              <textarea id="textArea_motivation_letter" ref="textArea_motivation_letter" name="textArea_motivation_letter" class="UploadCv__form__textarea" rows="4" cols="50" placeholder="Please tell us why it is that you would like to apply to our program and also what it is specifically about coding that interests you."/>
            </div>

            <div class="half-width inputContainer">
              <label for="email">e-mail (*)</label>
              <input id="email" ref="email" type="email" name="email" class="input" value="" @change="handleEmail()" @focus="setActive" @click="emptyEmailRequired()">
            </div>

                     
            <div id="message_TextArea" class="UploadCv__form__section">
              <div class="UploadCv__form__insideDiv">
                <p class="messageLabel">Is there anything you would like to notify us about?</p>
              </div>
              <textarea id="textArea_message" ref="textArea_message" name="textArea_message" class="UploadCv__form__textarea" rows="4" cols="50" placeholder="This can be anything :)" @change="handleMessage()"/>
            </div>

            <div class="apply-btn">
              <input type="submit" name="Apply" value="Apply" true @click.prevent="submitFile">
            </div>
          </fieldset>
        </form> 
      </div>
      <div>
        <p id="success-Msg" class="UploadCv__success-Msg"/>
      </div>
    </Main>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
export default {
    async asyncData() {
        return {
            formUrlApply: process.env.lambdaUrl + "apply/upload",
            siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I"
        };
    },
    components: {},
    data() {
        return {
            cvData: "",
            motivationLetterData: "",
            emailData: "",
            messageData: ""
        };
    },
    computed: {
        checkCvLength: function() {
            const { input_file_cv } = this.$refs;
            return input_file_cv.value;
        },
        checkMlLength: function() {
            const { input_file_motivation_letter } = this.$refs;
            return input_file_motivation_letter.value;
        }
    },
    mounted: function() {
        this.cvNameHide();
        this.mlNameHide();
        this.cvTextHide();
        this.mlTextHide();
    },
    methods: {
        submitFile() {
            // Initialize the form data
            let formData = new FormData();
            const {
                input_file_cv,
                input_file_motivation_letter,
                textArea_cv,
                textArea_motivation_letter,
                email,
                cvLabel,
                mlLabel
            } = this.$refs;
            //  Add the form data we need to submit
            if (input_file_cv.files.length !== 0) {
                formData.append("input_file_cv", this.cvData);
            } else {
                formData.append("input_file_cv", textArea_cv.value);
            }
            if (input_file_motivation_letter.files.length !== 0) {
                formData.append(
                    "input_file_motivation_letter",
                    this.motivationLetterData
                );
            } else {
                formData.append(
                    "input_file_motivation_letter",
                    textArea_motivation_letter.value
                );
            }
            formData.append("email", this.emailData.value);
            formData.append("textArea_message", this.messageData.value);
            //  Make the request to the POST /single-file URL
            if (
                email.value !== "" &&
                email.value !== null &&
                email.value !== "Required field" &&
                email.value !== "Invalid Email" &&
                cvLabel.innerHTML !== "Invalid File Type!" &&
                (cvLabel.innerHTML !== "" || textArea_cv.value !== "") &&
                (mlLabel.innerHTML !== "" ||
                    textArea_motivation_letter.value !== "")
            ) {
                axios
                    .post("/apply/upload", formData, {
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
                this.successMSG(); // print successful message
                this.emptyInputs(); // reset all inputs and textarea
            } else {
                if (email.value === "") {
                    email.parentNode.classList.remove("active");
                    email.parentNode.classList.add("active");
                    email.value = "Required field";
                }
                if (input_file_cv.value === "") {
                    this.cvNameShow();
                    this.$refs.requiredCvMSG.innerHTML = "Required field";
                }
                if (input_file_motivation_letter.value === "") {
                    this.$refs.requiredMlMSG.innerHTML = "Required field";
                }
            }
            this.showCV2();
            this.showML2();
            this.removeMlFile();
            this.removeCvFile();
        },
        // Handles a change on the file upload
        handleCvUpload() {
            const { input_file_cv, cvLabel } = this.$refs;
            // const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
            if (
                this.checkCvLength !== "" &&
                this.checkCvLength !== undefined &&
                this.checkCvLength !== null
            ) {
                this.cvData = input_file_cv.files[0];
                this.cvNameShow();
                this.$refs.requiredCvMSG.innerHTML = "";
                cvLabel.innerHTML =
                    "You Uploaded the file: " + this.cvData.name;
            } else {
                delete this.cvData;
                cvLabel.innerHTML = "";
            }
        },
        // vlidate cv file exetinsion
        cvCheckExtension() {
            var file = document.getElementById("input_file_cv");
            if (/\.(doc|docx|pdf|txt)$/i.test(file.files[0].name) === false) {
                this.$refs.requiredCvMSG.innerHTML = "Invalid File Type!";
                this.cvNameShow();
                this.removeCvFile();
                return false;
            }
        },
        //validate ML file exetinsion
        mlCheckExtension() {
            var file = document.getElementById("input_file_motivation_letter");
            if (/\.(doc|docx|pdf|txt)$/i.test(file.files[0].name) === false) {
                this.$refs.requiredMlMSG.innerHTML = "Invalid File Type!";
                this.mlNameShow();
                this.removeMlFile();
            }
        },

        handleMotivationLetterUpload() {
            const { input_file_motivation_letter, mlLabel } = this.$refs;
            if (
                this.checkMlLength !== "" &&
                this.checkMlLength !== undefined &&
                this.checkMlLength !== null
            ) {
                this.motivationLetterData =
                    input_file_motivation_letter.files[0];
                this.mlNameShow();
                this.$refs.requiredMlMSG.innerHTML = "";
                mlLabel.innerHTML =
                    "You Uploaded the file: " + this.motivationLetterData.name;
            } else {
                delete this.motivationLetterData;
                mlLabel.innerHTML = "";
            }
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
            const re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
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
        handleMessage() {
            const { textArea_message } = this.$refs;
            this.messageData = textArea_message;
            textArea_message.value = this.messageData.value;
        },
        successMSG() {
            const { email, textArea_message } = this.$refs;
            document.getElementById("success-Msg").innerHTML =
                "You have submitted your CV and motivation letter successfully.";
            email.value = "";
            email.parentNode.classList.remove("active");
            textArea_message.value = "";
            this.hideForm();
        },
        // Handles when the image clicked
        openUploadFileDialogue() {
            const { input_file_cv } = this.$refs;
            input_file_cv.click();
        },
        openUploadFileDialogue1() {
            const { input_file_motivation_letter } = this.$refs;
            input_file_motivation_letter.click();
        },
        // Removes a select file the user has uploaded
        removeCvFile() {
            const { input_file_cv, cvLabel } = this.$refs;
            input_file_cv.value = "";
            this.cvNameHide();
            this.setCvCheckBoxActive();
            cvLabel.innerHTML = "";
            this.$refs.input_checkbox_cv.disabled = false;
        },
        removeMlFile() {
            const { input_file_motivation_letter, mlLabel } = this.$refs;
            input_file_motivation_letter.value = "";
            this.mlNameHide();
            this.setMlCheckBoxActive();
            mlLabel.innerHTML = "";
            this.$refs.input_checkbox_motivation_letter.disabled = false;
        },
        setActive(e) {
            this.$el.querySelectorAll(".input").forEach(i => {
                if (i.value.length == 0) {
                    i.parentNode.classList.remove("active");
                }
            });
            e.target.parentNode.classList.add("active");
        },
        //disable cv checkbox when input upload is active
        setCVCheckBoxUnActive() {
            var x = this.$refs.cv2Lable;
            x.classList.add("UploadCv__form__unAvailable");
        },
        //disable ML checkbox when input upload is active
        setMlCheckBoxUnActive() {
            var element = this.$refs.ml2Lable;
            element.classList.add("UploadCv__form__unAvailable");
        },
        //Enable CV checkbox when input upload is inactive
        setCvCheckBoxActive() {
            var element = this.$refs.cv2Lable;
            element.classList.remove("UploadCv__form__unAvailable");
            element.classList.add("UploadCv__form____Available");
        },
        //Enable ML checkbox when input upload is inactive
        setMlCheckBoxActive() {
            var element = this.$refs.ml2Lable;
            element.classList.remove("UploadCv__form__unAvailable");
            element.classList.add("UploadCv__form____Available");
        },
        //disable CV input upload when checkbox is active
        setCvUnActive() {
            var element = this.$refs.uploadCvText;
            element.classList.add("UploadCv__form__unAvailable");
        },
        //disable ML input upload when checkbox is active
        setMlUnActive() {
            var element = this.$refs.uploadMlText;
            element.classList.add("UploadCv__form__unAvailable");
        },
        //Enable CV input upload when checkbox is inactive
        setCvActive() {
            var element = this.$refs.uploadCvText;
            element.classList.remove("UploadCv__form__unAvailable");
            element.classList.add("UploadCv__form____Available");
        },
        //Enable ML input upload when checkbox is inactive
        setMlActive() {
            var element = this.$refs.uploadMlText;
            element.classList.remove("UploadCv__form__unAvailable");
            element.classList.add("UploadCv__form____Available");
        },
        // Show & Hide CV CheckBox/Textarea section
        showCV2() {
            const { input_file_cv, textArea_cv } = this.$refs;
            var checkBox = this.$refs.input_checkbox_cv;
            var cvText = textArea_cv;
            if (checkBox.checked === true) {
                cvText.style.display = "block";
                delete this.cvData;
                input_file_cv.value = "";
                this.setCvUnActive();
                input_file_cv.disabled = true;
            } else {
                cvText.style.display = "none";
                this.setCvActive();
                input_file_cv.disabled = false;
            }
        },
        // Show & Hide ML CheckBox/Textarea section
        showML2() {
            const { input_file_motivation_letter } = this.$refs;
            var checkBox = this.$refs.input_checkbox_motivation_letter;
            var mlText = this.$refs.textArea_motivation_letter;
            if (checkBox.checked === true) {
                mlText.style.display = "block";
                delete this.motivationLetterData;
                input_file_motivation_letter.value = "";
                this.setMlUnActive();
                input_file_motivation_letter.disabled = true;
            } else {
                mlText.style.display = "none";
                this.setMlActive();
                input_file_motivation_letter.disabled = false;
            }
        },
        //Show Cv filename
        cvNameShow() {
            this.cvNameHide();
            this.disableCvCheckbox();
            var x = document.getElementById("cvName");
            x.style.display = "block";
        },
        //Hide CV filename
        cvNameHide() {
            var x = document.getElementById("cvName");
            x.style.display = "none";
        },
        cvTextHide() {
            const { textArea_cv } = this.$refs;
            var x = textArea_cv;
            x.style.display = "none";
        },
        mlTextHide() {
            const { textArea_motivation_letter } = this.$refs;
            var x = textArea_motivation_letter;
            x.style.display = "none";
        },
        //Show ML filename
        mlNameShow() {
            this.mlNameHide();
            this.disableMotivationLetterCheckbox();
            var x = document.getElementById("mlName");
            x.style.display = "block";
        },
        //Hide ML filename
        mlNameHide() {
            var x = document.getElementById("mlName");
            x.style.display = "none";
        },
        disableCvCheckbox() {
            const { input_file_cv } = this.$refs;
            if (input_file_cv.files.length !== 0) {
                this.$refs.input_checkbox_cv.disabled = true;
            }
        },
        disableMotivationLetterCheckbox() {
            const { input_file_motivation_letter } = this.$refs;
            if (input_file_motivation_letter.files.length !== 0) {
                this.$refs.input_checkbox_motivation_letter.disabled = true;
            }
        },
        emptyInputs() {
            const {
                input_file_cv,
                input_file_motivation_letter,
                textArea_cv,
                textArea_motivation_letter,
                cvLabel,
                textArea_message
            } = this.$refs;
            input_file_cv.value = "";
            input_file_motivation_letter.value = "";
            cvLabel.value = "";
            textArea_cv.value = "";
            textArea_motivation_letter.value = "";
            textArea_message.value = "";
            this.$refs.input_checkbox_cv.checked = false;
            this.$refs.input_checkbox_motivation_letter.checked = false;
        },
        emptyEmailRequired() {
            const { email } = this.$refs;
            if (email.value) {
                email.parentNode.classList.remove("active");
            }
            email.parentNode.classList.add("active");
            email.value = "";
        },
        hideForm() {
            var x = document.getElementById("UploadCv__form");
            var y = this.$refs.pageNameHeader;
            y.style.display = "none";
            x.style.display = "none";
        }
    }
};
</script>
<style lang="scss">
.UploadCv {
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
            margin-left: 50px;
            color: $color-purple;
            margin-top: $base-vertical-rithm * 10;
            font-weight: bold;
            font-size: 24px;
            cursor: pointer;
        }
        h3 {
            margin-top: $base-vertical-rithm * 2;
            font-size: 16px;
            margin-left: 50px;
        }
        &__unAvailable {
            color: $color-white;
            text-decoration-line: line-through;
            //border: 2px solid blue;
        }
        &__Available {
            margin-left: 50px;
            color: $color-purple;
            margin-top: $base-vertical-rithm * 10;
            font-weight: bold;
            font-size: 24px;
            cursor: pointer;
        }
        &__inputText {
            font-size: 18px;
            padding: 10px 10px 10px 5px;
            display: block;
            width: 100%;
            border: none;
            background: transparent;
            display: none;
            cursor: pointer;
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
        &__insideDiv {
            display: flex;
        }
        &__checkInput {
            margin-top: 18px;
            margin-left: 10px;
            zoom: 2.7;
        }
        &__textarea {
            overflow: auto;
            outline: none;
            background-color: #e6e6e6;
            padding: 12px 20px;
            box-sizing: border-box;
            border: 2px solid $color-purple;
            border-radius: 5px;
            margin-left: 60px;
            font-size: 16px;
        }
        &__label {
            margin: $base-vertical-rithm * 10;
            margin-bottom: $base-vertical-rithm * 2;
            margin-left: 60px;
            font-size: 16px;
            line-height: 5px;
            display: inline-block;
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
