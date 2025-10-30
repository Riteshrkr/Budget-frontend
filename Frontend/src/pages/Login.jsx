import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser, setError } from "../store/authReducer.js";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const res = await axiosInstance.post("/user/login", form, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
       setForm({
          email: "",
          password: "",
        });
  }
  catch (error) {
      console.error("Login failed:", error);
      dispatch(setError(error.response?.data?.message || "Login failed"));
    }
     finally{
      dispatch(setLoading(false));
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100">
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-gray-800">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-blue-500">Welcome Back 👋</h2>
          <p className="text-gray-400 mt-1">Login to manage your expenses</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <FaUserCircle className="absolute left-3 top-3 text-gray-400 text-lg" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400 text-lg" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-400 text-sm text-center bg-red-900/30 py-1 rounded-md border border-red-700">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold transition-all text-white shadow-md
              ${
                loading
                  ? "bg-blue-700/60 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
