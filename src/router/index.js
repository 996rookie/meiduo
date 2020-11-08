import Vue from "vue";
import VueRouter from "vue-router";

const Login = () => import("../views/pages/Login");
const Home = () => import("../views/pages/Home");
const NotFound = () => import("../views/pages/NotFound");
const Front = () => import("../views/pages/Front");
const User = () => import("../views/pages/User");
const Sku = () => import("../views/pages/Sku");
const Spu = () => import("../views/pages/Spu");
const SpuAdd = () => import("../views/pages/SpuAdd");
const Specs = () => import("../views/pages/Specs");
const Options = () => import("../views/pages/Options");
const Channels = () => import("../views/pages/Channels");
const Brands = () => import("../views/pages/Brands");
const Pictures = () => import("../views/pages/Pictures");
const Order = () => import("../views/pages/Order");
const OrderDetail = () => import("../views/pages/OrderDetail");
const Authority = () => import("../views/pages/Authority");
const Group = () => import("../views/pages/Group");
const Admin = () => import("../views/pages/Admin");

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Login", component: Login },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      { path: "/home", name: "Front", component: Front },
      { path: "/home/front", name: "Front", component: Front },
      { path: "/home/user", name: "User", component: User },
      { path: "/home/sku", name: "Sku", component: Sku },
      { path: "/home/spu", name: "Spu", component: Spu },
      { path: "/home/spuadd", name: "SpuAdd", component: SpuAdd },
      { path: "/home/specs", name: "Specs", component: Specs },
      { path: "/home/options", name: "Options", component: Options },
      { path: "/home/channels", name: "Channels", component: Channels },
      { path: "/home/brands", name: "Brands", component: Brands },
      { path: "/home/pictures", name: "Pictures", component: Pictures },
      { path: "/home/order", name: "Order", component: Order },
      {
        path: "/home/order_detail",
        name: "OrderDetail",
        component: OrderDetail,
      },
      { path: "/home/author", name: "Authority", component: Authority },
      { path: "/home/group", name: "Group", component: Group },
      { path: "/home/admin", name: "Admin", component: Admin },
    ],
  },
  { path: "*", name: "NotFound", component: NotFound },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
