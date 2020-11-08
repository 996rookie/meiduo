<template>
  <div>
    <BreadCrumb crumb="sku管理" />
    <div class="top_bar">
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入搜索内容" v-model="keyword" size="small">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="fnGetData(1)"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="8" :offset="8">
          <AddSku @fnSetKey="fnGetKey" class="pull-right" />
        </el-col>
      </el-row>
    </div>
    <SkuTable :skus="aSkuList" @fnResetTable="fnGetData(1)" />
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
import AddSku from "@/views/widget/AddSku";
import SkuTable from "@/views/widget/SkuTable";

import cons from "@/views/constant";
export default {
  name: "Sku",
  components: {
    BreadCrumb,
    AddSku,
    SkuTable,
  },
  data() {
    return {
      keyword: "",
      aSkuList: [],
      page: 1,
      pages: 8,
      pagesize: 10,
    };
  },
  mounted() {
    this.fnGetData(1);
  },
  methods: {
    fnGetData(num) {
      let token = localStorage.token;
      this.axios
        .get(cons.apis + "/skus/", {
          headers: {
            Authorization: "JWT" + token,
          },
          responseType: "json",
          params: {
            page: num,
            pagesize: this.pagesize,
            keyword: this.keyword,
          },
        })
        .then((dat) => {
          this.aSkuList = dat.data.lists;
          this.page = dat.data.page;
          this.pages = dat.data.pages;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fnGetKey(dat) {
      this.keyword = dat;
      this.fnGetData(1);
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
  margin: 10px auto 10px;
}
</style>
