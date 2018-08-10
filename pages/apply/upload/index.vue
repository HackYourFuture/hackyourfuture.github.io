<template>
        <div>
        <Main class="Apply container">
            <div class="Apply__header">
                <h1>Upload CV and Motivation Letter!</h1>
                <div class="Apply__header-image"></div> 
            </div>

            <div class="Apply__form form">
                <form>
                    <fieldset>   
                        <div id="cvDiv">
                            <P v-on:click="openUploadFileDialogue()" disabled >+ Upload Your CV (*)</P>                          
                            <input type="file" class="text" id="file" ref="file" v-on:change="handleFileUpload()" />
                            <div id="cvName"><span class="label" id="cvLabel"></span>
                            <button @click="removeCvFile()">Remove</button>
                            </div>
                        </div>

                        <div class="section" id="cvDiv2">
                          <div class="insideaDiv">
                          <p class="cv2Lable">If you don't have a CV:</p>
                              <div class="checkboxFour">
                              <input type="checkbox" value="" id="cv2Check" name="check" v-on:click="showCV2()" />
                              <label for="cv2Check"></label>
                            </div>
                            </div>
                          <textarea id="cvText" rows="4" cols="50" placeholder="Your information"></textarea>
                        </div>

                         <div class="section" id="mlDiv">
                            <P v-on:click="openUploadFileDialogue1()">+ Upload Your Motivation Letter (*)</P>                           
                            <input type="file" class="text" id="file1" ref="file1" v-on:change="handleFileUpload1()" />
                            <div id="mlName"><span class="label ml" id="mlLabel"></span>
                            <button @click="removeMlFile()">Remove</button>    
                            </div>
                        </div>
                        
                        <div id="mlDiv2">
                          <div class="insideaDiv">
                          <p class="ml2Lable">If you don't have a Motivation letter:</p>
                              <div class="checkboxFour">
                              <input type="checkbox" value="" id="ml2Check" name="check" v-on:click="showML2()" />
                              <label for="ml2Check"></label>
                              </div>
                              </div>
                          <textarea id="mlText" rows="4" cols="50" placeholder="Your information"></textarea>
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
    this.cvNameHide();
    this.mlNameHide();
    this.cvTextHide();
    this.mlTextHide();
  },

  methods: {
    submitFile() {
      // Initialize the form data
      let formData = new FormData();
      //  Add the form data we need to submit
      if (document.getElementById("file").files.length !== 0) {
        formData.append("file", this.file);
      } else {
        formData.append("file", document.getElementById("cvText").value);
      }

      if (document.getElementById("file1").files.length !== 0) {
        formData.append("file1", this.file1);
      } else {
        formData.append("file1", document.getElementById("mlText").value);
      }

      formData.append("email", this.email.value);
      formData.append("message", this.message.value);
      //  Make the request to the POST /single-file URL
      if (
        document.getElementById("email").value !== "" &&
        document.getElementById("email").value !== null &&
        document.getElementById("email").value !== "Required field" &&
        (document.getElementById("cvLabel").value !== "" ||
          document.getElementById("cvText").value !== "") &&
        (document.getElementById("mlLabel").value !== "" ||
          document.getElementById("mlText").value !== "")
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
      } else {
        if (document.getElementById("email").value === "") {
          document
            .getElementById("email")
            .parentNode.classList.remove("active");
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
      document.getElementById("cvUploadForm").reset();
      this.showCV2();
      this.showML2();
      this.removeMlFile();
      this.removeCvFile();
    },
    // Handles a change on the file upload
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.cvNameShow();
      document.getElementById("cvLabel").innerHTML =
        "You Uploaded the file: " + this.file.name;
    },

    handleFileUpload1() {
      this.file1 = this.$refs.file1.files[0];
      this.mlNameShow();
      document.getElementById("mlLabel").innerHTML =
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

    // Handles when the image clicked
    openUploadFileDialogue() {
      document.getElementById("file").click();
    },

    openUploadFileDialogue1() {
      document.getElementById("file1").click();
    },

    // Removes a select file the user has uploaded
    removeCvFile() {
      delete this.file;
      this.cvNameHide();
    },

    removeMlFile() {
      delete this.file1;
      this.mlNameHide();
    },

    setActive(e) {
      this.$el.querySelectorAll(".input").forEach(i => {
        if (i.value.length == 0) {
          i.parentNode.classList.remove("active");
        }
      });
      e.target.parentNode.classList.add("active");
    },

    //Hide CV section
    hideCvDiv() {
      var x = document.getElementById("cvDiv");
      x.style.display = "none";
    },

    //Show CV section
    showCvDiv() {
      var x = document.getElementById("cvDiv");
      x.style.display = "block";
    },

    // Show & Hide CV CheckBox/Textarea section
    showCV2() {
      var checkBox = document.getElementById("cv2Check");
      var cvText = document.getElementById("cvText");
      if (checkBox.checked == true) {
        cvText.style.display = "block";
      } else {
        cvText.style.display = "none";
      }
    },

    // Show & Hide ML CheckBox/Textarea section
    showML2() {
      var checkBox = document.getElementById("ml2Check");
      var mlText = document.getElementById("mlText");
      if (checkBox.checked == true) {
        mlText.style.display = "block";
      } else {
        mlText.style.display = "none";
      }
    },
    //Hide ML section
    hideMlDiv() {
      var x = document.getElementById("mlDiv");
      x.style.display = "none";
    },

    //Show ML section
    showMlDiv() {
      var x = document.getElementById("mlDiv");
      x.style.display = "block";
    },

    //Show Cv filename
    cvNameShow() {
      this.cvNameHide();
      var x = document.getElementById("cvName");
      x.style.display = "block";
    },
    //Hide CV filename
    cvNameHide() {
      var x = document.getElementById("cvName");
      x.style.display = "none";
    },

    cvTextHide() {
      var x = document.getElementById("cvText");
      x.style.display = "none";
    },

    mlTextHide() {
      var x = document.getElementById("mlText");
      x.style.display = "none";
    },

    //Show ML filename
    mlNameShow() {
      this.mlNameHide();
      var x = document.getElementById("mlName");
      x.style.display = "block";
    },
    //Hide ML filename
    mlNameHide() {
      var x = document.getElementById("mlName");
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

    .text {
      font-size: 18px;
      padding: 10px 10px 10px 5px;
      display: block;
      width: 100%;
      border: none;
      background: transparent;
      display: none;
    }

    .label{
      margin: $base-vertical-rithm * 10;
      margin-bottom: $base-vertical-rithm * 2;
      margin-left: 80px;
      font-size: 16px;
      line-height: 5px;
      display: inline-block;

    }

    .ml{
      margin-left: 60px;
    }

    .insideaDiv {
      display: flex;
    }

    .section{
      display: grid;
      grid-auto-flow: row;
    }

    .checkboxFour {
      width: 40px;
      height: 40px;
      background: #ddd;
      margin: 20px 90px;
      margin-top: 40px;
      margin-left: 15px;
      border-radius: 100%;
      position: relative;
      box-shadow: 0px 1px 3px rgba(83, 81, 81, 0.5);
    }

    .checkboxFour label {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 100px;
      transition: all 0.5s ease;
      cursor: pointer;
      position: absolute;
      top: 5px;
      left: 5px;
      z-index: 1;
      background: rgb(148, 144, 144);
      box-shadow: inset 0px 1px 3px rgba(83, 81, 81, 0.5);
    }

    .checkboxFour input[type="checkbox"]:checked + label {
      background: $color-purple;
    }

    textarea {
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
  }
}
</style>