<template>
  <div>
    <el-button
      type="primary"
      size="small"
      @click="pop_show = true"
      class="pull-right"
      >新增商品图片</el-button
    >
    <el-dialog title="新增商品图片" :visible.sync="pop_show" append-to-body>
      <el-form
        :model="picturesForm"
        status-icon
        ref="picturesForm"
        label-width="100px"
      >
        <el-form-item label="SKU商品id:" prop="content_type">
          <el-select v-model="picturesForm.sku" size="small">
            <el-option
              v-for="item in sku_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片" prop="logo">
          <el-upload action="" :auto-upload="false">
            <el-button size="small" type="primary">点击选择图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm('picturesForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import cons from "@/views/constant";
let token = localStorage.token;
export default {
  name: "Addpictures",
  data() {
    return {
      pop_show: false,
      sku_list: [],
      picturesForm: {
        sku: "",
        image: "",
      },
    };
  },
  mounted() {
    this.fnGetSkuList();
  },
  methods: {
    submitForm() {
      let fileValue = document.querySelector(".el-upload .el-upload__input");
      let fd = new ForData();
      fd.append("sku", this.picturesForm.sku);
      fd.append("image", fileValue.files[0], fileValue.files[0].name);
      this.axios
        .post(cons.apis + "/skus/images/", fd, {
          headers: {
            Authorization: "JWT" + token,
            "Content-Type": "multipart/form-data",
          },
          responseType: "json",
        })
        .then((dat) => {
          if (dat.status == 201) {
            this.$message({
              type: "success",
              message: "品牌添加成功!",
            });
            this.pop_show = false;
            this.$emit("fnResetTable");
            this.resetForm("picturesForm");
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    fnGetSkuList() {
      this.axios
        .get(cons.apis + "/skus/simple/", {
          headers: {
            Authorization: "JWT" + token,
          },
          responseType: "json",
        })
        .then((dat) => {
          this.sku_list = dat.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped></style>
