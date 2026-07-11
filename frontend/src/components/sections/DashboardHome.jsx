import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import useAuth from "../../hooks/useAuth";
import { getTodayJalali } from "../../utils/date";
import DashboardInfoBox from "../feat/DashboardInfoBox";
import LastProducts from "../feat/LastProducts";
import LastUsers from "../feat/LastUsers";

function DashboardHome() {

  const { user } = useAuth();

  const userName = user.user.firstName;

  return (
    <div className='w-full h-full px-3'>
      {/* banner */}
      <div className='w-full h-32'>
        <div className='w-full h-full bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-600 bg-[length:200%_100%] bg-left hover:bg-right transition-[background-position] duration-500 flex justify-center items-center text-white font-bold rounded-md grid grid-cols-2 px-10'>
          <div className='col-span-1 h-full flex flex-col justify-center'>
            <h2 className='text-2xl text-slate-50'>
              {` سلام ${userName}`} 
            </h2>
            <p className='text-slate-100 text-sm mt-3 font-light'>
              خوش اومدى، امروز وضعيت فروشكاه رو بررسى كن.
            </p>
          </div>
          <div className='col-span-1 h-full flex items-center justify-end'>
            <p className='text-slate-100 text-sm ml-3 mt-1 font-light'>
              {getTodayJalali()}
            </p>
            <CalendarDaysIcon className="w-10 h-10 text-slate-50"/>
          </div>
        </div>
      </div>
      {/* info section */}
      <div className='w-full h-40 mt-3'>
        <DashboardInfoBox/>
      </div>
      {/* main */}
      <div className='w-full h-96 mt-3 grid grid-cols-3 gap-x-5'>
        <LastProducts/>
        <LastUsers/>
      </div>
    </div>
  )
}

export default DashboardHome