import axios from "axios";
import { AxiosErrorHandler, BASE_URL } from ".";

class API_AUTH {
  login = async (email: string, password: string) => {
    const uri = `${BASE_URL}/api/v1/auth/login`;
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      email,
      password,
      role: "customer",
    };
    try {
      const response = await axios.post(uri, body, { headers });
      return response.data;
    } catch (error) {
      AxiosErrorHandler(error);
    }
  };
  register = async (email: string, password: string) => {
    const uri = `${BASE_URL}/api/v1/auth/login`;
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      email,
      password,
      role: "customer",
    };
    try {
      const response = await axios.post(uri, body, { headers });
      return response.data;
    } catch (error) {
      AxiosErrorHandler(error);
    }
  };
}

export const Api_Auth = new API_AUTH();
