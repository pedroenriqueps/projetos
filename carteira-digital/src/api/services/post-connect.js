import axios from "axios";

export const CreateExpenses = async (data) => {
  try {
    const response = await axios.post("http://localhost:5000/expenses", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CreateEarnings = async (data) => {
  try {
    const response = await axios.post("http://localhost:5000/earnings", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CreateInvestiment = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/investiment",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Createuser = async (data) => {
  try {
    const response = await axios.post("http://localhost:5000/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const SearchLogin = async (data) => {
  try {
    const response = await axios.post("http://localhost:5000/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
