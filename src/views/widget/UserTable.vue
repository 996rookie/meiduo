<template>
  <el-table
    :data="users"
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
      prop="username"
      label="用户名"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="mobile"
      label="手机号"
      align="center"
    ></el-table-column>
    <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "UserTable",
  props: {
    users: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped></style>
