export const loginUser = async (username, password) => {
  try {
    const formData = new URLSearchParams();
    formData.append('username', username); // Use 'username' from input
    formData.append('password', password);

    const response = await axios.post(`${API_URL}/token`, formData, { // Fixed URL
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = response.data; // Correct field name
    localStorage.setItem('token', access_token);
    return { token: access_token };
  } catch (error) {
    console.error('Login failed:', error);
    return { error: true };
  }
};