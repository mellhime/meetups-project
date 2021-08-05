export const TopProgressBar = {
  instance: null,

  setInstance(instance) {
    this.instance = instance;
  },

  start() {
    if (this.instance) {
      this.instance.start();
    }
  },

  finish() {
    if (this.instance) {
      this.instance.finish();
    }
  },

  fail() {
    if (this.instance) {
      this.instance.fail();
    }
  },
};
