// src/services/authService.js
// export const authService = {
//   login: async (email, password) => {
//     const response = await fetch("http://192.168.1.38:5000/v1/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//       throw new Error("Invalid credentials");
//     }

//     const data = await response.json();
//     return {
//       userId: data.userId,
//       accessToken: data.access_token,
//       roles: data.roles,
//     };
//   },
// };

export const authService = {
  login: async (email, password) => {
    const response = await fetch("http://192.168.1.38:5000/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  },
};
