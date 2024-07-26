// src/services/authService.js

export const authService = {
  login: async (email, password) => {
    // Example of an API call or mock service
    if (email === "admin@example.com" && password === "admin") {
      return { email, role: "admin", name: "Admin User" };
    } else if (email === "user@example.com" && password === "user") {
      return { email, role: "user", name: "Regular User" };
    } else {
      throw new Error("Invalid credentials");
    }
  },

  // You can add other authentication-related methods here, e.g., logout, register, etc.
};
