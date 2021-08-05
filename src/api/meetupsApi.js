import { httpClient } from "./httpClient";

export const meetupsApi = {
  fetchMeetups() {
    return httpClient.get(`/meetups`);
  },

  fetchMeetup(id) {
    return httpClient.get(`/meetups/${id}`);
  },

  createMeetup(meetup) {
    return httpClient.post(`/meetups`, meetup);
  },
  updateMeetup(meetup) {
    return httpClient.put(`/meetups/${meetup.id}`, meetup);
  },
  deleteMeetup(meetupId) {
    return httpClient.delete(`/meetups/${meetupId}`);
  },
  attend(meetupId) {
    return httpClient.put(`/meetups/${meetupId}/participation`);
  },
  leave(meetupId) {
    return httpClient.delete(`/meetups/${meetupId}/participation`);
  },
};
