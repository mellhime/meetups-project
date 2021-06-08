import Vue from "vue";
import App from "./App.vue";
import "./assets/styles/index.css";
import { router } from "./router";
import TopProgressBarPlugin from "./plugins/TopProgressBar/plugin";
import ToasterPlugin from "./plugins/Toaster/plugin";

Vue.use(TopProgressBarPlugin, { router });
Vue.use(ToasterPlugin, { container: "#toaster" });
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
