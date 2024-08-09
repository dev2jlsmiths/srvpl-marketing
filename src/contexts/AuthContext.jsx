// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [accessToken, setAccessToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const login = (userData) => {
//     setAccessToken(userData.access_token);
//     setUser(userData);
//   };

//   const logout = () => {
//     setAccessToken(null);
//     setUser(null);
//   };

//   useEffect(() => {
//     async function fetchUserData() {
//       if (!accessToken) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch("/api/user", {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch user data");
//         }

//         const data = await response.json();
//         setUser(data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchUserData();
//   }, [accessToken]);

//   return (
//     <AuthContext.Provider value={{ accessToken, user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
