<template>
  <div id="app">
    <template>
      <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
          <div class="logo"></div>
          <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
            <a-menu-item key="1">
              <a-icon type="home" />
              <span>Home</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout>
          <a-layout-header style="background: #fff; padding: 0">
            <a-icon
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)"
            />
          </a-layout-header>
          <a-layout-content
            :style="{
              margin: '24px 16px',
              padding: '24px',
              background: '#fff',
              minHeight: '75vh',
            }"
          >
            <template>
              <a-row :gutter="[8, 40]" type="flex">
                <a-col>
                  <file-upload />
                </a-col>
                <a-col>
                  <a-button icon="camera" @click="showCameraModal"
                /></a-col>
                <a-col> <a-button icon="reload" @click="loadData" /></a-col>
              </a-row>
              <a-row :gutter="[16, 40]">
                <a-col class="gutter-row" :span="24">
                  <a-table :columns="columns" :data-source="data_" rowKey="uid">
                    <a slot="name" slot-scope="text">{{ text }}</a>
                  </a-table>
                </a-col>
              </a-row>
            </template>
          </a-layout-content>
          <a-layout-footer
            :style="{
              maxHeight: '4vh',
            }"
          >
            <a href="https://github.com/oksbwn/ScanMyBill-Nanonets-use-case"
              ><a-icon
                type="github"
                :style="{ fontSize: '16px', color: '#08c', margin: '5px' }"
            /></a>
            <a href="https://twitter.com/wglabz"
              ><a-icon
                type="twitter"
                :style="{ fontSize: '16px', color: '#08c', margin: '5px' }"
            /></a>
            <a href="https://linkedin.com/in/geekybikash"
              ><a-icon
                type="linkedin"
                :style="{ fontSize: '16px', color: '#08c', margin: '5px' }"
            /></a>
          </a-layout-footer>
        </a-layout>
      </a-layout>
    </template>
    <a-modal
      title="Uplod File"
      :visible="fileUploadModalVisibility"
      @ok="fileUploadModalHandle"
      @cancel="fileUploadModalHandle"
    >
      <p></p>
    </a-modal>
    <a-modal
      title="Take Picture"
      :visible="camereModalVisibility"
      @ok="cameraModalHandle"
      @cancel="cameraModalHandle"
      width="250px"
    >
      <Camera />
    </a-modal>
  </div>
</template>
<script>
import FileUpload from "./components/FileUploaad.vue";
import Camera from "./components/Camera.vue";
const columns = [
  {
    title: "Date",
    dataIndex: "Date",
    key: "Date",
    width: 120,
  },
  {
    title: "Merchant",
    dataIndex: "Merchant_Name",
    key: "Merchant_Name",
    ellipsis: true,
  },
  {
    title: "Tax",
    dataIndex: "Tax_Amount",
    width: 120,
    key: "Tax_Amount",
  },
  {
    title: "Total",
    dataIndex: "Total_Amount",
    width: 120,
    key: "Total_Amount",
  },
];

export default {
  name: "App",
  components: { Camera, FileUpload },
  data() {
    return {
      fileUploadModalVisibility: false,
      camereModalVisibility: false,
      data_: [],
      collapsed: true,
      columns,
    };
  },
  methods: {
    showCameraModal() {
      this.camereModalVisibility = true;
    },
    showFileUploadModal() {
      this.fileUploadModalVisibility = true;
    },
    cameraModalHandle() {
      this.camereModalVisibility = false;
    },
    fileUploadModalHandle() {
      this.fileUploadModalVisibility = false;
    },
    loadData() {
      this.data_ = this.$store.state.bills;
      console.log(this.$store.state.bills);
    },
  },
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
