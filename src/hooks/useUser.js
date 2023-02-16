import axios from "axios";
import { API_URL } from "@/utils/constants";

const registerUser = async ({ name, email, password }) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password,
  });
  return response.data;
};

const loginUser = async ({ email, password }) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export { registerUser, loginUser };
