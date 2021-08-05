<template>
  <form class="form meetup-form" @submit.prevent="handleSubmit">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <form-group label="Название">
          <app-input v-model="localMeetup.title" />
        </form-group>
        <form-group label="Дата">
          <date-input v-model="localMeetup.date" />
        </form-group>
        <form-group label="Место">
          <app-input v-model="localMeetup.place" />
        </form-group>
        <form-group label="Описание">
          <app-input v-model="localMeetup.description" rows="3" multiline />
        </form-group>
        <form-group label="Изображение">
          <image-uploader v-model="localMeetup.imageId" />
        </form-group>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        v-for="(agendaItem, idx) in localMeetup.agenda"
        :key="agendaItem.id"
        @remove="removeAgendaItem(idx)"
        :agendaItem="agendaItem"
        @update:agendaItem="localMeetup.agenda.splice(idx, 1, $event)"
        class="mb-3"
      />

      <div class="form-section_append">
        <secondary-button tag="a" @click="addAgendaItem">
          + Добавить этап программы
        </secondary-button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <secondary-button block @click="$emit('cancel')">
          Отмена
        </secondary-button>
        <primary-button block type="submit">
          {{ submitText }}
        </primary-button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from "./MeetupAgendaItemForm.vue";
import ImageUploader from "./ImageUploader";
import FormGroup from "../ui/inputs/FormGroup";
import AppInput from "../ui/inputs/AppInput";
import DateInput from "../ui/inputs/DateInput";
import SecondaryButton from "../ui/buttons/SecondaryButton";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import { cloneDeep } from "lodash/fp";

let startId = 0;

function buildAgendaItem() {
  return {
    id: startId++,
    startsAt: "00:00",
    endsAt: "00:00",
    type: "other",
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

export default {
  name: "MeetupForm",

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
    FormGroup,
    AppInput,
    DateInput,
    SecondaryButton,
    PrimaryButton,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
    submitText: {
      type: String,
    },
  },

  data() {
    return {
      localMeetup: cloneDeep(this.meetup),
    };
  },

  methods: {
    addAgendaItem() {
      let newItem = buildAgendaItem();
      if (this.localMeetup.agenda.length > 0) {
        let newStartsAt = this.localMeetup.agenda.slice(-1)[0].endsAt;
        newItem = { ...newItem, startsAt: newStartsAt };
      }
      this.localMeetup.agenda.push(newItem);
    },

    removeAgendaItem(idx) {
      this.localMeetup.agenda.splice(idx, 1);
    },

    handleSubmit() {
      this.$emit("submit", cloneDeep(this.localMeetup));
    },
  },
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
