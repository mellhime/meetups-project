/** URL адрес API */
export const API_URL = process.env.VUE_APP_API_URL;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
export function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Получает список митапов с API
 * @return {Promise}
 */
export async function fetchMeetups() {
  return fetch(`${API_URL}/meetups`).then((res) => res.json());
}

/**
 * Получает данные митапа по его ID с API
 * @param {Number} id
 * @return {Promise}
 */
export async function fetchMeetup(id) {
  return fetch(`${API_URL}/meetups/${id}`).then((res) => {
    if (!res.ok) {
      throw new Error();
    } else {
      return res.json();
    }
  });
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
export const agendaItemTitles = {
  registration: "Регистрация",
  opening: "Открытие",
  break: "Перерыв",
  coffee: "Coffee Break",
  closing: "Закрытие",
  afterparty: "Afterparty",
  talk: "Доклад",
  other: "Другое",
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
export const agendaItemIcons = {
  registration: "key",
  opening: "cal-sm",
  talk: "tv",
  break: "clock",
  coffee: "coffee",
  closing: "key",
  afterparty: "cal-sm",
  other: "cal-sm",
};

export const getAgendaItemTypes = () => [
  { value: "registration", text: "Регистрация" },
  { value: "opening", text: "Открытие" },
  { value: "break", text: "Перерыв" },
  { value: "coffee", text: "Coffee Break" },
  { value: "closing", text: "Закрытие" },
  { value: "afterparty", text: "Afterparty" },
  { value: "talk", text: "Доклад" },
  { value: "other", text: "Другое" },
];

export const getAgendaItemLanguageOptions = () => [
  { value: null, text: "Не указано" },
  { value: "RU", text: "RU" },
  { value: "EN", text: "EN" },
];

export const getAgendaItemsFieldSpecifications = () => {
  const common = [
    {
      title: "Нестандартный текст (необязательно)",
      field: "title",
      component: "app-input",
      model: { prop: "value", event: "input" },
      props: {},
    },
  ];

  return {
    registration: [...common],
    opening: [...common],
    talk: [
      {
        title: "Тема",
        field: "title",
        component: "app-input",
        model: { prop: "value", event: "input" },
        props: {},
      },
      {
        title: "Докладчик",
        field: "speaker",
        component: "app-input",
        model: { prop: "value", event: "input" },
        props: {},
      },
      {
        title: "Описание",
        field: "description",
        component: "app-input",
        model: { prop: "value", event: "input" },
        props: {
          multiline: true,
        },
      },
      {
        title: "Язык",
        field: "language",
        component: "dropdown-button",
        model: { prop: "value", event: "change" },
        props: {
          options: getAgendaItemLanguageOptions(),
          title: "Язык",
        },
      },
    ],
    break: [...common],
    coffee: [...common],
    closing: [...common],
    afterparty: [...common],
    other: [
      {
        title: "Заголовок",
        field: "title",
        component: "app-input",
        model: { prop: "value", event: "input" },
        props: {},
      },
      {
        title: "Описание",
        field: "description",
        component: "app-input",
        model: { prop: "value", event: "input" },
        props: {
          multiline: true,
        },
      },
    ],
  };
};
