import axios from "axios";
import { API_URL } from "@/utils/constants";

const getCarts = async (user) => {
  const response = await axios.get(`${API_URL}/carts?userId=${user}`);
  return response.data.docs;
};

const addToCart = async ({ user, product }) => {
  const quantity = 1;
  const response = await axios.post(`${API_URL}/carts`, {
    user,
    product,
    quantity,
  });
  return response.data;
};

const checkCart = async (user, product) => {
  const response = await axios.get(
    `${API_URL}/carts?userId=${user}&productId=${product}`
  );
  return response.data.docs;
};

const updateCart = async ({ id, quantity }) => {
  const response = await axios.patch(`${API_URL}/carts/${id}`, {
    quantity,
  });
  return response.data;
};

const getTotalItems = async (user) => {
  const response = await axios.get(`${API_URL}/carts?userId=${user}`);
  const totalItems = response.data.docs.reduce(function (result, item) {
    return result + item.quantity;
  }, 0);
  return totalItems;
};

const incrementQty = async ({ id, quantity }) => {
  quantity = quantity + 1;
  const response = await axios.patch(`${API_URL}/carts/${id}`, {
    quantity,
  });
  return response.data;
};

const decrementQty = async ({ id, quantity }) => {
  quantity = quantity - 1;
  const response = await axios.patch(`${API_URL}/carts/${id}`, {
    quantity,
  });
  return response.data;
};

const deleteCart = async (id) => {
  await axios.delete(`${API_URL}/carts/${id}`);
  return id;
};

const getTotalPrice = async (user) => {
  const response = await axios.get(`${API_URL}/carts?userId=${user}`);
  const totalPrice = response.data.docs.reduce(function (result, item) {
    return result + item.quantity * item.product.price;
  }, 0);
  return totalPrice;
};

const deleteCartByUserId = async (user) => {
  await axios.delete(`${API_URL}/carts/deleteall/${user}`);
  return user;
};

export {
  getCarts,
  addToCart,
  checkCart,
  updateCart,
  getTotalItems,
  incrementQty,
  decrementQty,
  deleteCart,
  getTotalPrice,
  deleteCartByUserId,
};
