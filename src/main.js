import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import echarts from "echarts";

Vue.config.productionTip = false;

Vue.prototype.axios = axios;
Vue.prototype.echarts = echarts;

Vue.use(ElementUI);

const whiteRouter = ["/"];
router.beforeEach((to, from, next) => {
  if (localStorage.username !== undefined) {
    next();
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/");
    }
  }
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
