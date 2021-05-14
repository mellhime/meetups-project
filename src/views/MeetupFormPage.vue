<template>
  <form-layout title="Создать митап">
    <meetup-form
      :meetup="meetup"
      submit-text="Создать"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </form-layout>
</template>

<script>
import FormLayout from "../components/FormLayout";
import MeetupForm from "../components/MeetupForm";
export default {
  name: "MeetupFormPage",
  components: { MeetupForm, FormLayout },

  data() {
    return {
      meetup: {
        id: 0,
        title: "",
        description: "",
        imageId: null,
        date: "2021-02-03",
        place: "",
        agenda: [],
      },
    };
  },

  methods: {
    handleSubmit(meetup) {
      this.meetup = meetup;
    },

    handleCancel() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
