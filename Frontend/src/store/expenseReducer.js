import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    summary: {total: 0, byCategory: {}},
    loading: false,
    error: null,
  },
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetExpense: (state) => {
      state.expenses = [];
      state.summary = {};
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setExpenses, setSummary, setLoading, setError,resetExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
