import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Ensure correct path
import { authService } from "../services/AuthService"; // Ensure correct path
import banner from "../../public/banner.svg"; // Ensure correct path
import logo from "../../public/logo.svg"; // Ensure correct path

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.login(email, password);
      login(user); // Set user in AuthContext
      if (user.roles.includes("admin")) {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex h-screen">
      {/* SVG Banner Section */}
      <div className="w-1/2 h-full hidden lg:flex items-center justify-center bg-gray-100">
        <img src={banner} alt="Banner" className="object-fill w-full h-full" />
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center bg-white p-6 lg:p-12">
        <div className="w-1/2 text-xs max-w-sm">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Logo" className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-semibold mb-4 text-center">Sign in</h1>
          <p className="text-gray-600 mb-4 text-center">
            Welcome back! Please enter your details.
          </p>
          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
              {error}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-4"
          >
            <div className="w-full max-w-xs">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1 text-left"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full outline-none py-1 px-4 bg-blue-50 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="w-full max-w-xs">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1 text-left"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full outline-none py-1 px-4 bg-blue-50 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex justify-between items-center w-full max-w-xs mb-4">
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full max-w-xs bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Sign in
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
