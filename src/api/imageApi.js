import { httpClient } from "@/api/http";

export const imageApi = {
  uploadImage(file) {
    return httpClient.post("/images/upload", file);
  },
};
