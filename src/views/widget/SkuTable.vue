<template>
  <div>
    <el-table
      :data="skus"
      border
      style="width: 95.2%; margin: 0px auto;"
      size="medium"
    >
      <el-table-column
        prop="id"
        label="id"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="商品SKU名"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="stock"
        label="库存"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="sales"
        label="销量"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="category"
        label="分类"
        align="center"
      ></el-table-column>
      <el-table-column label="上下架" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.is_launched ? "上架" : "下架" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="fnPopShow(scope.row.id, scope.row.spu_id)"
            >修改</el-button
          >
          <el-button size="mini" type="danger" @click="fnDelSku(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="修改商品"
      :visible.sync="pop_show"
      append-to-body
      width="60%"
    >
      <el-form :model="skuForm" inline status-icon label-width="100px">
        <el-form-item label="名称">
          <el-input type="text" v-model="skuForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
          <el-input
            type="text"
            v-model="skuForm.caption"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input type="text" v-model="skuForm.price" size="small"></el-input>
        </el-form-item>
        <el-form-item label="进价">
          <el-input
            type="text"
            v-model="skuForm.cost_price"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="市场价">
          <el-input
            type="text"
            v-model="skuForm.market_price"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input type="text" v-model="skuForm.stock" size="small"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="skuForm.category_id" size="small">
            <el-option
              v-for="item in category_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上下架">
          <el-radio v-model="skuForm.is_launched" label="true">是</el-radio>
          <el-radio v-model="skuForm.is_launched" label="false">否</el-radio>
        </el-form-item>
        <el-form-item label="SPU">
          <el-select
            v-model="skuForm.spu_id"
            size="small"
            @change="skuForm.specs = {}"
          >
            <el-option
              v-for="item in goods_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-for="item in specs_list"
          :key="item.id"
          :label="item.name"
        >
          <el-select v-model="skuForm.specs[item.id]" size="small">
            <el-option
              v-for="opt in item.options"
              :key="opt.id"
              :label="opt.value"
              :value="opt.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="pop_show = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SkuTable",
  props: {
    skus: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      pop_show: false,
      edit_id: "",
      skuForm: {
        name: "",
        caption: "",
        price: "",
        cost_price: "",
        market_price: "",
        stock: "",
        category_id: "",
        is_launched: "",
        spu_id: "",
        specs: {},
      },
      category_list: [],
      goods_list: [],
      specs_list: [],
    };
  },
  mounted() {
    this.fnGetCategory();
    this.fnGetGoods();
  },
  methods: {
    fnGetCategory() {
      this.axios
        .get(cons.apis + "/skus/categories/", {
          headers: {
            Authorization: "JWT" + token,
          },
          responseType: "json",
        })
        .then((dat) => {
          this.category_list = dat.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    fnGetGoods() {
      this.axios
        .get(cons.apis + "/goods/simple/", {
          headers: {
            Authorization: "JWT" + token,
          },
          responseType: "json",
        })
        .then((dat) => {
          this.goods_list = dat.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    fnGetSpecs() {
      this.axios
        .get(cons.apis + "/goods/" + this.skuForm.spu_id + "/specs/", {
          headers: {
            Authorization: "JWT" + token,
          },
          responseType: "json",
        })
        .then((dat) => {
          this.specs_list = dat.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    fnPopShow(id, gid) {
      this.axios
        .get(cons.apis + "/goods/" + gid + "/specs/", {
          headers: {
            Authorization: "JWT" + token,
          },
          responseType: "json",
        })
        .then((dat) => {
          this.specs_list = dat.data;
          this.axios
            .get(cons.apis + "/skus/" + id + "/", {
              headers: {
                Authorization: "JWT" + token,
              },
              responseType: "json",
            })
            .then((dat) => {
              this.edit_id = dat.data.id;
              this.skuForm.name = dat.data.name;
              this.skuForm.caption = dat.data.caption;
              this.skuForm.price = dat.data.price;
              this.skuForm.cost_price = dat.data.cost_price;
              this.skuForm.market_price = dat.data.market_price;
              this.skuForm.stock = dat.data.stock;
              this.skuForm.category_id = dat.data.category_id;
              this.skuForm.is_launched = dat.data.is_launched;
              this.skuForm.spu_id = dat.data.spu_id;
              var specs_data_list = {};
              for (var i = 0; i < dat.data.specs.length; i++) {
                specs_data_list[dat.data.specs[i].spec_id] =
                  dat.data.specs[i].option_id;
              }
              this.skuForm.specs = specs_data_list;
              this.pop_show = true;
            })
            .catch((error) => {
              console.log(error.response);
            });
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    submitForm() {
      var specs_sub_list = [];
      for (var k in this.skuForm.specs) {
        specs_sub_list.push({ spec_id: k, option_id: this.skuForm.specs[k] });
      }
      this.axios
        .put(
          cons.apis + "/skus/" + this.edit_id + "/",
          {
            name: this.skuForm.name,
            caption: this.skuForm.caption,
            price: this.skuForm.price,
            cost_price: this.skuForm.cost_price,
            market_price: this.skuForm.market_price,
            stock: this.skuForm.stock,
            category_id: this.skuForm.category_id,
            is_launched: this.skuForm.is_launched,
            spu_id: this.skuForm.spu_id,
            specs: specs_sub_list,
          },
          {
            headers: {
              Authorization: "JWT" + token,
            },
            responseType: "json",
          }
        )
        .then((dat) => {
          this.$message({
            type: "success",
            message: "商品修改成功!",
          });
          this.pop_show = false;
          this.$emit("fnResetTable");
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.$message({
              type: "info",
              message: error.response.data.name[0],
            });
          }
        });
    },
    fnDelSku(id) {
      this.edit_id = id;
      this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .delete(cons.apis + "/skus/" + this.edit_id + "/", {
              headers: {
                Authorization: "JWT" + token,
              },
              responseType: "json",
            })
            .then((dat) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.$emit("fnResetTable");
            })
            .catch((error) => {
              if (error.response.status == 404) {
                this.$message({
                  type: "info",
                  message: "商品未找到!",
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  computed: {
    look_good_id() {
      return this.skuForm.spu_id;
    },
  },
  watch: {
    look_good_id(newVal, oldVal) {
      this.fnGetSpecs();
    },
  },
};
</script>

<style scoped></style>
