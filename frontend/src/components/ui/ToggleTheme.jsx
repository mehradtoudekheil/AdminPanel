import React from 'react'
import { MoonIcon, SunIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

function ToggleTheme() {

  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [dark])

  return (
    <div className="h-12 w-[95%] flex items-center text-slate-500 absolute bottom-5 dark:text-slate-400 justify-between pl-5 border-t border-slate-200 dark:border-slate-800 px-3">
      <div className="h-full flex justify-start items-center">
        <span className="w-5 h-5">
          <ComputerDesktopIcon />
        </span>
        <h3 className="mr-3 text-sm font-medium">
        {dark ? "حالت روشن" : "حالت تیره"}
        </h3>
      </div>

      <button
        type='button'
        onClick={() =>setDark(!dark)}
        className='cursor-pointer hover:scale-110 transition duration-300'
      >
       {dark ? <SunIcon className='w-5 h-5'/> : <MoonIcon className='w-5 h-5' />} 
      </button>

    </div>
  )
}

export default ToggleTheme