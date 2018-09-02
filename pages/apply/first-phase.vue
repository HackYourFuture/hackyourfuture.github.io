<template>
  <div>
    <Main class="UploadCv container">
      <div class="UploadCv__header">
        <h1 ref="pageNameHeader">Upload CV and Motivation Letter!</h1>
      </div>

      <div ref="UploadCv__form" :style="{ display: verified ? 'block' : 'none'}" class="UploadCv__form form">
        <form>
          <fieldset>
            <div>
              <p ref="uploadCvText" @click="openUpload($refs.input_file_cv)">+ Upload Your CV (*)</p>
              <input ref="input_file_cv" type="file" value="" class="UploadCv__form-inputText" name="input_file_cv" @change="handleCvUpload(); fileCheckExtension(
                $refs.input_file_cv,
                $refs.input_checkbox_cv,
                $refs.cvName,
                $refs.cvLabel,
                $refs.writeCvText,
                $refs.requiredCvMSG)
              " >
              <h3 ref="requiredCvMSG"/>
              <div ref="cvName"><span ref="cvLabel" class="UploadCv__form-label"/>
                <button class="UploadCv__form-remove-btn" @click.prevent="removeFile($refs.input_file_cv, $refs.cvLabel,
                                                                                     $refs.cvName,
                                                                                     $refs.input_checkbox_cv,
                                                                                     $refs.writeCvText)">Remove</button>
              </div>
            </div>

            <div class="UploadCv__form-byTextArea">
              <div class="UploadCv__form-labelAndCheckbox">
                <p ref="writeCvText">I rather write my CV in a text box:</p>
                <div>
                  <input ref="input_checkbox_cv" type="checkbox" value="" class="UploadCv__form-checkInput" name="check" @click="showFileByTextArea($refs.input_file_cv,$refs.textArea_cv,$refs.input_checkbox_cv,$refs.uploadCvText)" >
                </div>
              </div>
              <textarea ref="textArea_cv" name="textArea_cv" class="UploadCv__form-textarea" rows="4" cols="50" placeholder="Please tell us something about your work and/or eduational background"/>
            </div>

            <div>
              <P ref="uploadMotivationLetterText" @click="openUpload($refs.input_file_motivation_letter)">+ Upload Your Motivation Letter (*)</P>
              <input ref="input_file_motivation_letter" type="file" class="UploadCv__form-inputText" name="input_file_motivation_letter" @change="handleMotivationLetterUpload(); fileCheckExtension(
                $refs.input_file_motivation_letter,
                $refs.input_checkbox_motivation_letter,
                $refs.motivationLetterName,
                $refs.motivationLetterLabel,
                $refs.writeMotivationLetterText,
                $refs.requiredMotivationLetterMSG)" >
              <h3 ref="requiredMotivationLetterMSG"/>
              <div ref="motivationLetterName"><span ref="motivationLetterLabel" class="UploadCv__form-label"/>
                <button class="UploadCv__form-remove-btn" @click.prevent="removeFile($refs.input_file_motivation_letter,
                                                                                     $refs.motivationLetterLabel,$refs.motivationLetterName,$refs.input_checkbox_motivation_letter,
                                                                                     $refs.writeMotivationLetterText)">Remove</button>
              </div>
            </div>

            <div class="UploadCv__form-byTextArea">
              <div class="UploadCv__form-labelAndCheckbox">
                <p ref="writeMotivationLetterText">I rather write my motivation letter in a text box:</p>
                <div>
                  <input ref="input_checkbox_motivation_letter" type="checkbox" value="" class="UploadCv__form-checkInput" name="check" @click="showFileByTextArea($refs.input_file_motivation_letter,$refs.textArea_motivation_letter,
                                                                                                                                                                   $refs.input_checkbox_motivation_letter,$refs.uploadMotivationLetterText)
                  " >
                </div>
              </div>
              <textarea ref="textArea_motivation_letter" name="textArea_motivation_letter" class="UploadCv__form-textarea" rows="4" cols="50" placeholder="Please tell us why it is that you would like to apply to our program and also what it is specifically about coding that interests you."/>
            </div>

            <div class="half-width inputContainer">
              <input ref="email" :value="email" type="email" name="email" class="input" disabled>
            </div>

            <div class="UploadCv__form-byTextArea">
              <div>
                <p>Is there anything you would like to notify us about?</p>
              </div>
              <textarea ref="textArea_message" name="textArea_message" class="UploadCv__form-textarea" rows="4" cols="50" placeholder="This can be anything :)" @change="handleMessage($refs.textArea_message)"/>
            </div>

            <div class="apply-btn">
              <input type="submit" name="Apply" value="Apply" @click.prevent="submitForm">
            </div>
          </fieldset>
        </form>
      </div>
      <div>
        <p ref="successMessage" class="UploadCv__successMessage"/>
      </div>
    </Main>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
export default {
    async asyncData({ query }) {
        return {
            token: query.token,
            verified: false,
            cvData: "",
            motivationLetterData: "",
            emailData: "",
            messageData: "",
            email: "",
            formUrlApply: process.env.lambdaUrl + "apply/upload",
            siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I"
        };
    },
    async mounted() {
        const token = window.location.search.replace("?token=", "");
        this.token = token;
        try {
            const { data } = await axios.get(
                `${process.env.lambdaUrl}get-applicant?token=${this.token}`
            );
            if (data.email) {
                this.verified = true;
                this.email = data.email;
            }
        } catch (e) {
            console.log("Couldn't get user");
        }

        this.fileNameHide(this.$refs.cvName);
        this.fileNameHide(this.$refs.motivationLetterName);
        this.fileTextHide(this.$refs.textArea_cv);
        this.fileTextHide(this.$refs.textArea_motivation_letter);
    },
    methods: {
        submitForm() {
            let formData = new FormData();
            const {
                input_file_cv,
                input_file_motivation_letter,
                textArea_cv,
                textArea_motivation_letter,
                email,
                cvLabel,
                motivationLetterLabel
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
                (motivationLetterLabel.innerHTML !== "" ||
                    textArea_motivation_letter.value !== "")
            ) {
                axios
                    .post(
                        `${process.env.lambdaUrl}apply/upload?token=${
                            this.token
                        }`,
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        }
                    )
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
                    email.parentNode.classList.add("active");
                    email.value = "Required field";
                }
                if (input_file_cv.value === "") {
                    this.fileNameShow(
                        this.$refs.input_file_cv,
                        this.$refs.input_checkbox_cv,
                        this.$refs.cvName
                    );
                    this.$refs.requiredCvMSG.innerHTML = "Required field";
                }
                if (input_file_motivation_letter.value === "") {
                    this.$refs.requiredMotivationLetterMSG.innerHTML =
                        "Required field";
                }
            }
            this.showFileByTextArea(
                this.$refs.input_file_cv,
                this.$refs.textArea_cv,
                this.$refs.input_checkbox_cv,
                this.$refs.uploadCvText
            );
            this.showFileByTextArea(
                this.$refs.input_file_motivation_letter,
                this.$refs.textArea_motivation_letter,
                this.$refs.input_checkbox_motivation_letter,
                this.$refs.uploadMotivationLetterText
            );
            this.removeFile(
                this.$refs.input_file_cv,
                this.$refs.cvLabel,
                this.$refs.cvName,
                this.$refs.input_checkbox_cv,
                this.$refs.writeCvText
            );
            this.removeFile(
                this.$refs.input_file_motivation_letter,
                this.$refs.motivationLetterLabel,
                this.$refs.motivationLetterName,
                this.$refs.input_checkbox_motivation_letter,
                this.$refs.writeMotivationLetterText
            );
        },
        // Handles a change on the file upload
        handleCvUpload() {
            const { input_file_cv, cvLabel } = this.$refs;
            if (
                this.checkFileLength(input_file_cv) !== "" &&
                this.checkFileLength(input_file_cv) !== undefined &&
                this.checkFileLength(input_file_cv) !== null
            ) {
                this.setCheckBoxUnActive(this.$refs.writeCvText);
                this.cvData = input_file_cv.files[0];
                this.fileNameShow(
                    this.$refs.input_file_cv,
                    this.$refs.input_checkbox_cv,
                    this.$refs.cvName
                );
                this.$refs.requiredCvMSG.innerHTML = "";
                cvLabel.innerHTML =
                    "You Uploaded the file: " + this.cvData.name;
            } else {
                delete this.cvData;
                cvLabel.innerHTML = "";
            }
        },
        handleMotivationLetterUpload() {
            const {
                input_file_motivation_letter,
                motivationLetterLabel
            } = this.$refs;
            if (
                this.checkFileLength(input_file_motivation_letter) !== "" &&
                this.checkFileLength(input_file_motivation_letter) !==
                    undefined &&
                this.checkFileLength(input_file_motivation_letter) !== null
            ) {
                this.setCheckBoxUnActive(this.$refs.writeMotivationLetterText);
                this.motivationLetterData =
                    input_file_motivation_letter.files[0];
                this.fileNameShow(
                    this.$refs.input_file_motivation_letter,
                    this.$refs.input_checkbox_motivation_letter,
                    this.$refs.motivationLetterName
                );
                this.$refs.requiredMotivationLetterMSG.innerHTML = "";
                motivationLetterLabel.innerHTML =
                    "You Uploaded the file: " + this.motivationLetterData.name;
            } else {
                delete this.motivationLetterData;
                motivationLetterLabel.innerHTML = "";
            }
        },
        fileCheckExtension(
            input_file,
            input_checkBox,
            file_Name,
            file_Label,
            write_file_text,
            required_msg
        ) {
            if (
                /\.(doc|docx|pdf|txt)$/i.test(input_file.files[0].name) ===
                false
            ) {
                required_msg.innerHTML = "Invalid File Type!";
                this.fileNameShow(input_file, input_checkBox, file_Name);
                this.removeFile(
                    input_file,
                    file_Label,
                    file_Name,
                    input_checkBox,
                    write_file_text
                );
                return false;
            }
        },
        handleEmail(email) {
            if (this.isValidEmail(email) === true) {
                this.emailData = email;
                email.value = this.emailData.value;
            }
        },
        handleMessage(message) {
            this.messageData = message;
            message.value = this.messageData.value;
        },
        showFileByTextArea(
            input_file,
            textArea_file,
            input_checkBox,
            uploadFile
        ) {
            if (input_checkBox.checked === true) {
                textArea_file.style.display = "block";
                input_file.value = "";
                this.setFileUnActive(uploadFile);
                input_file.disabled = true;
            } else {
                textArea_file.style.display = "none";
                this.setFileActive(uploadFile);
                input_file.disabled = false;
            }
        },
        removeFile(
            input_file,
            file_label,
            file_name,
            input_checkBox,
            writeText
        ) {
            input_file.value = "";
            this.setCheckBoxActive(writeText);
            this.fileNameHide(file_name);
            file_label.innerHTML = "";
            input_checkBox.disabled = false;
        },
        openUpload(e) {
            e.click();
        },
        //check if value of upoaded file is not empty
        checkFileLength: function(file) {
            return file.value;
        },
        // show message when upload seccesses
        successMSG() {
            const {
                email,
                textArea_message,
                successMessage,
                UploadCv__form,
                pageNameHeader
            } = this.$refs;
            successMessage.innerHTML =
                "You have submitted your CV and motivation letter successfully.";
            email.value = "";
            email.parentNode.classList.remove("active");
            textArea_message.value = "";
            this.hideForm(UploadCv__form, pageNameHeader);
        },
        setActive(e) {
            this.$el.querySelectorAll(".input").forEach(i => {
                if (i.value.length == 0) {
                    i.parentNode.classList.remove("active");
                }
            });
            e.target.parentNode.classList.add("active");
        },
        setCheckBoxUnActive(e) {
            e.classList.add("UploadCv__form-unAvailable");
        },
        setCheckBoxActive(e) {
            e.classList.remove("UploadCv__form-unAvailable");
            e.classList.add("UploadCv__form-Available");
        },
        setFileUnActive(e) {
            e.classList.add("UploadCv__form-unAvailable");
        },
        setFileActive(e) {
            e.classList.remove("UploadCv__form-unAvailable");
            e.classList.add("UploadCv__form-Available");
        },
        fileTextHide(e) {
            e.style.display = "none";
        },
        fileNameShow(e, checkbox, name) {
            this.fileNameHide(e);
            this.disableCheckBox(e, checkbox);
            name.style.display = "block";
        },
        fileNameHide(e) {
            e.style.display = "none";
        },
        disableCheckBox(e, checkbox) {
            if (e.files.length !== 0) {
                checkbox.disabled = true;
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
        emptyEmailRequired(email) {
            email.parentNode.classList.add("active");
            email.value = "";
        },
        isValidEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        hideForm(x, y) {
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
        &-unAvailable {
            color: $color-white;
            text-decoration-line: line-through;
        }
        &-Available {
            margin-left: 50px;
            color: $color-purple;
            margin-top: $base-vertical-rithm * 10;
            font-weight: bold;
            font-size: 24px;
            cursor: pointer;
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
        &-labelAndCheckbox {
            display: flex;
        }
        &-checkInput {
            margin-top: 18px;
            margin-left: 10px;
            zoom: 2.7;
        }
        &-textarea {
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
        &-label {
            margin: $base-vertical-rithm * 10;
            margin-bottom: $base-vertical-rithm * 2;
            margin-left: 60px;
            font-size: 16px;
            line-height: 5px;
            display: inline-block;
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
