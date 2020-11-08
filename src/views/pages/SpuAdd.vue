<template>
  <div>
    <BreadCrumb crumb="SPU管理>新增SPU" />
    <div class="center_wrap">
      <h1 class="spu_form_title">新增SPU</h1>
      <el-form ref="spuForm" :model="spuForm" status-icon label-width="100px">
        <el-form-item label="SPU名称" prop="name">
          <el-input type="text" v-model="spuForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand_id">
          <el-select v-model="spuForm.brand_id" size="small">
            <el-option
              v-for="item in brand_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="一级分类" prop="category1_id">
          <el-select v-model="spuForm.category1_id" size="small">
            <el-option
              v-for="item in category1_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="category2_id">
          <el-select v-model="spuForm.category2_id" size="small">
            <el-option
              v-for="item in category2_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类" prop="category3_id">
          <el-select v-model="spuForm.category3_id" size="small">
            <el-option
              v-for="item in category3_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品详情:">
          <div class="tiny_con">
            <div class="custom_img" @click="pop_show = true"></div>
            <editor
              v-model="spuForm.desc_detail"
              :init="init"
              api-key="no-api-key"
            ></editor>
          </div>
        </el-form-item>

        <el-form-item label="商品包装:">
          <div class="tiny_con">
            <div class="custom_img" @click="pop_show = true"></div>
            <editor
              v-model="spuForm.desc_pack"
              :init="init"
              api-key="no-api-key"
            ></editor>
          </div>
        </el-form-item>

        <el-form-item label="售后服务:">
          <div class="tiny_con">
            <div class="custom_img" @click="pop_show = true"></div>
            <editor
              v-model="spuForm.desc_service"
              :init="init"
              api-key="no-api-key"
            ></editor>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog title="上传插入的图片" :visible.sync="pop_show" append-to-body>
      <el-form status-icon label-width="100px">
        <img :src="upload_img_url" class="upload_pic_show" />
        <el-form-item label="上传图片" prop="logo">
          <el-upload :auto-upload="false">
            <el-button size="small" type="primary">点击选择图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fnUpload">{{ btn_text }}</el-button>
          <el-button type="primary" @click="fnInsertPic">插入图片</el-button>
          <el-button @click="pop_show = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import timymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
// import 'tinymce/themes/modern/theme'
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
import BreadCrumb from "@/views/widget/BreadCrumb";
import cons from "@/views/constant";
let token = localStorage.token;
export default {
  name: "SpuAdd",
  components: {
    BreadCrumb,
    editor: Editor,
  },
  data() {
    return {
      pop_show: false,
      upload_img_url: "/static/images/pic_bg.png",
      btn_text: "提交",
      spuForm: {
        name: "",
        brand_id: "",
        category1_id: "",
        category2_id: "",
        category3_id: "",
        desc_detail: "",
        desc_pack: "",
        desc_service: "",
      },
      brand_list: [],
      category1_list: [],
      category2_list: [],
      category3_list: [],
      init: {
        language_url: "/static/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/static/tinymce/skins/lightgray",
        width: "99%",
        height: 200,
        branding: false,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help",
      },
    };
  },
  mounted() {
    tinymce.init({});
    this.fnGetBrand();
    this.fnGetCategories();
  },
  methods: {
    fnGetBrand() {
      this.axios
        .get(cons.apis + "/goods/brands/simple/", {
          headers: {
            Authorization: "JWT" + token,
          },
          responseType: "json",
        })
        .then((dat) => {
          this.brand_list = dat.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fnGetCategories() {
      this.axios
        .get(cons.apis + "/goods/channel/categories/", {
          headers: {
            Authorization: "JWT" + token,
          },
          responseType: "json",
        })
        .then((dat) => {
          this.category1_list = dat.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fnGetCategory_sub(sid, num) {
      this.axios
        .get(cons.apis + "/goods/channel/categories" + sid + "/", {
          headers: {
            Authorization: "JWT" + token,
          },
          responseType: "json",
        })
        .then((dat) => {
          this["category" + num + "_list"] = dat.data.subs;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm() {
      this.axios
        .post(cons.apis + "/goods/", this.spuForm, {
          headers: {
            Authorization: "JWT" + token,
          },
          responseType: "json",
        })
        .then((dat) => {
          if (dat.status == 201) {
            this.$message({
              type: "success",
              message: "SPU添加成功!",
            });
            setTimeout(() => {
              this.$router.push({ path: "/home/spu" });
            }, 2000);
          }
        })
        .catch((error) => {
          if (error.response.status == 400) {
            var errmsg = error.response.data;
            if (errmsg.name) {
              this.$message({
                type: "info",
                message: errmsg.name[0],
              });
            }
            if (errmsg.non_field_errors) {
              this.$message({
                type: "info",
                message: errmsg.non_field_errors[0],
              });
            }
          }
        });
    },
    fnUpload() {
      this.btn_text = "上传中...";
      let fileValue = document.querySelector(".el-upload .el-upload__input");
      let fd = new FormData();
      fd.append("image", fileValue.files[0], fileValue.files[0].name);
      this.axios
        .post(cons.apis + "/goods/images/", fd, {
          headers: {
            Authorization: "JWT" + token,
            "Content-Type": "multipart/form-data",
          },
          responseType: "json",
        })
        .then((dat) => {
          this.upload_img_url = dat.data.img_url;
          this.btn_text = "提交";
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    fnInsertPic() {
      var sImg = '<img src="' + this.upload_img_url + '">';
      if (sImg == "/static/images/pic_bg.png") {
        alert("请上传图片后,再插入图片!");
        return;
      }
      tinymce.execCommand("mceInsertContent", false, sImg);
      this.pop_show = false;
    },
  },
};
</script>

<style scoped>
.center_wrap {
  width: 95.2%;
  overflow: hidden;
  margin: 10px auto 10px;
}
.spu_form_title {
  line-height: 24px;
  font-size: 18px;
  color: #303133;
  margin: 10px 0px 20px;
}
.tiny_con {
  position: relative;
}
.custom_img {
  width: 16px;
  height: 13px;
  background: url("/static/images/imgicon.png") no-repeat;
  position: absolute;
  left: 698px;
  top: 12px;
  z-index: 9990;
  cursor: pointer;
}
.upload_pic {
  height: 330px;
}
.upload_pic_show {
  display: block;
  width: 240px;
  height: 180px;
  margin: 15px auto 10px;
}
</style>
