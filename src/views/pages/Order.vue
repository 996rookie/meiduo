<template>
  <div>
    <BreadCrumb crumb="订单管理" />
    <div class="top_bar">
      <el-row>
        <el-col :span="8">
          <el-input v-model="keyword" class="input-with-select" size="small">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="fnGetData(1)"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <OrderTable :orders="aOrderList" />
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
import OrderTable from "@/views/widget/OrderTable";
import cons from "@/views/constant";
let token = localStorage.token;
export default {
  name: "Order",
  components: {
    BreadCrumb,
    OrderTable,
  },
  data() {
    return {
      keyword: "",
      page: 1,
      pages: 8,
      pagesize: 10,
      aOrderList: [],
    };
  },
  mounted() {
    this.fnGetData(1);
  },
  methods: {
    fnGetData(num) {
      this.axios
        .get(cons.apis + "/orders/", {
          headers: {
            Auyhorization: "JWT" + token,
          },
          responseType: "json",
          params: {
            page: num,
            pagesize: this.pagesize,
            keywork: this.keyword,
          },
        })
        .then((dat) => {
          this.aOrderList = dat.data.lists;
          this.page = dat.data.page;
          this.pages = dat.data.pages;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fnGetKey(dat) {
      this.keywork = dat;
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
