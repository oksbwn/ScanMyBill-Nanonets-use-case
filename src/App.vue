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
                  <a-button shape="" icon="upload" @click="showModal" />
                </a-col>
                <a-col> <a-button shape="" icon="camera" /></a-col>
              </a-row>
              <a-row :gutter="[16, 40]">
                <a-col class="gutter-row" :span="24">
                  <a-table :columns="columns" :data-source="data">
                    <a slot="name" slot-scope="text">{{ text }}</a>
                  </a-table>
                </a-col></a-row
              >
            </template>
          </a-layout-content>
          <a-layout-footer
            :style="{
              maxHeight: '3vh',
            }"
          >
            Hello
          </a-layout-footer>
        </a-layout>
      </a-layout>
    </template>
    <a-modal
      title="Title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>{{ ModalText }}</p>
    </a-modal>
     <a-modal
      title="Title"
      :visible="camereModalVisibility"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>{{ ModalText }}</p>
    </a-modal>
  </div>
</template>
<script>
const columns = [
  {
    title: "Sl.No",
    dataIndex: "name",
    key: "name",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "Vendor",
    dataIndex: "age",
    key: "age",
    width: 80,
  },
  {
    title: "Date",
    dataIndex: "address",
    key: "address 1",
    ellipsis: true,
  },
];

const data = [];

export default {
  name: "App",
  components: {},
  data() {
    return {
      visible: false,
      data,
      collapsed: true,
      columns,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel() {
      console.log("Clicked cancel button");
      this.visible = false;
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
