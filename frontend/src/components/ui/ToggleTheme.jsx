import React from 'react'
import { MoonIcon, SunIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';


function ToggleTheme() {

  const themeHandler = () => {
    console.log("clicked");
    
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="h-12 w-[95%] flex items-center text-slate-500 absolute bottom-5 dark:text-slate-400 justify-between pl-5 border-t border-slate-200 dark:border-slate-800 px-3">
      <div className="h-full flex justify-start items-center">
        <span className="w-5 h-5">
          <ComputerDesktopIcon />
        </span>
        <h3 className="mr-3 text-sm font-medium">
          حالت تیره
        </h3>
      </div>

      <button
        type='button'
        onClick={()=>themeHandler()}
        className='cursor-pointer hover:scale-110 transition duration-300'
      >
        <MoonIcon className='w-5 h-5'/>
      </button>

    </div>
  )
}

export default ToggleTheme