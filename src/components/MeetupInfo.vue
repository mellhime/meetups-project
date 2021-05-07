<template>
  <ul class="info-list">
    <li>
      <app-icon icon="user" class="icon info-list__icon" />
      {{ organizer }}
    </li>
    <li>
      <app-icon icon="map" class="icon info-list__icon" />
      {{ place }}
    </li>
    <li>
      <app-icon icon="cal-lg" class="icon info-list__icon" />
      <time :datetime="dateOnlyString">{{ localDate }}</time>
    </li>
  </ul>
</template>
<script>
import AppIcon from "@/components/AppIcon";

const getDateOnlyString = (date) => {
  const YYYY = date.getUTCFullYear();
  const MM = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const DD = date.getUTCDate().toString().padStart(2, "0");
  return `${YYYY}-${MM}-${DD}`;
};

export default {
  name: "MeetupInfo",
  components: { AppIcon },

  props: {
    organizer: {
      required: true,
      type: String,
    },
    place: {
      required: true,
      type: String,
    },
    date: {
      required: true,
      type: Date,
    },
  },

  computed: {
    dateOnlyString() {
      return getDateOnlyString(this.date);
    },
    localDate() {
      return this.date.toLocaleString(navigator.language, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
};
</script>
