import axios from "axios";

import { BASE_ENDPOINT, PERMIT_ENDPOINT } from "../configs/apiConfig";

export const permitAPI = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_ENDPOINT}${PERMIT_ENDPOINT}`,
      JSON.stringify(payload),
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (error) {
    console.error("Submission error:", error);
    throw new Error("Failed to submit leave request");
  }
};
