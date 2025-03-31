import axios from "axios";
import { AxiosErrorHandler, BASE_URL } from ".";

export type ProductFilterType = {
  size?: string;
  search?: string;
  category?: string;
  dressStyle?: string;
  intendedFor?: "male" | "female";
  color?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page: number;
  limit: number;
};

type GetProductType = {
  filter?: ProductFilterType;
} | void;

class API_Product {
  getProducts = async (data: GetProductType) => {
    const uri = `${BASE_URL}/api/v1/product`;
    const headers = {
      "Content-Type": "application/json",
    };
    const params = data?.filter || {};
    try {
      const response = await axios(uri, { headers, params });
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
