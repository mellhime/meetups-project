<template>
  <div class="toasts">
    <div v-if="toast" class="toast toast_success">
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
    };
  },

  methods: {
    success(message) {
      this.toast = message;
      setTimeout(() => {
        this.toast = null;
      }, 2000);
    },

    error(message) {
      this.toast = message;
      setTimeout(() => {
        this.toast = null;
      }, 2000);
    },
  },
};
</script>
