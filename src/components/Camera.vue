<template>
  <div>
    <a-row :gutter="[8, 40]" type="flex">
      <a-col>
        <a-button
          :icon="isCameraOpen ? 'close-square' : 'play-square'"
          :type="isCameraOpen ? 'danger' : ''"
          @click="toggleCamera"
        />
      </a-col>
      <a-col>
        <a-button
          icon="camera"
          :disabled="!isCameraOpen || isLoading"
          @click="takePhoto"
        />
      </a-col>
      <a-col>
        <a id="downloadPhoto" @click="downloadImage">
          <a-button
            :disabled="!isPhotoTaken || !isCameraOpen"
            icon="download"
            type="link"
        /></a>
      </a-col>
      <a-col>
        <a-icon type="loading" v-show="isCameraOpen && isLoading" />
      </a-col>
    </a-row>
    <a-row :gutter="[16, 40]">
      <a-col class="gutter-row" :span="24">
        <div
          v-if="isCameraOpen"
          v-show="!isLoading"
          class="camera-box"
          :class="{ flash: isShotPhoto }"
        >
          <div class="camera-shutter" :class="{ flash: isShotPhoto }"></div>

          <video
            v-show="!isPhotoTaken"
            ref="camera"
            :width="200"
            :height="150"
            autoplay
          ></video>

          <canvas
            v-show="isPhotoTaken"
            id="photoTaken"
            ref="canvas"
            :width="200"
            :height="150"
          ></canvas>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      link: "#",
    };
  },

  methods: {
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
        this.isShotPhoto = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },

    createCameraElement() {
      this.isLoading = true;

      const constraints = (window.constraints = {
        audio: false,
        video: true,
      });

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.isLoading = false;
          this.$refs.camera.srcObject = stream;
        })
        .catch(() => {
          this.isLoading = false;
          alert("May the browser didn't support or there is some errors.");
        });
    },

    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });
    },

    takePhoto() {
      if (!this.isPhotoTaken) {
        this.isShotPhoto = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          this.isShotPhoto = false;
        }, FLASH_TIMEOUT);
      }

      this.isPhotoTaken = !this.isPhotoTaken;

      const context = this.$refs.canvas.getContext("2d");
      context.drawImage(this.$refs.camera, 0, 0, 200, 150);
    },

    downloadImage() {
      const download = document.getElementById("downloadPhoto");
      const canvas = document
        .getElementById("photoTaken")
        .toDataURL("image/jpeg")
        .replace("image/jpeg", "image/octet-stream");
      download.setAttribute("href", canvas);
    },
  },
  mounted() {
    this.$nextTick(function () {
      if (!this.isCameraOpen) {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    });
  },
  destroyed() {
    console.log("Hello");
    if (this.isCameraOpen) {
      this.isCameraOpen = false;
      this.isPhotoTaken = false;
      this.isShotPhoto = false;
      this.stopCameraStream();
    }
  },
};
</script>
