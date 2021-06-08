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
import FormLayout from "../components/FormLayout";
import MeetupForm from "../components/MeetupForm";
import { meetupsApi } from "../api/meetupsApi";
export default {
  name: "MeetupEditFormPage",
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
    meetupsApi
      .fetchMeetup(to.params.meetupId)
      .then((meetup) => {
        next((vm) => {
          vm.setMeetup(meetup);
        });
      })
      .catch(() => {
        next("/meetups");
      });
  },

  beforeRouteUpdate(to, from, next) {
    if (to.params.meetupId === from.params.meetupId) {
      next();
    } else {
      meetupsApi.fetchMeetup(to.params.meetupId).then((meetup) => {
        this.setMeetup(meetup);
        next();
      });
    }
  },

  methods: {
    setMeetup(meetup) {
      this.meetup = meetup;
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
