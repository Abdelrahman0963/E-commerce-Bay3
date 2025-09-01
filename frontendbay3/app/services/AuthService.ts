import axios from "axios";

const API_URL = "http://localhost:1337/api/auth/local";

export const login = async (identifier: string, password: string) => {
  try {
    const response = await axios.post(API_URL, {
      identifier,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message || "Login failed, please try again."
    );
  }
};

export const register = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    const response = await axios.post(
      "http://localhost:1337/api/auth/local/register",
      {
        username,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message || "Registration failed, please try again."
    );
  }
};
