import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance.js";
import { toast } from "react-toastify";
import { setExpenses, setLoading, setError } from "../store/expenseReducer.js";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const AddExpense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.expense);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.post("/expense", form, {
        withCredentials: true,
      });

      toast.success(res.data.message || "Expense added successfully!");
      dispatch(setExpenses((prev) => [...prev, res.data.expense]));
      navigate("/"); 
    } catch (err) {
      console.error(err);
      dispatch(
        setError(err.response?.data?.message || "Failed to add expense")
      );
      toast.error(err.response?.data?.message || "Error adding expense");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-6 relative">
      <div className="bg-gray-900/90 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-800 relative">
        {/* ❌ Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
          title="Cancel and return"
        >
          <IoMdClose size={26} />
        </button>

        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Add New Expense 💰
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-1 text-gray-300">Title</label>
            <input
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Enter expense title"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-1 text-gray-300">Amount (₹)</label>
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              required
              placeholder="Enter amount"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-gray-300">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Food">🍔 Food</option>
              <option value="Transport">🚗 Transport</option>
              <option value="Entertainment">🎬 Entertainment</option>
              <option value="Shopping">🛍 Shopping</option>
              <option value="Bills">💡 Bills</option>
              <option value="Health">💊 Health</option>
              <option value="Other">📦 Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-gray-300">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              placeholder="Optional: add details about this expense"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 text-gray-300">Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md font-semibold transition-all text-white shadow-md ${
              loading
                ? "bg-blue-700/60 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            }`}
          >
            {loading ? "Adding..." : "Add Expense"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
