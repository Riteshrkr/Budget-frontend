import React from "react";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoutes from "./components/ProtectedRoute.jsx";
import LayoutMain from "./components/LayoutMain.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditExpenses from "./pages/EditExpenses.jsx";
import AddExpenses from "./pages/AddExpenses.jsx";
import Navbar from "./components/Navbar.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    element: ( <ProtectedRoutes>
        <LayoutMain/> 
      </ProtectedRoutes>), 
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/expense/:id",
        element: <EditExpenses/>,
      },
      {
        path: "/add-expense",
        element: <AddExpenses/>,
      },
    ],
  },
]);

const App = () => {
  return <>
    <RouterProvider router={router} />;
  </>;
};

export default App;
