<template>
  <div>
    <el-button
      type="primary"
      size="small"
      @click="pop_show = true"
      class="pull-right"
      >增加用户组</el-button
    >
    <el-dialog
      title="增加用户组"
      :visible.sync="pop_show"
      append-to-body
      width="60%"
    >
      <el-form
        :model="groupForm"
        status-icon
        :rules="rulesGroupForm"
        ref="groupForm"
        label-width="100px"
      >
        <el-form-item label="名称" prop="name">
          <el-input
            type="text"
            v-model="groupForm.name"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限:">
          <el-transfer
            v-model="groupForm.listval"
            :data="groupForm.list"
          ></el-transfer>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm('groupForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import cons from "@/views/constant";
let token = localStorage.token;
export default {
  name: "AddGroup",
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("组名不能为空"));
      } else {
        callback();
      }
    };
    return {
      pop_show: false,
      groupForm: {
        name: "",
        list: [],
        listval: [],
      },
      rulesGroupForm: {
        name: [{ validator: validateName, trigget: "blur" }],
      },
    };
  },
  mounted() {
    this.fnGetPowerList();
  },
  methods: {
    submitForm() {
      this.axios
        .post(
          cons.apis + "/permission/groups/",
          {
            name: this.groupForm.name,
            permissions: this.groupForm.listval,
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
              message: "添加组成功!",
            });
            this.pop_show = false;
            this.groupForm.name = "";
            this.groupForm.listval = [];
            this.resetForm("groupForm");
            this.$emit("fnResetTable");
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
    fnGetPowerList() {
      this.axios
        .get(cons.apis + "/permission/simple/", {
          headers: {
            Authorization: "JWT" + token,
          },
          responseType: "json",
        })
        .then((dat) => {
          var aList = dat.data;
          var aList2 = [];
          for (var i = 0; i < aList.length; i++) {
            aList2.push({ key: aList[i].id, label: aList[i].name });
          }
          this.groupForm.list = aList2;
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
