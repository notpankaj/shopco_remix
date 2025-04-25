import axios from "axios";

// export const BASE_URL = "http://localhost:8080";
export const BASE_URL = "https://shop-co-8jvk.onrender.com";

export const AxiosErrorHandler = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw new Error("No response received from the server.");
    }
  }
  throw new Error("An unexpected error occurred.");
};
