<template>
  <div>
    <div v-if="errorMessage" class="error" v-html="errorMessage"/>
    <label ref="label" style="top:-30px;">{{ label }}</label>
    <div>
      <input ref="files" type="file" multiple @change="handleFilesUpload()">
      <span class="addFiles" @click="addFiles()">+ Select Files</span>
    </div>
    <div class="fileList">
      <div v-for="(file, key) in files" :key="key">
        {{ file.name }}
        <input
          :name="files.length === 1 ? name : `${name}[]`"
          :value="file.url"
          type="hidden"
        >
        <button class="remove-btn" @click="removeFile( key )">Remove</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "~/plugins/axios";

export default {
    props: { label: String, name: String },
    data() {
        return {
            errorMessage: "",
            valid: true,
            files: []
        };
    },
    methods: {
        addFiles() {
            this.$refs.files.click();
        },

        async handleFilesUpload() {
            let uploadedFiles = this.$refs.files.files;

            for (let i = 0; i < uploadedFiles.length; i++) {
                this.askPresignedUrl(uploadedFiles[i]);
            }
        },

        async askPresignedUrl(file) {
            const data = new FormData();

            data.set("type", file.type);
            data.set("fileName", file.name);
            data.set("fileExtension", file.name);

            const config = {
                method: "post",
                url: `${process.env.lambdaUrl}request-upload`,
                data: new URLSearchParams(data),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };

            const { data: resData } = await axios(config);
            this.uploadFile(resData, file);
        },

        async uploadFile(formDetails, file) {
            const formData = new FormData();

            Object.keys(formDetails.fields).forEach(field => {
                formData.set(field, formDetails.fields[field]);
            });

            formData.set("acl", "public-read");
            formData.append("file", file, file.name);

            try {
                const { data: uploadData } = await axios({
                    method: "post",
                    url: formDetails.url,
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                this.files.push({
                    name: file.name,
                    url: formDetails.fields.key
                });
            } catch (e) {
                console.log("what is the file input error?", e);
            }
        },

        removeFile(key) {
            this.files.splice(key, 1);
        }
    }
};
</script>
<style lang="scss">
input[type="file"] {
    display: none;
}
.addFiles {
    cursor: pointer;
}
.remove-btn {
    border: 2px solid $color-purple;
    padding: 0px 10px;
    text-transform: uppercase;
    font-weight: 300;
}
</style>
