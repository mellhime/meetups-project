import AppToast from "./AppToast";

export default {
  install(Vue, options = {}) {
    let { container } = options;
    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
    }

    Vue.prototype.$toaster = new Vue(AppToast).$mount(container);
    Vue.component("app-toast", AppToast);
  },
};
