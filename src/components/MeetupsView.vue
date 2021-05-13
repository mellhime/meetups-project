<template>
  <div class="container">
    <div class="filters-panel">
      <div class="filters-panel__col">
        <form-check
          :options="$options.dateFilterOptions"
          v-model="filter.date"
          @change="$emit('update:date', filter.date)"
        ></form-check>
      </div>

      <div class="filters-panel__col">
        <form-group inline>
          <app-input
            v-model="filter.search"
            @change="$emit('update:search', filter.search)"
            id="filters-panel__search"
            type="text"
            placeholder="Поиск"
            small
            rounded
          >
            <template #left-icon>
              <app-icon icon="search" />
            </template>
          </app-input>
        </form-group>
        <form-group inline>
          <page-tabs :selected.sync="localView"></page-tabs>
        </form-group>
      </div>
    </div>

    <template v-if="filteredMeetups && filteredMeetups.length">
      <fade-transition>
        <meetups-list
          v-if="view === 'list'"
          :meetups="filteredMeetups"
          key="list"
        ></meetups-list>
        <meetups-calendar
          v-else-if="view === 'calendar'"
          :meetups="filteredMeetups"
          key="calendar"
        ></meetups-calendar>
      </fade-transition>
    </template>
    <app-empty v-else>Митапов по заданным условиям не найдено...</app-empty>
  </div>
</template>

<script>
import { fetchMeetups } from "@/data";
import MeetupsList from "@/components/MeetupsList";
import MeetupsCalendar from "@/components/MeetupsCalendar";
import PageTabs from "@/components/PageTabs";
import FormCheck from "@/components/FormCheck";
import AppEmpty from "@/components/AppEmpty";
import AppIcon from "@/components/AppIcon";
import FormGroup from "@/components/FormGroup";
import AppInput from "@/components/AppInput";
import FadeTransition from "@/components/FadeTransition";

export default {
  name: "MeetupsView",

  props: {
    view: {
      type: String,
      default: "list",
    },
    date: {
      type: String,
      default: "all",
    },
    participation: {
      type: String,
      default: "all",
    },
    search: {
      type: String,
      default: "",
    },
  },

  dateFilterOptions: [
    { text: "Все", value: "all" },
    { text: "Прошедшие", value: "past" },
    { text: "Ожидаемые", value: "future" },
  ],

  components: {
    MeetupsList,
    MeetupsCalendar,
    PageTabs,
    FormCheck,
    AppEmpty,
    AppIcon,
    FormGroup,
    AppInput,
    FadeTransition,
  },

  data() {
    return {
      rawMeetups: [],
      filter: {
        date: this.date,
        participation: this.participation,
        search: this.search,
      },
      localView: this.view,
    };
  },

  mounted() {
    this.fetchMeetups();
  },

  computed: {
    meetups() {
      return this.rawMeetups.map((meetup) => ({
        ...meetup,
        cover: meetup.imageId ? `/api/images/${meetup.imageId}` : undefined,
        coverStyle: meetup.imageId
          ? {
              "--bg-url": `/api/images/${meetup.imageId}')`,
            }
          : {},
        date: new Date(meetup.date),
        localDate: new Date(meetup.date).toLocaleString(navigator.language, {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        dateOnlyString: new Date(meetup.date).toISOString().split("T"),
      }));
    },

    filteredMeetups() {
      const dateFilter = (meetup) =>
        this.filter.date === "all" ||
        (this.filter.date === "past" && new Date(meetup.date) <= new Date()) ||
        (this.filter.date === "future" && new Date(meetup.date) > new Date());

      const participationFilter = (meetup) =>
        this.filter.participation === "all" ||
        (this.filter.participation === "organizing" && meetup.organizing) ||
        (this.filter.participation === "attending" && meetup.attending);

      const searchFilter = (meetup) =>
        [meetup.title, meetup.description, meetup.place, meetup.organizer]
          .join(" ")
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());

      return this.meetups.filter(
        (meetup) =>
          dateFilter(meetup) &&
          participationFilter(meetup) &&
          searchFilter(meetup)
      );
    },
  },

  methods: {
    async fetchMeetups() {
      this.rawMeetups = await fetchMeetups();
    },
  },

  watch: {
    localView: function (newVal) {
      this.$emit("update:view", newVal);
    },
  },
};
</script>

<style scoped></style>
