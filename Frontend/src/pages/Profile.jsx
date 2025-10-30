import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const Profile = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axiosInstance.get("/expense/analytics");
        setAnalytics(res.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading analytics...</div>;

  if (!analytics?.success)
    return <div className="text-center mt-10 text-red-500">Failed to load analytics data.</div>;

  const { totalExpenses, totalTransactions, topCategory, categoryBreakdown, monthlyData } = analytics;

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-black">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Expense Analytics</h1>

      {/* 🔹 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-gray-500 text-sm">Total Expenses</h3>
          <p className="text-2xl font-semibold text-blue-600">₹{totalExpenses}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-gray-500 text-sm">Total Transactions</h3>
          <p className="text-2xl font-semibold text-blue-600">{totalTransactions}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-gray-500 text-sm">Top Category</h3>
          <p className="text-2xl font-semibold text-blue-600">
            {topCategory || "N/A"}
          </p>
        </div>
      </div>

      {/* 🔹 Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Pie Chart - Category Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Category Breakdown</h2>
          {categoryBreakdown?.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  dataKey="total"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500 mt-6">No category data available</p>
          )}
        </div>

        {/* Bar Chart - Monthly Trend */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Monthly Expenses Trend</h2>
          {monthlyData?.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500 mt-6">No monthly data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
