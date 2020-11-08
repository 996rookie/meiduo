<template>
  <div>
    <BreadCrumb crumb="商品频道管理" />
    <div class="top_bar">
      <AddChannels @fnResetTable="fnGetData" />
    </div>
    <ChannelsTable :channels="aChannelsList" @fnResetTable="fnGetData" />
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="pages"
      :current-page="page"
      style="text-align: center; margin-top: 10px;"
      @current-change="fnGetPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import BreadCrumb from "@/views/widget/BreadCrumb";
import AddChannels from "@/views/widget/AddChannels";
import ChannelsTable from "@/views/widget/ChannelsTable";
import cons from "@/views/constant";
export default {
  name: "Channels",
  components: {
    BreadCrumb,
    AddChannels,
    ChannelsTable,
  },
  data() {
    return {
      page: 1,
      pages: 8,
      pagesize: 10,
      aChannelsList: [],
    };
  },
  mounted() {
    this.fnGetData(1);
  },
  methods: {
    fnGetData(num) {
      let token = localStorage.token;
      this.axios
        .get(cons.apis + "/goods/channels/", {
          headers: {
            Authorization: "JWT" + token,
          },
          responseType: "json",
          params: {
            page: num,
            pagesize: this.pagesize,
          },
        })
        .then((dat) => {
          this.aChannelsList = dat.data.lists;
          this.page = dat.data.page;
          this.pages = dat.data.pages;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fnGetPage(dat) {
      this.page = dat;
      this.fnGetData(this.page);
    },
  },
};
</script>

<style scoped>
.top_bar {
  width: 95.2%;
  overflow: hidden;
  margin: 10px auto;
}
</style>
