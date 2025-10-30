import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance.js";
import {
  setExpenses,
  setSummary,
  setLoading,
  setError,
} from "../store/expenseReducer.js";
import { FaEdit } from "react-icons/fa";
import { setUser } from "../store/authReducer.js";
import { FaTrashAlt, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { resetExpense } from "../store/expenseReducer.js";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { expenses, summary, loading, error } = useSelector(
    (state) => state.expense
  );
  const user = useSelector((state) => state.auth.user);




  // 🔹 Fetch expenses and summary
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const [expensesRes, summaryRes] = await Promise.all([
          axiosInstance.get("/expense"),
          axiosInstance.get("/expense/summary"),
        ]);
        dispatch(setExpenses(expensesRes.data.expenses || []));
        const formattedSummary = {
          total: summaryRes.data.totalSum || 0,
          byCategory:
            summaryRes.data.data?.reduce((acc, item) => {
              acc[item._id] = item.totalAmount;
              return acc;
            }, {}) || {},
        };
        dispatch(setSummary(formattedSummary));
      } catch (err) {
        dispatch(
          setError(err.response?.data?.message || "Failed to load expenses")
        );
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, [dispatch]);

  // 🔹 Delete an expense
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;
    try {
      await axiosInstance.delete(`/expense/${id}`);
      dispatch(setExpenses(expenses.filter((exp) => exp._id !== id)));
      toast.success("Expense deleted!");
    } catch {
      toast.error("Error deleting expense");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-300">
        Loading your expenses...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 flex flex-col p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-400">
          Welcome, {user?.username || "User"} 👋
        </h1>

      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900/70 p-5 rounded-xl border border-gray-800 shadow">
          <h3 className="text-gray-400 text-sm">Total Expenses</h3>
          <p className="text-2xl font-semibold text-blue-400 flex items-center gap-1 mt-2">
            <FaRupeeSign /> {summary?.total || 0}
          </p>
        </div>

        {summary?.byCategory &&
          Object.entries(summary.byCategory).map(([category, amount]) => (
            <div
              key={category}
              className="bg-gray-900/70 p-5 rounded-xl border border-gray-800 shadow"
            >
              <h3 className="text-gray-400 text-sm capitalize">{category}</h3>
              <p className="text-xl font-semibold text-green-400 flex items-center gap-1 mt-2">
                <FaRupeeSign /> {amount}
              </p>
            </div>
          ))}
      </div>

      {/* Expenses List */}
      <div className="bg-gray-900/70 p-6 rounded-xl border border-gray-800 shadow flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-400">
            Recent Expenses
          </h2>
          <button
            onClick={() => navigate("/add-expense")}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
          >
            + Add Expense
          </button>
        </div>

        {/* {error && <p className="text-red-500">{error}</p>} */}

        {loading ? (
          <p className="text-gray-400 text-center mt-10 animate-pulse">
            Loading expenses...
          </p>
        ) : !Array.isArray(expenses) || expenses.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">
            No expenses added yet.
          </p>
        ) : (
          <ul className="divide-y divide-gray-800">
            {expenses.map((exp) => (
              <li
                key={exp._id}
                className="flex justify-between items-center py-3 hover:bg-gray-800/50 rounded-md px-2 transition"
              >
                <div>
                  <h3 className="font-medium text-gray-200">{exp.title}</h3>
                  <p className="text-sm text-gray-400 capitalize">
                    {exp.category} • {new Date(exp.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-400 font-semibold flex items-center gap-1">
                    <FaRupeeSign /> {exp.amount}
                  </span>
                  <button
                    onClick={() => navigate(`/expense/${exp._id}`)}
                    className="text-yellow-400 hover:text-yellow-500 transition"
                    title="Edit Expense"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
