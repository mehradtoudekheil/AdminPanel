import { UsersIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function LastUsers() {
  return (
    <div className='col-span-1 h-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3'>
      <header className="w-full flex justify-between h-12 items-center">
        <div className="flex items-center">
          <UsersIcon className="text-indigo-500 w-6 h-6" />

          <h3 className="mr-2 text-slate-900 dark:text-slate-50 font-bold">
            کاربران جدید
          </h3>
        </div>

        <Link
          to="/dashboard/Users"
          className="text-blue-500 text-sm hover:text-indigo-500"
        >
          مشاهده همه
        </Link>
      </header>
      <div className="w-full pt-3">
        {/* item */}
        <div className="w-full h-14 flex items-center border-b border-slate-200 dark:border-slate-800 justify-between">
          <div className="flex h-full items-center justify-start">
            <span className="w-10 h-10 rounded-full bg-blue-500">

            </span>
            <div className="mr-3">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-50">مهراد توده خیل</p>
              <p className="text-xs font-light text-slate-500 dark:text-slate-400 mt-1">mehrad3@test.com
              </p>
            </div>
          </div>
          <p className="text-sm font-light text-slate-500 dark:text-slate-400 pl-4">
            امروز
          </p>
        </div>
      </div>
    </div>
  )
}

export default LastUsers