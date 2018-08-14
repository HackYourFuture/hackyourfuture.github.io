<template>
<div>
  <Main class="About container">
    <div class="About__header">
      <div class="About__header-content">
      </div>
    </div>
    <div class="uploadContainer">
      <div class="text">
        <h3>Your Assignment Link:</h3></div>
      <div class="email-input">
        <input type="text"
               id="email"
               ref="email" />
      </div>
      <div>
        <h3 class="text">Choose Photo ( Screenshot ):</h3></div>
      <div>
        <input class="text"
               type="file"
               id="files"
               ref="files"
               multiple
               v-on:change="handleFilesUpload()" />
      </div>
      <div>
        <div v-for="(file, key) in files"
             :key="key">{{file.name}}
          <button v-on:click="removeFile( key )">Remove</button>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <button class="button"
              v-on:click="submitFiles()">Submit</button>
    </div>
  </Main>
  <Upload/>
</div>
</template>
<script>
import axios from "~/plugins/axios";
import Upload from "~/components/upload/upload";

export default
{
  async asyncData()
  {
    let description;
    let dates;
    let content;

    try
    {
      let req = await axios.get("/content/en/upload/upload1.json");
      let req1 = await axios.get("/content/en/apply/apply-dates.json");
      let req2 = await axios.get("/content/en/apply/apply-content.json");
      description = req.data.body;
      dates = req1.data.body;
      content = req2.data.body;
    }
    catch (e)
    {
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

  components:
  {
    Upload
  },

  data()
  {
    return {
      files: []
    };
  },

  methods:
  {
    /*
        Adds a file
    */
    addFiles()
    {
      this.$refs.files.click();
    },

    /*
        Submits files to the server
      */
    submitFiles()
    {
      /*
          Initialize the form data
        */
      let formData = new FormData();

      /*
          Iteate over any file sent over appending the files
          to the form data.
        */
      for (var i = 0; i < this.files.length; i++)
      {
        let file = this.files[i];
        let emailData = document.getElementById("email").value;
        let codeData = document.getElementById("code").value;
        formData.append("files[" + 0 + "]", emailData);
        formData.append("files[" + 1 + "]", codeData);
        formData.append("files[" + i + "]", file);
      }
      if (
        this.files.length > 0 &&
        document.getElementById("email").value !== "" &&
        document.getElementById("email").value !== null &&
        document.getElementById("code").value !== "" &&
        document.getElementById("code").value !== null
      )
      {
        /*
          Make the request to the POST /select-files URL
        */
        axios
          .post("/upload", formData,
          {
            headers:
            {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(function()
          {
            console.log("SUCCESS!!");
          })
          .catch(function()
          {
            console.log("FAILURE!!");
          });
      }
      else
      {
        alert("You Must Assignemnt link,Photo before You Submit!");
      }

      /*
        remove all uploaded files after submitted
        */
      for (var i = 0; i < this.files.length; i++)
      {
        this.files.splice(0);
      }
      console.log(document.getElementById("email").value);
      console.log(document.getElementById("code").value);

      document.getElementById("files").value = ""; //delete name of file after added
      document.getElementById("email").value = "";
      document.getElementById("code").value = "";
      formData.delete("files"); //delete every thing from formData
    },

    /*
        Handles the uploading of files
      */
    handleFilesUpload()
    {
      let uploadedFiles = this.$refs.files.files;
      /*
          Adds the uploaded file to the files array
        */
      for (var i = 0; i < uploadedFiles.length; i++)
      {
        this.files.push(uploadedFiles[i]);
      }
      document.getElementById("files").value = "";
    },

    /*
        Removes a select file the user has uploaded
      */
    removeFile(key)
    {
      this.files.splice(key, 1);
    }
  }
};

</script>
<stylesheet lang="scss">
  .uploadContainer { padding: 0; margin: 0; display: flex; flex-direction: column; align-content: center; align-items: center; } .text h2 { margin: auto; display: inline-block; padding: 20px; color: $color-purple; font-weight: bold; } .email-input { border-bottom: 2px solid $color-purple; font-size: 18px; padding: 5px 5px 5px 5px; display: block; background: transparent; margin-bottom: 20px; } .input-dev { margin-left: 5%; } .input-button { -webkit-appearance: none; -moz-appearance: none; -ms-appearance: none; -o-appearance: none; background-color: lightgray; text-align: center; display: inline-block; margin: auto; width: 25%; padding: 0; } .wrapper { text-align: center; } .button { position: relative; background-color: lightgray; color: black; font-size: 18px; cursor: pointer; position: relative; } .wrapper { text-align: center; width: 200px; margin: 0 auto; margin-top: 5 * $base-vertical-rithm; } .submit-button { position: relative; background-color: $color-purple; color: white; font-size: 22px; font-weight: bold; margin: 0; padding: 5%; margin-top: 40px; text-transform: uppercase; -webkit-appearance: none; -moz-appearance: none; -ms-appearance: none; -o-appearance: none; width: 100%; text-transform: uppercase; border: 0; cursor: pointer; position: relative; } .About { &__header { padding: $base-vertical-rithm * 5; text-align: center; a { color: $color-purple; font-weight: bold; font-size: 32px; line-height: 40px; span:after { bottom: -5px; } } &-content { display: inline-block; width: 50%; text-align: center; padding: $base-vertical-rithm * 5; & > div { margin-top: $base-vertical-rithm * 2; } } &-image { width: 50%; display: inline-block; vertical-align: top; } &-dates { margin-left: $base-vertical-rithm * 2; margin-top: $base-vertical-rithm * 15; width: 100%; display: inline-block; vertical-align: top; div { display: inline-block; width: calc(25% - 20px); margin-left: 2%; margin-bottom: 3%; } h3 { font-weight: bold; color: $color-purple; } h4 { color: $color-purple; font-weight: bold; } } } &__content { width: 100%; margin: 0 auto; h1 { color: $color-purple; line-height: 1; } ul li { list-style: disc; } ul + p { margin-top: 1rem; } p a { font-size: 18px; } } &__description { width: 100%; margin: 0 auto; h1 { color: $color-purple; line-height: 1; } } &__container { margin: 0 $base-vertical-rithm * 5; h1 { margin-bottom: $base-vertical-rithm * 5; color: $color-purple; font-weight: normal; font-size: 42px; line-height: 50px; } &.how { margin-left: -50px; .About__container-image { margin-left: 0; } } &.who { margin-right: -100px; .About__container-image { margin-right: 0; } } &.footer { .About__container-image { margin-left: 25%; width: 50%; } } & > div { display: inline-block; width: calc(50% - 100px); vertical-align: top; margin: 50px; a { color: $color-purple; font-weight: bold; font-size: 32px; line-height: 40px; margin-bottom: 40px; display: block; span:after { bottom: -5px; } } } } &__footer { margin: 0 $base-vertical-rithm * 10; a { margin: 50px; display: inline-block; font-weight: bold; font-size: 30px; line-height: 40px; &:nth-child(2) { margin-left: 25%; } } } }
</stylesheet>

</template>

<script>
import axios from '~/plugins/axios';
import Upload from '~/components/upload/upload';

export default {
  async asyncData() {
    let description
    let dates
    let content

    try {
      let req = await axios.get('/content/en/upload/upload1.json')
      let req1 = await axios.get('/content/en/apply/apply-dates.json')
      let req2 = await axios.get('/content/en/apply/apply-content.json')
      description = req.data.body
      dates = req1.data.body
      content = req2.data.body
    } catch (e) {
      description = false
      dates = false
      content = false
    }
    return {
      siteKey: '6LfsWVAUAAAAAE5mdeB0ICRoDDkWJd00vr9NEZ3I',
      description: description ? description : null,
      dates: dates ? dates : null,
      content: content ? content : null
    }
  },

  components: {
    Upload
  },

  data() {
    return {
      files: []
    }
  },

  methods: {
    /*
        Adds a file
    */
    addFiles() {
      this.$refs.files.click()
    },

    /*
        Submits files to the server
      */
    submitFiles() {
      /*
          Initialize the form data
        */
      let formData = new FormData()

      /*
          Iteate over any file sent over appending the files
          to the form data.
        */
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i]
        let emailData = document.getElementById('email').value
        let codeData = document.getElementById('code').value
        formData.append('files[' + 0 + ']', emailData)
        formData.append('files[' + 1 + ']', codeData)
        formData.append('files[' + i + ']', file)
      }
      if (
        this.files.length > 0 &&
        document.getElementById('email').value !== '' &&
        document.getElementById('email').value !== null &&
        document.getElementById('code').value !== '' &&
        document.getElementById('code').value !== null
      ) {
        /*
          Make the request to the POST /select-files URL
        */
        axios
          .post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(function() {
            console.log('SUCCESS!!')
          })
          .catch(function() {
            console.log('FAILURE!!')
          })
      } else {
        alert('You Must Assignemnt link,Photo before You Submit!')
      }

      /*
        remove all uploaded files after submitted
        */
      for (var i = 0; i < this.files.length; i++) {
        this.files.splice(0)
      }
      console.log(document.getElementById('email').value)
      console.log(document.getElementById('code').value)

      document.getElementById('files').value = '' // delete name of file after added
      document.getElementById('email').value = ''
      document.getElementById('code').value = ''
      formData.delete('files') // delete every thing from formData
    },

    /*
        Handles the uploading of files
      */
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files
      /*
          Adds the uploaded file to the files array
        */
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i])
      }
      document.getElementById('files').value = ''
    },

    /*
        Removes a select file the user has uploaded
      */
    removeFile(key) {
      this.files.splice(key, 1)
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

.text h2 {
  margin: auto;
  display: inline-block;
  padding: 20px;
  color: $color-purple;
  font-weight: bold;
}

.email-input {
  border-bottom: 2px solid $color-purple;
  font-size: 18px;
  padding: 5px 5px 5px 5px;
  display: block;
  background: transparent;
  margin-bottom: 20px;
}

.input-dev {
  margin-left: 5%;
}

.input-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
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
  cursor: pointer;
  position: relative;
}

.wrapper {
  text-align: center;
  width: 200px;
  margin: 0 auto;
  margin-top: 5 * $base-vertical-rithm;
}

.submit-button {
  position: relative;
  background-color: $color-purple;
  color: white;
  font-size: 22px;
  font-weight: bold;
  margin: 0;
  padding: 5%;
  margin-top: 40px;
  text-transform: uppercase;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  width: 100%;
  text-transform: uppercase;
  border: 0;
  cursor: pointer;
  position: relative;
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
      &>div {
        margin-top: $base-vertical-rithm * 2;
      }
    }
    &-image {
      width: 50%;
      display: inline-block;
      vertical-align: top;
    }
    &-dates {
      margin-left: $base-vertical-rithm * 2;
      margin-top: $base-vertical-rithm * 15;
      width: 100%;
      display: inline-block;
      vertical-align: top;
      div {
        display: inline-block;
        width: calc(25% - 20px);
        margin-left: 2%;
        margin-bottom: 3%;
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
    width: 100%;
    margin: 0 auto;
    h1 {
      color: $color-purple;
      line-height: 1;
    }
    ul li {
      list-style: disc;
    }
    ul+p {
      margin-top: 1rem;
    }
    p a {
      font-size: 18px;
    }
  }
  &__description {
    width: 100%;
    margin: 0 auto;
    h1 {
      color: $color-purple;
      line-height: 1;
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
    &>div {
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
