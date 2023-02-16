import axios from "axios";
import { API_URL } from "@/utils/constants";

const getProducts = async (categoryId) => {
  const response = await axios.get(
    `${API_URL}/products?category=${categoryId}`
  );
  return response.data.docs;
};

export { getProducts };
