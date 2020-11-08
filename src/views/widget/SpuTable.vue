<template>
  <div>
    <el-table
      :data="spus"
      border
      style="width: 95.2%; margin: 0px auto;"
      size="medium"
    >
      <el-table-column
        prop="id"
        label="id"
        width="110"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="SPU名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="brand"
        label="品牌名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="brand_id"
        label="品牌id"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="category1_id"
        label="一级分类id"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="category2_id"
        label="二级分类id"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="category3_id"
        label="三级分类id"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="sales"
        label="SPU商品销量"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="comments"
        label="SPU商品评论量"
        align="center"
      ></el-table-column>
      <el-table-column prop="id" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini"> </el-button>
          <el-button size="mini" type="danger" @click="fnDelSpu(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "SpuTable",
  props: {
    spus: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      edit_id: "",
    };
  },
  methods: {
    fnDelSpu(id) {
      this.edit_id = id;
      this.$confirm("此操作将删除该SPU, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .delete(cons.apis + "/goods/" + this.edit_id + "/", {
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
            message: "已取消删除!",
          });
        });
    },
  },
};
</script>

<style scoped></style>
