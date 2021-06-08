import axios from "axios";

/** URL адрес API */
const API_URL = process.env.VUE_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const httpClient = {
  get(link) {
    instance
      .get(link)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw new Error(error);
      });
  },
  post(link, data) {
    instance
      .post(link, data)
      .then(function (response) {
          return response.data;
      })
      .catch(function (error) {
        throw new Error(error);
      });
  },
  put(link, data) {
    instance
      .put(link, data)
      .then(function (response) {
          return response.data;
      })
      .catch(function (error) {
        throw new Error(error);
      });
  },
  delete(link) {
    instance
      .delete(link)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw new Error(error);
      });
  },
};
