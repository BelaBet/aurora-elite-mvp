import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-24 px-4 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;
