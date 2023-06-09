import axios from "axios";
import { API_URL } from "@/utils/constants";

const getOrders = async (user) => {
  const response = await axios.get(`${API_URL}/orders?userId=${user}`);
  return response.data.docs;
};

const getOrderById = async (id) => {
  const response = await axios.get(`${API_URL}/orders/${id}`);
  return response.data;
};

const createOrder = async ({
  user,
  status,
  recipient,
  totalPrice,
  deliveryAddress,
  carts,
  note,
}) => {
  const orderItem = carts.map((item) => {
    const orderItem = {};

    orderItem.product = item.product.name;
    orderItem.price = item.product.price;
    orderItem.quantity = item.quantity;
    orderItem.subtotal = item.product.price * item.quantity;
    return orderItem;
  });
  const response = await axios.post(`${API_URL}/orders`, {
    user,
    status,
    recipient,
    totalPrice,
    deliveryAddress,
    orderItem,
    note,
  });
  return response.data;
};

const deleteOrder = async (id) => {
  await axios.delete(`${API_URL}/orders/${id}`);
  return id;
};

const getPaymentLink = async (id) => {
  const response = await axios.get(`${API_URL}/orders/midtrans/${id}`);
  return response.data;
};

export { getOrders, getOrderById, createOrder, deleteOrder, getPaymentLink };
