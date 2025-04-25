import axios from "axios";
import { AxiosErrorHandler, BASE_URL } from ".";

class API_COMMON {
  get_sizes = async () => {
    const uri = `${BASE_URL}/api/v1/size`;
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios(uri, { headers });
      return response.data;
    } catch (error) {
      AxiosErrorHandler(error);
    }
  };
  get_colors = async () => {
    const uri = `${BASE_URL}/api/v1/color`;
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios(uri, { headers });
      return response.data;
    } catch (error) {
      AxiosErrorHandler(error);
    }
  };
  get_categories = async () => {
    const uri = `${BASE_URL}/api/v1/category`;
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios(uri, { headers });
      return response.data;
    } catch (error) {
      AxiosErrorHandler(error);
    }
  };
  get_dressStyle = async () => {
    const uri = `${BASE_URL}/api/v1/dress-style`;
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios(uri, { headers });
      return response.data;
    } catch (error) {
      AxiosErrorHandler(error);
    }
  };
}

export const Api_Common = new API_COMMON();
