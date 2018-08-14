<template>
       <div>
       <Main class="UploadCv container">
           <div class="UploadCv__header">
               <h1 ref="pageNameHeader">Upload CV and Motivation Letter!</h1>
           </div>
           <div id="UploadCv__form" class="UploadCv__form form">
               <form id="cvUploadForm">
                   <fieldset>  
                       <div id="cvDiv">
                           <p ref="uploadCvText" id="uploadCvText" v-on:click="openUploadFileDialogue()">+ Upload Your CV (*)</p>                          
                           <input type="file" value="" name="input_file_cv" class="UploadCv__form__inputText" id="input_file_cv" ref="input_file_cv" v-on:change="handleCvUpload()" v-on:click="setCVCheckBoxUnActive()" />
                           <h3 ref="requiredCvMSG"></h3>
                           <div id="cvName"><span class="UploadCv__form__label" id="cvLabel" ref="cvLabel"></span>
                           <button class="UploadCv__form__remove-btn" @click.prevent="removeCvFile()">Remove</button>
                           </div>
                       </div>
                       <div id="cvDiv_TextArea" class="UploadCv__form__section">
                         <div class="UploadCv__form__insideDiv">
                           <p class="cv2Lable" ref="cv2Lable">If you don't have a CV:</p>
                             <div class="UploadCv__form__checkboxDiv">
                               <input type="checkbox" value="" class="UploadCv__form__checkInput" id="input_checkbox_cv" ref="input_checkbox_cv" name="check" v-on:click="showCV2()" />
                             </div>
                         </div>
                         <textarea id="textArea_cv" ref="textArea_cv" class="UploadCv__form__textarea" rows="4" cols="50" placeholder="Your CV"></textarea>
                       </div>
                        <div id="motivation_letter_Div">
                           <P ref="uploadMlText" v-on:click="openUploadFileDialogue1()">+ Upload Your Motivation Letter (*)</P>                          
                           <input type="file" class="UploadCv__form__inputText" id="input_file_motivation_letter" ref="input_file_motivation_letter" v-on:change="handleMotivationLetterUpload()" v-on:click="setMlCheckBoxUnActive()" />
                           <h3 ref="requiredMlMSG"></h3>
                           <div id="mlName"><span class="UploadCv__form__label" id="mlLabel" ref="mlLabel"></span>
                           <button class="UploadCv__form__remove-btn" @click.prevent="removeMlFile()">Remove</button>    
                           </div>
                       </div>
                       
                       <div id="motivation_letterDiv_TextArea" class="UploadCv__form__section">
                         <div class="UploadCv__form__insideDiv">
                           <p class="ml2Lable" ref="ml2Lable">If you don't have a Motivation letter:</p>
                             <div class="UploadCv__form__checkboxDiv">
                               <input type="checkbox" value="" class="UploadCv__form__checkInput" id="input_checkbox_motivation_letter" ref="input_checkbox_motivation_letter" name="check" v-on:click="showML2()" />
                             </div>
                         </div>
                         <textarea id="textArea_motivation_letter" ref="textArea_motivation_letter" class="UploadCv__form__textarea" rows="4" cols="50" placeholder="Your Motivation Letter"></textarea>
                       </div>
                       <div class="half-width inputContainer">
                           <label for="email">e-mail (*)</label>
                           <input type="email" id="email" ref="email" class="input" name="email" value="" v-on:change="handleEmail()" @focus="setActive" @click="emptyEmailRequired()">
                       </div>
                     
                       <div id="message_TextArea" class="UploadCv__form__section">
                         <div class="UploadCv__form__insideDiv">
                           <p class="messageLabel">Is there anything you would like to notify us about?</p>
                         </div>
                         <textarea id="textArea_message" ref="textArea_message" class="UploadCv__form__textarea" rows="4" cols="50" placeholder="Your Question" v-on:change="handleMessage()"></textarea>
                       </div>
                       <div class="apply-btn">
                           <input type="submit" value="Apply" v-on:click.prevent="submitFile" true>
                       </div>
                   </fieldset>
                 
               </form>
                 
           </div>
           <div>
               <p id="success-Msg" class="UploadCv__success-Msg"></p>
           </div>
           </Main>
         </div>
</template>
<script>
import axios from "~/plugins/axios";
export default {
  async asyncData() {
    try {
    } catch (e) {}
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
        textArea_message,
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
        (cvLabel.innerHTML !== "" || textArea_cv.value !== "") &&
        (mlLabel.innerHTML !== "" || textArea_motivation_letter.value !== "")
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
      this.cvData = input_file_cv.files[0];
      this.cvNameShow();
      this.$refs.requiredCvMSG.innerHTML = "";
      cvLabel.innerHTML = "You Uploaded the file: " + this.cvData.name;
    },
    handleMotivationLetterUpload() {
      this.motivationLetterData = input_file_motivation_letter.files[0];
      this.mlNameShow();
      this.$refs.requiredMlMSG.innerHTML = "";
      mlLabel.innerHTML =
        "You Uploaded the file: " + this.motivationLetterData.name;
    },
    handleEmail() {
      this.emailData = email;
      email.value = this.emailData.value;
    },
    handleMessage() {
      this.messageData = textArea_message;
      textArea_message.value = this.messageData.value;
    },
    successMSG() {
      document.getElementById("success-Msg").innerHTML =
        "You have submitted your CV and motivation letter successfully";
      email.value = "";
      email.parentNode.classList.remove("active");
      textArea_message.value = "";
      this.hideForm();
    },
    // Handles when the image clicked
    openUploadFileDialogue() {
      input_file_cv.click();
    },
    openUploadFileDialogue1() {
      input_file_motivation_letter.click();
    },
    // Removes a select file the user has uploaded
    removeCvFile() {
      delete this.cvData;
      this.cvNameHide();
      this.setCvCheckBoxActive();
      this.$refs.input_checkbox_cv.disabled = false;
    },
    removeMlFile() {
      delete this.motivationLetterData;
      this.mlNameHide();
      this.setMlCheckBoxActive();
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
      var element = this.$refs.cv2Lable;
      element.classList.add("UploadCv__form__unAvailable");
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
      var x = textArea_cv;
      x.style.display = "none";
    },
    mlTextHide() {
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
      if (input_file_cv.files.length !== 0) {
        this.$refs.input_checkbox_cv.disabled = true;
      }
    },
    disableMotivationLetterCheckbox() {
      if (input_file_motivation_letter.files.length !== 0) {
        this.$refs.input_checkbox_motivation_letter.disabled = true;
      }
    },
    emptyInputs() {
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