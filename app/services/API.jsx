import axios from "axios";

export const loginAPI = async (email, password) => {
  try {
    const response = await axios.post(
      "https://devbpkpenaburjakarta.my.id/api_Login/Login.php",
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
        timeout: 5000, // timeout after 5 seconds
      }
    );
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error details:", error);
    throw new Error("Failed to login: " + error.message);
  }
};
