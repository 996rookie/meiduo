<template>
  <div>
    <BreadCrumb crumb="规格选项管理" />
    <div class="top_bar">
      <AddOptions @fnResetTable="fnGetData" />
    </div>
    <OptionsTable :options="aOptionsList" @fnResetTable="fnGetData" />
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
import AddOptions from "@/views/widget/AddOptions";
import OptionsTable from "@/views/widget/OptionsTable";
import cons from "@/views/constant";
export default {
  name: "Options",
  components: {
    BreadCrumb,
    AddOptions,
    OptionsTable,
  },
  data() {
    return {
      page: 1,
      pages: 8,
      pagesize: 10,
      aOptionsList: [],
    };
  },
  mounted() {
    this.fnGetData(1);
  },
  methods: {
    fnGetData(num) {
      let token = localStorage.token;
      this.axios
        .get(cons.apis + "/specs/options/", {
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
          this.aOptionsList = dat.data.lists;
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
