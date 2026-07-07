import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

function DashboardLayout() {
  return (
    <div className="w-full grid grid-cols-12 bg-slate-50 dark:bg-slate-950 h-screen p-3 gap-x-4">

      <aside className="h-full col-span-2 border border-slate-200 dark:border-slate-800 rounded-md">
        <Sidebar/>
      </aside>

      <div className="h-full col-span-10 border border-slate-200 dark:border-slate-800 rounded-md">

        <header className="w-full h-18 bg-white dark:bg-slate-900 rounded-tr-md rounded-tl-md">
          <Header/>
        </header>

        <main className="w-full h-[90%] p-3">
          <Outlet/>
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;