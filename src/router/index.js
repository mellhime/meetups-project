import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import MeetupsPage from "../views/MeetupsPage";
import MeetupPage from "../views/MeetupPage";
import MeetupDescriptionPage from "../views/MeetupDescriptionPage";
import MeetupAgendaPage from "../views/MeetupAgendaPage";
import MeetupFormPage from "../views/MeetupFormPage";
import NotFoundPage from "@/views/NotFoundPage";
import MeetupEditFormPage from "@/views/MeetupEditFormPage";

Vue.use(VueRouter);

export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  } else if (to.hash) {
    return { selector: to.hash };
  } else if (
    to.matched.some((record) => record.meta.saveScrollPosition) &&
    from.matched.some((record) => record.meta.saveScrollPosition)
  ) {
    return false;
  } else {
    return { x: 0, y: 0 };
  }
}

const routes = [
  {
    path: "/",
    name: "index",
    component: MeetupsPage,
  },
  {
    path: "/meetups",
    name: "meetups",
    component: MeetupsPage,
  },
  {
    path: "/meetups/:meetupId(\\d+)",
    redirect: (to) => ({ name: "meetup-description", params: to.params }),
    name: "meetup",
    props: true,
    meta: {
      showReturnToMeetups: true,
      saveScrollPosition: true,
    },
    component: MeetupPage,
    children: [
      {
        path: "",
        alias: "description",
        name: "meetup-description",
        props: true,
        component: MeetupDescriptionPage,
      },
      {
        path: "agenda",
        name: "meetup-agenda",
        props: true,
        component: MeetupAgendaPage,
      },
    ],
  },
  {
    path: "/meetups/create",
    name: "meetup-create",
    component: MeetupFormPage,
  },
  {
    path: "/meetups/:meetupId(\\d+)/edit",
    name: "meetup-edit",
    props: true,
    component: MeetupEditFormPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];

export const router = new VueRouter({
  mode: "history",

  base: process.env.BASE_URL,

  routes,
});
