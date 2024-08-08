// src/services/authService.js
const url = import.meta.env.VITE_END_POINT_API
export const authService = {
  login: async (email, password) => {
    const response = await fetch(`${url}/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    // Store the access_token in localStorage
    localStorage.setItem("access_token", data.access_token);

    return {
      userId: data.userId,
      accessToken: data.access_token,
      roles: data.roles,
    };
  },
};
