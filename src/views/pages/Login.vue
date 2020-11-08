<template>
  <div class="main_wrap">
    <form method="post" class="login_form">
      <h1 class="login_title">用户登录</h1>
      <input
        type="text"
        name="username"
        placeholder="用户名"
        class="input_txt"
        autocomplete="off"
        v-model="username"
      />
      <input
        type="password"
        name="password"
        placeholder="密码"
        class="input_txt"
        v-model="password"
      />
      <div class="error_tip" v-show="errshow">{{ errmsg }}</div>
      <input
        type="button"
        value="登  录"
        class="input_sub"
        @click="fnLogin()"
      />
    </form>
  </div>
</template>

<script>
import cons from "@/views/constant";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errmsg: "",
      errshow: false,
    };
  },
  methods: {
    fnLogin() {
      if (this.username == "" || this.password == "") {
        this.errmsg = "用户名或密码不能为空";
        this.errshow = true;
        return;
      }
      this.axios
        .post(cons.apis + "/authorizations", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          // 存储用户登录信息
          sessionStorage.clear();
          localStorage.clear();
          localStorage.token = response.data.token;
          localStorage.username = response.data.username;
          localStorage.user_id = response.data.id;
          // 跳转到首页
          this.$router.push({ path: "/home" });
        })
        .catch((error) => {
          this.errmsg = "用户名或密码错误";
          this.errshow = true;
        });
    },
  },
};
</script>

<style scoped>
.main_wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: linear-gradient(45deg, pink, skyblue);
}
.login_form {
  width: 330px;
  height: 292px;
  background: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
}
.login_title {
  line-height: 72px;
  text-align: center;
  background: linear-gradient(90deg, #dd5145, #ffcd42);
  color: #fff;
  font-size: 20px;
  border-radius: 6px 6px 0 0;
}
.input_txt {
  display: block;
  margin: 20px auto 0;
  width: 298px;
  height: 32px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  outline: none;
  text-indent: 10px;
}
.error_tip {
  position: absolute;
  font-size: 12px;
  color: #f00;
  bottom: 84px;
  left: 18px;
}
.input_sub {
  display: block;
  margin: 40px auto 0;
  width: 298px;
  height: 32px;
  border: 0px;
  border-radius: 4px;
  background: rgba(247, 60, 45, 0.6);
  color: #fff;
  cursor: pointer;
}
.input_sub:hover {
  background: rgba(247, 60, 45, 0.4);
}
</style>
