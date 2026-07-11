// import icons 
import { ShoppingBagIcon, UserCircleIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";

// import tools 
import { useLocation, Link } from 'react-router-dom';

// import components 
import SidebarItems from "../ui/SidebarItems";

function Sidebar() {

  const location = useLocation();

  return (
    <div className='w-full h-full flex flex-col py-4 px-2'>
      <header className='flex items-center justify-center'>
        <span className='h-8 w-8 rounded-lg bg-indigo-500 text-white flex justify-center items-center'>
          <ShoppingBagIcon className='w-5 h-5' />
        </span>
        <h2 className='text-lg font-medium mr-3 text-slate-900 dark:text-slate-50'>
          فروشگاه من
        </h2>
      </header>
      <SidebarItems />

      <div className="mt-3 border-t border-slate-200 dark:border-slate-800">
        <Link to={"/dashboard/profile"}
          className={`w-full h-12 flex items-center justify-start px-3 mt-3 rounded-lg cursor-pointer transition-all duration-300 
                            ${location.pathname === "/dashboard/profile" ? "bg-indigo-500/10 text-indigo-500" : "text-slate-500 dark:text-slate-400 hover:bg-indigo-500/10 hover:text-indigo-500"}`}>
          <span className='w-5 h-5'>
            <UserCircleIcon />
          </span>
          <h3 className='mr-3 text-sm font-medium'>
            پروفایل
          </h3>
        </Link>
        <Link to={"/dashboard/settings"}
          className={`w-full h-12 flex items-center justify-start px-3 mt-3 rounded-lg cursor-pointer transition-all duration-300 
                            ${location.pathname === "/dashboard/settings" ? "bg-indigo-500/10 text-indigo-500" : "text-slate-500 dark:text-slate-400 hover:bg-indigo-500/10 hover:text-indigo-500"}`}>
          <span className='w-5 h-5'>
            <Cog8ToothIcon />
          </span>
          <h3 className='mr-3 text-sm font-medium'>
            تنظیمات
          </h3>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar