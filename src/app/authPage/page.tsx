"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { REGISTER_USER, LOGIN_USER } from "../graphql/mutations";

export default function AuthPage() {
  const [view, setView] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const [registerUser] = useMutation(REGISTER_USER);
  const [loginUser] = useMutation(LOGIN_USER);

  // Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return setError("All fields are required.");
    }

    try {
      const { data } = await registerUser({ variables: { name, email, password } });
      const registerData = data as { register: { token: string; user: any } };

      localStorage.setItem("token", registerData.register.token);
      localStorage.setItem("user", JSON.stringify(registerData.register.user));

      toast.success("Registration successful 🎉");
      router.push("/booking");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  // Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      toast.error("Email and password are required.");
      return setError("Email and password are required.");
    }

    try {
      const { data } = await loginUser({ variables: { email, password } });
      const loginData = data as { login: { token: string; user: any } };

      localStorage.setItem("token", loginData.login.token);
      localStorage.setItem("user", JSON.stringify(loginData.login.user));

      toast.success("Login successful 🎉");
      router.push("/booking");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center justify-center">
      <Header />
      <div className="bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md text-center border border-pink-500">
        <h2 className="text-2xl font-bold text-pink-400 mb-4">
          {view === "login" && "Login"}
          {view === "register" && "Register"}
        </h2>

        {/* REGISTER */}
        {view === "register" && (
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            {/* Password with toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 transition px-4 py-2 rounded-lg font-semibold"
            >
              Register
            </button>
          </form>
        )}

        {/* LOGIN */}
        {view === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            {/* Password with toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 transition px-4 py-2 rounded-lg font-semibold"
            >
              Login
            </button>
          </form>
        )}

        {/* Switch link */}
        <p className="text-gray-400 text-sm mt-4">
          {view === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-pink-400 font-semibold hover:underline"
            onClick={() => {
              setError("");
              setView(view === "login" ? "register" : "login");
            }}
          >
            {view === "login" ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
