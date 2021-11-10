<template>
  <div class="clearfix">
    <a-upload
      :file-list="fileList"
      :remove="handleRemove"
      :before-upload="beforeUpload"
    >
      <a-button v-if="!processing">
        <a-icon type="upload" /> Select File
      </a-button>
      <a-spin v-if="processing">
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      </a-spin>
    </a-upload>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      fileList: [],
      uploading: false,
      processing: false,
    };
  },
  mounted() {
    console.log(this.$store.state.bills);
  },
  methods: {
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      this.processing = true;
      this.handleUpload();
      this.handleRemove(file);
      return false;
    },
    handleUpload() {
      const { fileList } = this;
      const formData = new FormData();

      formData.append("file", fileList[0]);

      this.uploading = true;

      axios
        .post(
          "https://app.nanonets.com/api/v2/OCR/Model/ca53c1dd-90ef-42da-8e98-650dd81151a8/LabelFile/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization:
                "Basic " +
                Buffer.from("bmGw4ITt8JlmzPTrcA5GsuHq4mik68CG" + ":").toString(
                  "base64"
                ),
            },
          }
        )
        .then((res) => {
          let response = res.data;
          if (response.message === "Success") {
            let data = response.result[0];
            let temp = {};
            data.prediction.map((item) => {
              temp[item.label] = item.ocr_text;
            });
            this.$store.dispatch("setBill", temp);
          }
          this.$message.info("Recognition sucessfull.");
          this.processing = false;
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("Recognition Failed.");
          this.processing = false;
        });
    },
  },
};
</script>
