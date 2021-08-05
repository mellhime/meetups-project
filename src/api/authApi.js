import { httpClient } from "./httpClient";

export const authApi = {
  fetchUser() {
    return httpClient.get("/auth/user");
  },
  login(email, password) {
    return httpClient.post("/auth/login", { email: email, password: password });
  },
  register(user) {
    return httpClient.post("/auth/register", user);
  },
  logout() {
    return httpClient.post("/auth/logout");
  },
};
