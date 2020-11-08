<template>
  <div>
    <BreadCrumb crumb="权限管理" />
    <div class="top_bar">
      <AddAuthor @fnResetTable="fnGetData(1)" />
    </div>
    <AuthorityTable :authors="aAuthorList" @fnResetTable="fnGetData(1)" />
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
import AddAuthor from "@/views/widget/AddAuthor";
import AuthorityTable from "@/views/widget/AuthorityTable";
import cons from "@/views/constant";
export default {
  name: "Authority",
  components: {
    BreadCrumb,
    AddAuthor,
    AuthorityTable,
  },
  data() {
    return {
      page: 1,
      pages: 8,
      paesize: 10,
      aAuthorList: [],
    };
  },
  mounted() {
    this.fnGetData(1);
  },
  methods: {
    fnGetData(num) {
      let token = localStorage.token;
      this.axios
        .get(cons.apis + "/permission/perms/", {
          headers: {
            Authorization: "JWT" + token,
          },
          responseType: "json",
          parsms: {
            page: num,
            pagesize: this.pagesize,
          },
        })
        .then((dat) => {
          this.aAuthorList = dat.data.lists;
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
