import React from 'react'
import { EyeIcon , EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';


function Input({ icon, placeholder , value , onChange , type , isPassword = false  }) {

    const [showPassword , setShowPassword] = useState(false);

    return (
        <div className='w-full grid grid-cols-7 h-10 border border-slate-200 dark:border-slate-800 rounded-md '>
            <span className='flex justify-center items-center text-indigo-600 dark:text-indigo-500 border-l border-slate-200 dark:border-slate-800 col-span-1 h-full'>
                {icon}
            </span>
            <input
            onChange={onChange}
                value={value}
               type={isPassword ? (showPassword ? "text" : "password") : type}
                placeholder={placeholder}
                className={`w-full h-full bg-none col-span-5 mr-2 text-slate-500 text-sm outline-none`}
            />
              <button
              onClick={()=>{ setShowPassword(!showPassword);}}
              type='button' 
              className={` ${isPassword ? "flex" : "hidden"} justify-center items-center text-indigo-600 dark:text-indigo-500 border-r border-slate-200 dark:border-slate-800 col-span-1 h-full`}>
                {
                    showPassword ? <EyeSlashIcon className='w-5 h-5'/> : <EyeIcon className='w-5 h-5'/>
                }
            </button>
        </div>
    )
}

export default Input