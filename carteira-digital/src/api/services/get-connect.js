import axios from "axios";

export const fetchExpesens = async () => {
  try {
    const response = await axios.get("http://localhost:5000/expenses");
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchEarnings = async () => {
  try {
    const response = await axios.get("http://localhost:5000/earnings");
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchInvestiment = async () => {
  try {
    const response = await axios.get("http://localhost:5000/investment");
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const response = await axios.get("http://localhost:5000/login");
    return response;
  } catch (error) {
    throw error;
  }
};
