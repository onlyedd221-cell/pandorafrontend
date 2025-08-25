"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
// import { useMutation /} from "@apollo/client";
import { useRouter } from "next/navigation";
import Header from "../components/header";
// import { REGISTER_USER, VERIFY_OTP, LOGIN_USER } from "../graphql/mutations/auth";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { REGISTER_USER ,VERIFY_OTP,LOGIN_USER} from "../graphql/mutations";

export default function AuthPage() {
  const [view, setView] = useState<"login" | "register" | "otp">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const [registerUser] = useMutation(REGISTER_USER);
  const [verifyOTP] = useMutation(VERIFY_OTP);
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
      toast.success("OTP sent to your email. Please verify!");
      setView("otp"); // switch to OTP input
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!otp) {
      toast.error("Enter the OTP sent to your email.");
      return setError("Enter the OTP sent to your email.");
    }

    try {
      const { data } = await verifyOTP({ variables: { email, otp } });

      localStorage.setItem("token", data.verifyOTP.token);
      localStorage.setItem("user", JSON.stringify(data.verifyOTP.user));

      toast.success("OTP verified! Welcome 🎉");
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

      localStorage.setItem("token", data.login.token);
      localStorage.setItem("user", JSON.stringify(data.login.user));

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
          {view === "otp" && "Verify OTP"}
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

            {/* Password with visibility toggle */}
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

        {/* OTP VERIFY */}
        {view === "otp" && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 transition px-4 py-2 rounded-lg font-semibold"
            >
              Verify OTP
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
        {view !== "otp" && (
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
        )}
      </div>
    </div>
  );
}
