<template>
    <div>
        <Main class="About container">
            <div class="About__header">

                <div class="About__header-content">
                      <div v-html="dates"></div>
                      <div v-html="content"></div>
                       <div v-html="description"></div>
                </div>
            </div>
 <template>
  <div class="uploadContainer">
      <div class="text"><h3>Your Email:</h3></div> 

      <div class="email-input">
         <input type="text" id="email" ref="email" />
      </div>

      <div><h3  class="text">Choose Your CV, Motivation Letter:</h3></div>

    <div>
      <input  class="text" type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
    </div>

    <div>
      <div v-for="(file, key) in files" :key="key">{{file.name}} <span v-on:click="removeFile( key )">Remove</span></div>
    </div>   
  </div>
  <div class="wrapper"> 
      <button class="button" v-on:click="submitFiles()">Submit</button>
    </div>
</template>
                </Main>

                <Upload/>
            </div>

        </template>

        <script>
import axios from "~/plugins/axios";
import Upload from "~/components/upload/upload";

export default {
  async asyncData() {
    let description;
    let dates;
    let content;

    try {
      let req = await axios.get("/content/en/upload/upload.json");
      let req1 = await axios.get("/content/en/apply/apply-dates.json");
      let req2 = await axios.get("/content/en/apply/apply-content.json");
      description = req.data.body;
      dates = req1.data.body;
      content = req2.data.body;
    } catch (e) {
      console.log(e);
      description = false;
      dates = false;
      content = false;
    }
    return {
      siteKey: "6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I",
      description: description ? description : null,
      dates: dates ? dates : null,
      content: content ? content : null
    };
  },

  components: {
    Upload
  },

  data() {
    return {
      files: []
    };
  },

  methods: {
    addFiles() {
      this.$refs.files.click();
    },

    /*
        Submits files to the server
      */
    submitFiles() {
      /*
          Initialize the form data
        */
      let formData = new FormData();

      /*
          Iteate over any file sent over appending the files
          to the form data.
        */
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        let emailData = document.getElementById("email").value;
        formData.append("files[" + 0 + "]", emailData);
        formData.append("files[" + i + "]", file);
      }
      if (
        this.files.length > 0 &&
        document.getElementById("email").value !== "" &&
        document.getElementById("email").value !== null
      ) {
        /*
          Make the request to the POST /select-files URL
        */
        axios
          .post("/upload", formData, {
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
        alert("You Must Upload the CV,Motivation Letter before You Submit!");
      }

      /*
        remove all uploaded files after submitted
        */
      for (var i = 0; i < this.files.length; i++) {
        this.files.splice(0);
      }
      console.log(document.getElementById("email").value);

      document.getElementById("files").value = ""; //delete name of file after added
      document.getElementById("email").value = ""; //delete email after added
      formData.delete("files"); //delete every thing from formData
    },

    /*
        Handles the uploading of files
      */
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;
      /*
          Adds the uploaded file to the files array
        */
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
      document.getElementById("files").value = "";
    },

    /*
        Removes a select file the user has uploaded
      */
    removeFile(key) {
      this.files.splice(key, 1);
    }
  }
};
</script>

        <style lang="scss">
.uploadContainer {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
.text {
  margin: auto;
  display: inline-block;
  padding: 20px;
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
    margin: 0 $base-vertical-rithm * 2;
    h1 {
      margin-bottom: $base-vertical-rithm * 2;
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