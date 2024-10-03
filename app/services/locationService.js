import axios from "axios";
import { BASE_ENDPOINT } from "../configs/apiConfig";

export const fetchAllowedLocations = async () => {
  try {
    const response = await axios.get(`${BASE_ENDPOINT}/allowedLocations`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch allowed locations:", error);
    throw error;
  }
};
