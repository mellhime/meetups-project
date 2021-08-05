<template>
  <div class="meetup-agenda__item">
    <div class="meetup-agenda__item-col">
      <app-icon :icon="icon" />
    </div>
    <div class="meetup-agenda__item-col">{{ timeline }}</div>
    <div class="meetup-agenda__item-col">
      <h5 class="meetup-agenda__title">{{ title }}</h5>
      <template v-if="agendaItem.type === 'talk'">
        <p>
          <span>{{ agendaItem.speaker }}</span>
          <span class="meetup-agenda__dot"></span>
          <span class="meetup-agenda__lang">{{ agendaItem.language }}</span>
        </p>
        <p>{{ agendaItem.description }}</p>
      </template>
    </div>
  </div>
</template>
<script>
import { agendaItemIcons, agendaItemTitles } from "@/services/meetupService";
import AppIcon from "@/components/ui/AppIcon";

export default {
  name: "MeetupAgendaItem",

  components: {
    AppIcon,
  },

  props: {
    agendaItem: {
      required: true,
      type: Object,
    },
  },

  computed: {
    icon() {
      return agendaItemIcons[this.agendaItem.type];
    },
    title() {
      return this.agendaItem.title || agendaItemTitles[this.agendaItem.type];
    },
    timeline() {
      return `${this.agendaItem.startsAt} - ${this.agendaItem.endsAt}`;
    },
  },
};
</script>
