<template>
  <div>
    <BreadCrumb crumb="用户组管理" />
    <div class="top_bar">
      <AddGroup @fnResetTable="fnGetData" />
    </div>
    <GroupTable :groups="aGroupList" @fnResetTable="fnGetData" />
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
import AddGroup from "@/views/widget/AddGroup";
import GroupTable from "@/views/widget/GroupTable";
import cons from "@/views/constant";
export default {
  name: "Group",
  components: {
    BreadCrumb,
    AddGroup,
    GroupTable,
  },
  data() {
    return {
      page: 1,
      pages: 8,
      pagesize: 10,
      aGroupList: [],
    };
  },
  mounted() {
    this.fnGetData(1);
  },
  methods: {
    fnGetData(num) {
      let token = localStorage.token;
      this.axios
        .get(cons.apis + "/permission/groups/", {
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
          this.aGroupList = dat.data.list;
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
