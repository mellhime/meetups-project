<template>
  <div>
    <meetup-cover v-if="meetup" :link="coverLink" :title="meetup.title" />
    <div class="container">
      <div class="meetup">
        <div class="meetup__content">
          <content-tabs :tabs="tabs">
            <router-view :meetup="meetup" />
          </content-tabs>
        </div>
        <div class="meetup__aside">
          <meetup-info
            v-if="meetup"
            :organizer="meetup.organizer"
            :place="meetup.place"
            :date="formattedDate"
          />
          <div class="meetup-form__aside_stick">
            <primary-button block type="button"> Участвовать </primary-button>
            <secondary-button
              block
              class="button"
              tag="router-link"
              :to="{ name: 'meetup-edit', params: { meetupId } }"
            >
              Редактировать
            </secondary-button>
            <danger-button block type="button"> Удалить </danger-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MeetupCover from "../components/MeetupCover";
import MeetupInfo from "../components/MeetupInfo";
import { fetchMeetup, getMeetupCoverLink } from "@/data";
import SecondaryButton from "@/components/SecondaryButton";
import PrimaryButton from "@/components/PrimaryButton";
import DangerButton from "@/components/DangerButton";
import ContentTabs from "@/components/ContentTabs";

export default {
  name: "MeetupPage",
  components: {
    MeetupCover,
    MeetupInfo,
    SecondaryButton,
    PrimaryButton,
    DangerButton,
    ContentTabs,
  },

  props: {
    meetupId: {
      type: [String, Number],
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      tabs: [
        { to: { name: "meetup-description" }, text: "Описание" },
        { to: { name: "meetup-agenda" }, text: "Программа" },
      ],
    };
  },

  computed: {
    coverLink() {
      return getMeetupCoverLink(this.meetup);
    },
    formattedDate() {
      return new Date(this.meetup.date);
    },
  },

  beforeRouteEnter(to, from, next) {
    fetchMeetup(to.params.meetupId)
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
      fetchMeetup(to.params.meetupId).then((meetup) => {
        this.setMeetup(meetup);
        next();
      });
    }
  },

  methods: {
    setMeetup(meetup) {
      this.meetup = meetup;
    },
  },
};
</script>

<style scoped></style>
