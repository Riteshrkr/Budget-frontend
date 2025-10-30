import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../api/axiosInstance.js";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading, setError, setExpenses } from "../store/expenseReducer.js";
import { IoMdClose } from "react-icons/io";

const EditExpenses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [loading, setLoadingLocal] = useState(true);

  // Fetch expense by ID
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        setLoadingLocal(true);
        const res = await axiosInstance.get("/expense");
     const expense = res.data.expenses?.find((item) => item._id === id);
        if (!expense) {
          toast.error("Expense not found");
          navigate("/");
          return;
        }
        setForm({
          title: expense.title,
          amount: expense.amount,
          category: expense.category,
          description: expense.description || "",
          date: expense.date?.slice(0, 10),
        });
      } catch (err) {
        toast.error("Failed to load expense details");
        navigate("/");
      } finally {
        setLoadingLocal(false);
      }
    };
    fetchExpense();
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.put(`/expense/${id}`, form);
      toast.success(res.data.message || "Expense updated successfully!");

      // Optionally refresh expense list
      const updatedExpenses = await axiosInstance.get("/expense");
      dispatch(setExpenses(updatedExpenses.data));

      navigate("/");
    } catch (err) {
      console.error(err);
      dispatch(setError(err.response?.data?.message || "Failed to update expense"));
      toast.error(err.response?.data?.message || "Error updating expense");
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Loading expense...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-6 relative">
      <div className="bg-gray-900/90 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-800 relative">
        {/* ❌ Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
          title="Cancel edit"
        >
          <IoMdClose size={26} />
        </button>

        <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">
          Edit Expense ✏️
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
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-400"
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
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-400"
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
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-400"
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
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-400 resize-none"
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
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-md font-semibold bg-yellow-500 hover:bg-yellow-600 text-gray-900 shadow-md transition-all"
          >
            Update Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExpenses;
