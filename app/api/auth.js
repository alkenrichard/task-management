import axios from "axios";
import { BASE_ENDPOINT, LOGIN_ENDPOINT } from "../configs/apiConfig";

export const loginAPI = async (email, password) => {
  try {
    const response = await axios.post(
      `${BASE_ENDPOINT}${LOGIN_ENDPOINT}`,
      {
        email_penabur: email,
        password_email_penabur: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        timeout: 3000, // timeout after 5 seconds
      }
    );
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error details:", error);
    throw new Error("Failed to login: " + error.message);
  }
};
