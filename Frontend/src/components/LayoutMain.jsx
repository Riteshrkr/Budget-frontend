import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const LayoutMain = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 flex flex-col ">
        <Navbar />
      <main className="flex-1 overflow-y-auto px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutMain;
