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
import MeetupCover from "@/components/MeetupPage/MeetupCover";
import MeetupInfo from "@/components/MeetupPage/MeetupInfo";
import { meetupsApi } from "@/api/meetupsApi";
import { getMeetupCoverLink, formattedDate } from "@/services/meetupService";
import SecondaryButton from "@/components/ui/buttons/SecondaryButton";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import DangerButton from "@/components/ui/buttons/DangerButton";
import ContentTabs from "@/components/ui/ContentTabs";

export default {
  name: "MeetupPage",
  metaInfo() {
    return {
      title: this.meetup === null ? "Страница митапа" : this.meetup.title,
    };
  },
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
      return formattedDate(this.meetup.date);
    },
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
  },
};
</script>

<style scoped></style>
