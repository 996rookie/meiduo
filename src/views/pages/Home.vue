<template>
  <div>
    <div class="hearder">
      <h2 class="mall_name">商城后台管理</h2>
      <a href="javascript:;" class="quit" @click="fnQuit()"
        ><i class="fa fa-power-off"></i>&nbsp;退出
      </a>
      <div class="user_info">
        <img src="@/assets/images/person.png" alt="user" />
        <span>欢迎 {{ username }}</span>
      </div>
    </div>
    <div class="side_bar">
      <Menu></Menu>
    </div>
    <div class="main_body">
      <router-view />
    </div>
  </div>
</template>

<script>
import Menu from "@/views/pages/Menu";
export default {
  name: "Home",
  components: {
    Menu,
  },
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    let user = localStorage.username;
    this.username = user;
  },
  methods: {
    fnQuit() {
      sessionStorage.clear();
      localStorage.clear();
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped>
.hearder {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 60px;
  overflow: hidden;
  background: linear-gradient(90deg, pink, skyblue);
}
.mall_name {
  float: left;
  margin: 17px 0 0 22px;
  font-size: 20px;
  color: #f0f0f0;
}
.user_info {
  float: right;
}
.user_info img {
  float: left;
  margin: 10px 15px 0px 0px;
}
.user_info span {
  font-size: 14px;
  line-height: 60px;
  color: #fff;
}
.quit {
  float: right;
  width: 60px;
  line-height: 40px;
  margin: 10px 0px 0px 20px;
  color: #fff;
  font-size: 14px;
}
.quit:hover {
  color: #fb5557;
}
.side_bar {
  position: fixed;
  width: 210px;
  background: #3d4955;
  left: 0;
  top: 60px;
  bottom: 0;
}
.main_body {
  position: fixed;
  background-color: #f9f9f9;
  left: 210px;
  top: 60px;
  right: 0px;
  bottom: 0px;
  overflow: auto;
}
</style>
