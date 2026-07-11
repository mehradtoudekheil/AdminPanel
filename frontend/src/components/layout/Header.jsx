// import components
import AccountBox from '../feat/AccountBox';
import SearchBox from '../feat/SearchBox';
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";


function Header() {
  return (
    <div className='h-full w-full grid grid-cols-5 p-3 gap-x-5'>

      <div className='col-span-1 h-full flex items-center '>
        <Bars3BottomRightIcon className='w-6 h-6 text-slate-500 dark:gb-slate-400'/>
      </div>

      <div className='col-span-3 h-full'>
        <SearchBox/>
      </div>

      <div className='col-span-1  flex justify-center items-center h-full'>
       <AccountBox/>
      </div>
    </div>
  )
}

export default Header