import axios from "axios";
const API_URL = "http://localhost:1337/api/auth/local";

export const login = async (identifier: string, password: string) => {
  const response = await axios.post(API_URL, {
    identifier,
    password,
  });
  return response.data;
};

export const register = async ( username: string ,email: string, password: string , confirmPassword: string , phone: string) => {
  const response = await axios.post("http://localhost:1337/api/auth/local/register", {
    username, 
    email,
    password,
    confirmPassword,
    phone
  });
  return response.data;
};
