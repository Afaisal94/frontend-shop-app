import axios from "axios";
import { API_URL } from "@/utils/constants";

const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data.docs;
};

export { getCategories };
