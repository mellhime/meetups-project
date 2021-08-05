import AppToast from "./AppToast";

export default {
  install(Vue, options) {
    const container = document.createElement("div");
    document.body.appendChild(container);

    Vue.prototype.$toaster = new Vue(AppToast).$mount(container);
    Vue.component("app-toast", AppToast);
  },
};
