// import icons 
import {
    HomeIcon,
    CubeIcon,
    FolderIcon,
    UsersIcon,
    ShoppingCartIcon,
    ChartBarIcon
} from "@heroicons/react/24/outline";

// import tools 
import { useLocation, Link } from 'react-router-dom';


function DashboardItems() {


    const location = useLocation();


    const adminDashItems = [
        {
            title: "داشبورد",
            icon: <HomeIcon />,
            path: "/dashboard"
        },
        {
            title: "محصولات",
            icon: <CubeIcon />,
            path: "/dashboard/products"
        },
        {
            title: "دسته بندی ها",
            icon: <FolderIcon />,
            path: "/dashboard/categories"
        },
        {
            title: "کاربران",
            icon: <UsersIcon />,
            path: "/dashboard/users"
        },
        {
            title: "سفارش ها",
            icon: <ShoppingCartIcon />,
            path: "/dashboard/orders"
        },
        {
            title: "گزارش ها",
            icon: <ChartBarIcon />,
            path: "/dashboard/logs"
        },
    ];

    return (
        <div className='w-full mt-4 border-t border-slate-200 dark:border-slate-800'>
            {
                adminDashItems.map((item, index) => (
                    <Link to={item.path}
                        key={index}
                        className={`w-full h-12 flex items-center justify-start px-3 mt-3 rounded-lg cursor-pointer transition-all duration-300 
                            ${location.pathname === item.path ? "bg-indigo-500/10 text-indigo-500" : "text-slate-500 dark:text-slate-400 hover:bg-indigo-500/10 hover:text-indigo-500"}`}>
                        <span className='w-5 h-5'>
                            {item.icon}
                        </span>
                        <h3 className='mr-3 text-sm font-medium'>
                            {item.title}
                        </h3>
                    </Link>
                ))
            }
        </div>
    )
}

export default DashboardItems