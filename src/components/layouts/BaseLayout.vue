<template>
  <div class="wrapper bg-grey">
    <the-header />
    <main>
      <slot />
    </main>
    <the-footer />
  </div>
</template>

<script>
import TheHeader from "../layout/TheHeader";
import TheFooter from "../layout/TheFooter";
export default {
  name: "BaseLayout",
  components: { TheHeader, TheFooter },
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}
</style>
