<template>
  <div class="toasts">
    <div id="toaster"></div>
    <div
      v-if="toast"
      class="toast"
      :class="{ toast_success: toast_success, toast_error: toast_error }"
    >
      <span>{{ toast }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppToast",

  data() {
    return {
      toast: null,
      toast_success: false,
      toast_error: false,
    };
  },

  methods: {
    success(message) {
      this.toast = message;
      this.toast_success = true;
      this.toast_error = false;
      setTimeout(() => {
        this.toast = null;
      }, 2000);
    },

    error(message) {
      this.toast = message;
      this.toast_error = true;
      this.toast_success = false;
      setTimeout(() => {
        this.toast = null;
      }, 2000);
    },
  },
};
</script>
