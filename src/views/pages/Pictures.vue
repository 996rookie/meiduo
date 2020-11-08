<template>
  <div>
    <BreadCrumb crumb="商品图片管理" />
    <div class="top_bar">
      <Addpictures @fnResetTable="fnGetData" />
    </div>
    <PicturesTable :pictures="aPicturesList" @fnResetTable="fnGetData" />
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
import Addpictures from "@/views/widget/Addpictures";
import PicturesTable from "@/views/widget/PicturesTable";
import cons from "@/views/constant";
export default {
  name: "Pictures",
  components: {
    BreadCrumb,
    Addpictures,
    PicturesTable,
  },
  data() {
    return {
      page: 1,
      pages: 8,
      pagesize: 10,
      aPicturesList: [],
    };
  },
  mounted() {
    this.fnGetData(1);
  },
  methods: {
    fnGetData(num) {
      let token = localStorage.token;
      this.axios
        .get(cons.apis + "/skus/images/", {
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
          this.aPicturesList = dat.data.lists;
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
