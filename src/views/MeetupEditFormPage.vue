<template>
  <form-layout title="Редактировать митап">
    <meetup-form
      :meetup="meetup"
      submit-text="Сохранить"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </form-layout>
</template>

<script>
import FormLayout from "../components/FormLayout";
import MeetupForm from "../components/MeetupForm";
export default {
  name: "MeetupEditFormPage",
  components: { MeetupForm, FormLayout },

  props: {
    meetup: Object,
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
