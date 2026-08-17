import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[4.5rem] sm:pt-20 pb-28 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;
