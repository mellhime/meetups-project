<template>
  <div class="meetup-agenda" v-if="meetup">
    <meetup-agenda-item
      v-for="agendaItem in meetup.agenda"
      :agendaItem="agendaItem"
      :key="agendaItem.id"
    />
  </div>
</template>

<script>
import MeetupAgendaItem from "@/components/MeetupPage/MeetupAgendaItem";

export default {
  name: "MeetupAgendaPage",

  components: {
    MeetupAgendaItem,
  },

  props: {
    meetup: Object,
  },
};
</script>

<style scoped></style>
