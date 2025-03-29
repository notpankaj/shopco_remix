import axios from "axios";
import { AxiosErrorHandler, BASE_URL } from ".";

class API_Product {
  getProducts = async () => {
    const uri = `${BASE_URL}/api/v1/product`;
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
  getProductById = async (productId: string) => {
    const uri = `${BASE_URL}/api/v1/product/${productId}`;
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

export const Api_Product = new API_Product();
