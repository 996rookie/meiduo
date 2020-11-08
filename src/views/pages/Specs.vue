<template>
  <div>
    <BreadCrumb crumb="商品规格管理" />
    <div class="top_bar">
      <AddSpecs @fnResetTable="fnGetData(1)" />
    </div>
    <SpecsTable :specs="aSpecsList" @fnResetTable="fnGetData(1)" />
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
import AddSpecs from "@/views/widget/AddSpecs";
import SpecsTable from "@/views/widget/SpecsTable";
import cons from "@/views/constant";
export default {
  name: "Specs",
  components: {
    BreadCrumb,
    AddSpecs,
    SpecsTable,
  },
  data() {
    return {
      aSpecsList: [],
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
        .get(cons.apis + "/goods/specs/", {
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
          this.aSpecsList = dat.data.lists;
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
