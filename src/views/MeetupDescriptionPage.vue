<template>
  <p v-if="meetup" class="meetup-description">{{ meetup.description }}</p>
</template>

<script>
export default {
  name: "MeetupDescriptionPage",

  props: {
    meetup: {
      type: Object,
    },
  },
};
</script>

<style scoped></style>
