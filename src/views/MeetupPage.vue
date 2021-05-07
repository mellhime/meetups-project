<template>
  <div>
    <meetup-cover v-if="meetup" :link="coverLink" :title="meetup.title" />
    <div class="container">
      <div class="meetup">
        <div class="meetup__content">
          <secondary-button
            tag="router-link"
            :to="{ name: 'meetup-description', params: { meetupId } }"
          >
            Описание
          </secondary-button>
          <secondary-button
            tag="router-link"
            :to="{ name: 'meetup-agenda', params: { meetupId } }"
          >
            Программа
          </secondary-button>
          <router-view :meetup="meetup" />
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
              :to="{ name: 'meetup-edit', params: { meetup } }"
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
import { getMeetupCoverLink } from "@/data";
import SecondaryButton from "@/components/SecondaryButton";
import PrimaryButton from "@/components/PrimaryButton";
import DangerButton from "@/components/DangerButton";

export default {
  name: "MeetupPage",
  components: {
    MeetupCover,
    MeetupInfo,
    SecondaryButton,
    PrimaryButton,
    DangerButton,
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
    fetch(`/api/meetups/${to.params.meetupId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        } else {
          return res.json();
        }
      })
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
      fetch(`/api/meetups/${to.params.meetupId}`)
        .then((res) => res.json())
        .then((meetup) => {
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
