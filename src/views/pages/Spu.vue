<template>
  <div>
    <BreadCrumb crumb="spu管理" />
    <div class="top_bar">
      <el-button type="primary" class="pull-right">
        <router-link to="/home/spuadd">新增spu</router-link>
      </el-button>
    </div>
    <SpuTable :spus="aSpuList" @fnResetTable="fnGetData" />
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="pages"
      :current-page="page"
      style="text-align:center;margin-top:10px"
      @current-change="fnGetPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import BreadCrumb from "@/views/widget/BreadCrumb";
import SpuTable from "@/views/widget/SpuTable";

import cons from "@/views/constant";
export default {
  name: "Spu",
  components: {
    BreadCrumb,
    SpuTable,
  },
  data() {
    return {
      page: 1,
      pages: 8,
      pagesize: 10,
      aSpuList: [],
    };
  },
  mounted() {
    this.fnGetData(1);
  },
  methods: {
    fnGetData(num) {
      let token = localStorage.token;
      this.axios
        .get(cons.apis + "/goods/", {
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
          this.aSpuList = dat.data.lists;
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
a {
  display: block;
  color: #fff;
  width: 90px;
  line-height: 42px;
  margin: -15px -20px;
}
</style>
