import axios from "axios";
const API_URL = "http://localhost:1337/api/auth/local";

export const login = async (email: string, password: string) => {
  const response = await axios.post(API_URL, {
    identifier: email,
    password,
  });
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await axios.post("http://localhost:1337/api/auth/local/register", {
    username: email.split("@")[0], 
    email,
    password,
  });
  return response.data;
};
