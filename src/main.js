import Vue from "vue";
import App from "./App.vue";
import "./assets/styles/index.css";
import { router } from "./router";
import TopProgressBarPlugin from "./plugins/topProgressBar/plugin";
import ToasterPlugin from "./plugins/toaster/plugin";
import VueMeta from "vue-meta";

Vue.use(TopProgressBarPlugin, { router });
Vue.use(ToasterPlugin, { container: "#toaster" });
Vue.use(VueMeta);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

window.onunhandledrejection = function (e) {
  Vue.prototype.$toaster.error("Произошла ошибка");
};
