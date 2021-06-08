import { httpClient } from "@/api/http";

export const imageApi = {
  uploadImage(file) {
    return httpClient.put("/auth/user");
  },
};
