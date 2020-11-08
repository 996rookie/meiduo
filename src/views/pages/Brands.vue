<template>
  <div>
    <BreadCrumb crumb="品牌管理" />
    <div class="top_bar">
      <Addbrands @fnResetTable="fnGetData" />
    </div>
    <BrandsTable :brands="aBrandsList" @fnResetTable="fnGetData" />
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="pages"
      :current-page="page"
      style="text-align: center; margin-top:10px"
      @current-change="fnGetPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import BreadCrumb from "@/views/widget/BreadCrumb";
import Addbrands from "@/views/widget/Addbrands";
import BrandsTable from "@/views/widget/BrandsTable";
import cons from "@/views/constant";
export default {
  name: "Brands",
  components: {
    BreadCrumb,
    Addbrands,
    BrandsTable,
  },
  data() {
    return {
      page: 1,
      pages: 8,
      pagesize: 10,
      aBrandsList: [],
    };
  },
  mounted() {
    this.fnGetData(1);
  },
  methods: {
    fnGetData(num) {
      let token = localStorage.token;
      this.axios
        .get(cons.apis + "/goods/brands/", {
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
          this.aBrandsList = dat.data.lists;
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
