import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // Backend API base URL

/**
 * Logs in a user by sending their credentials to the backend.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} - Returns the access token or an error message.
 */
export const loginUser = async (username, password) => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await axios.post(`${API_URL}/token`, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return { token: response.data.access_token };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { error: "Invalid username or password" };
    }
    return { error: "An error occurred. Please try again later." };
  }
};