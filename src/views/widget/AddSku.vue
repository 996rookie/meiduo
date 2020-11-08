<template>
  <div>
    <el-button type="primary" size="small" @click="pop_show = true"
      >新增商品</el-button
    >
    <el-dialog
      title="新增商品"
      :visible.sync="pop_show"
      append-to-body
      width="60%"
    >
      <el-form :model="skuForm" inline label-width="100px" status-icon>
        <el-form-item label="名称:">
          <el-input type="text" v-model="skuForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="副标题:">
          <el-input
            type="text"
            v-model="skuForm.caption"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格:">
          <el-input type="text" v-model="skuForm.price" size="small"></el-input>
        </el-form-item>
        <el-form-item label="进价:">
          <el-input
            type="text"
            v-model="skuForm.cost_price"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="市场价:">
          <el-input
            type="text"
            v-model="skuForm.market_price"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="库存:">
          <el-input type="text" v-model="skuForm.stock" size="small"></el-input>
        </el-form-item>
        <el-form-item label="分类:">
          <el-select v-model="skuForm.category_id" size="small">
            <el-option
              v-for="item in category_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上下架:">
          <el-radio v-model="skuForm.is_launched" label="true">是</el-radio>
          <el-radio v-model="skuForm.is_launched" label="false">否</el-radio>
        </el-form-item>
        <el-form-item label="SPU:">
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
          :label="item.name"
          :key="item.id"
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
        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import cons from "@/views/constant";
let token = localStorage.token;
export default {
  name: "AddSku",
  data() {
    return {
      pop_show: false,
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
    submitForm() {
      var specs_sub_list = [];
      for (var k in this.skuForm.specs) {
        specs.specs_sub_list.push({
          spec_id: k,
          option_id: this.skuForm.specs[k],
        });
      }
      this.axios
        .post(
          cons.apis + "/skus/",
          {
            name: this.skuForm.name,
            caption: this.skuForm.caption,
            price: this.skuForm.pricr,
            cost_price: this.cost_price,
            market_price: this.market_price,
            stock: this.stock,
            category_id: category_id,
            is_launched: is_launched,
            spu_id: spu_id,
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
          if (dat.status == 201) {
            this.$message({
              type: "success",
              message: "商品添加成功!",
            });
            this.pop_show = false;
            this.skuForm.name = "";
            this.skuForm.caption = "";
            this.skuForm.price = "";
            this.skuForm.cost_price = "";
            this.skuForm.market_price = "";
            this.skuForm.stock = "";
            this.skuForm.category_id = "";
            this.skuForm.is_launched = "";
            this.skuForm.spu_id = "";
            this.skuForm.specs = {};
            this.$emit("fnGetKey");
          }
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
    resetForm() {
      this.skuForm.name = "";
      this.skuForm.caption = "";
      this.skuForm.price = "";
      this.skuForm.cost_price = "";
      this.skuForm.market_price = "";
      this.skuForm.stock = "";
      this.skuForm.category_id = "";
      this.skuForm.is_launched = "";
      this.skuForm.spu_id = "";
      this.skuForm.specs = {};
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

<style scoped>
.btn {
  margin-left: 100px;
}
</style>
