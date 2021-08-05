<template>
  <form-layout title="Редактировать митап">
    <meetup-form
      v-if="meetup"
      :meetup="meetup"
      submit-text="Сохранить"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </form-layout>
</template>

<script>
import FormLayout from "../components/layouts/FormLayout";
import MeetupForm from "../components/MeetupPage/MeetupForm";
import { meetupsApi } from "../api/meetupsApi";

export default {
  name: "MeetupEditFormPage",
  metaInfo: {
    title: "Редактирование митапа",
  },
  components: { MeetupForm, FormLayout },

  props: {
    meetupId: {
      type: [String, Number],
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
    };
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchMeetup(to.params.meetupId);
    });
  },

  beforeRouteUpdate(to, from, next) {
    if (to.params.meetupId === from.params.meetupId) {
      next();
    } else {
      this.fetchMeetup(to.params.meetupId);
      next();
    }
  },

  methods: {
    async fetchMeetup(meetupId) {
      try {
        const result = await meetupsApi.fetchMeetup(meetupId);
        this.meetup = result.data;
      } catch (err) {
        if (err.response.status >= 400 && err.response.status < 500) {
          this.$toaster.error(err.message);
        } else {
          throw err;
        }
      }
    },

    handleSubmit(meetup) {
      this.meetup = meetup;
    },

    handleCancel() {
      this.$router.push({
        name: "meetup",
        params: { meetupId: this.meetup.id },
      });
    },
  },
};
</script>

<style scoped></style>
