<template>
  <div>
    <div v-if="errorMessage" class="error" v-html="errorMessage"/>
    <label ref="label" style="top:-30px;">{{ label }}</label>
    <input id="files" ref="files" type="file" multiple @change="handleFilesUpload()">
    <div>
      <span class="addFiles" @click="addFiles()">+ Select Files</span>
    </div>
    <div class="fileList">
      <div v-for="(file, key) in files" :key="key">
        {{ file.name }}
        <button class="remove-btn" @click="removeFile( key )">Remove</button>
      </div>
    </div>
  </div>
</template>
<script>
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
        handleFilesUpload() {
            let uploadedFiles = this.$refs.files.files;
            for (let i = 0; i < uploadedFiles.length; i++) {
                this.files.push(uploadedFiles[i]);
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
