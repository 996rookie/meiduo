<template>
  <div>
    <BreadCrumb crumb="管理员管理" />
    <div class="top_bar">
      <AddAdmin @fnResetTable="fnGetData" />
    </div>
    <AdminTable :admins="aAdminList" @fnResetTable="fnGetData" />
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
import AddAdmin from "@/views/widget/AddAdmin";
import AdminTable from "@/views/widget/AdminTable";
import cons from "@/views/constant";

export default {
  name: "Admin",
  components: {
    BreadCrumb,
    AddAdmin,
    AdminTable,
  },
  data() {
    return {
      page: 1,
      pages: 8,
      pagesize: 10,
      aAdminList: [],
    };
  },
  mounted() {
    this.fnGetData(1);
  },
  methods: {
    fnGetData(num) {
      let token = localStorage.token;
      this.axios
        .get(cons.apis + "/permission/admins/", {
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
          this.aAdminList = dat.data.lists;
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
