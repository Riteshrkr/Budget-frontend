import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authReducer.js";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance.js";
import { setUser } from "../store/authReducer.js";
import { resetExpense } from "../store/expenseReducer.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("/user/logout", {});
      if (res.data.success) {
        dispatch(setUser(null));
        dispatch(resetExpense());
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* 🔹 Left: App Name */}
      <Link to="/" className="text-xl font-semibold hover:text-gray-200">
        Budget Tracker
      </Link>

      {/* 🔹 Right: Links */}
      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-gray-200">
          Home
        </Link>

        <Link to="/add-expense" className="hover:text-gray-200">
          Add Expense
        </Link>

        {/* ✅ Profile Button */}
        <Link
          to="/profile"
          className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100 font-medium"
        >
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
