import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getEmployees = async (page: number, limit: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employee`, {
      params: { page, limit },
    });
    return response.data;
  } catch {
    console.log(
      "There was an error fetching employees. Please try again later.",
    );
    return;
  }
};
