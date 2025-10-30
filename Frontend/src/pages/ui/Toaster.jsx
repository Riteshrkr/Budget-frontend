import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toaster = ({ ...props }) => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      draggable
      pauseOnHover
      pauseOnFocusLoss
      {...props}
      toastClassName="group relative flex p-4 rounded-xl shadow-lg border bg-white text-gray-900 border-gray-200"
      bodyClassName="text-sm text-gray-600"
      progressClassName="!bg-blue-600"
    />
  );
};

export { Toaster };

