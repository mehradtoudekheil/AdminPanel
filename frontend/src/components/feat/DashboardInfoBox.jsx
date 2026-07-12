// import icons 
import {
    CubeIcon,
    FolderIcon,
    UsersIcon,
    ShoppingCartIcon
} from "@heroicons/react/24/outline";


function DashboardInfoBox() {
    return (
        <div className='w-full h-full grid grid-cols-4 gap-x-5 py-3'>

            {/* products */}
            <div className='col-span-1 h-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg flex p-5'>
                <span className="w-12 h-12 bg-indigo-600/20 rounded-lg flex justify-center items-center">
                    <CubeIcon className="w-8 h-8 text-indigo-600" />
                </span>
                <div className="mr-7 h-full flex flex-col justify-between ">
                    <h5 className="text-slate-800 dark:text-slate-50 font-bold text-md">
                        محصولات
                    </h5>
                    <p className="text-slate-900 dark:text-slate-50 font-bold text-3xl">
                        ۲۷۰
                    </p>
                    <p className="text-slate-500 dark:text-slate-500 text-[10px] font-light">
                        نسبت به ماه قبل ۱۲٪ افزایش
                    </p>
                </div>
            </div>

            {/* users */}
            <div className='col-span-1 h-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg flex p-5'>
                <span className="w-12 h-12 bg-green-600/20 rounded-lg flex justify-center items-center">
                    <UsersIcon className="w-8 h-8 text-green-600" />
                </span>
                <div className="mr-7 h-full flex flex-col justify-between ">
                    <h5 className="text-slate-800 dark:text-slate-50 font-bold text-md">
                        کاربران
                    </h5>
                    <p className="text-slate-900 dark:text-slate-50 font-bold text-3xl">
                        ۲۷۰
                    </p>
                    <p className="text-slate-500 dark:text-slate-500 text-[10px] font-light">
                        نسبت به ماه قبل ۱۲٪ افزایش
                    </p>
                </div>
            </div>

            {/* categories */}
            <div className='col-span-1 h-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg flex p-5'>
                <span className="w-12 h-12 bg-amber-600/20 rounded-lg flex justify-center items-center">
                    <FolderIcon className="w-8 h-8 text-amber-600" />
                </span>
                <div className="mr-7 h-full flex flex-col justify-between ">
                    <h5 className="text-slate-800 dark:text-slate-50 font-bold text-md">
                        دسته بندی ها
                    </h5>
                    <p className="text-slate-900 dark:text-slate-50 font-bold text-3xl">
                        ۲۷۰
                    </p>
                    <p className="text-slate-500 dark:text-slate-500 text-[10px] font-light">
                        نسبت به ماه قبل ۱۲٪ افزایش
                    </p>
                </div>
            </div>

            {/* orders */}
            <div className='col-span-1 h-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg flex p-5'>
                <span className="w-12 h-12 bg-blue-600/20 rounded-lg flex justify-center items-center">
                    <ShoppingCartIcon className="w-8 h-8 text-blue-600" />
                </span>
                <div className="mr-7 h-full flex flex-col justify-between ">
                    <h5 className="text-slate-800 dark:text-slate-50 font-bold text-md">
                        سفارشات
                    </h5>
                    <p className="text-slate-900 dark:text-slate-50 font-bold text-3xl">
                        ۲۷۰
                    </p>
                    <p className="text-slate-500 dark:text-slate-500 text-[10px] font-light">
                        نسبت به ماه قبل ۱۲٪ افزایش
                    </p>
                </div>
            </div>


        </div>
    )
}

export default DashboardInfoBox