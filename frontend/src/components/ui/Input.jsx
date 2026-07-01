import React from 'react'

function Input({ icon, placeholder , value , onChange , type  }) {
    return (
        <div className='w-full grid grid-cols-7 h-10 border border-slate-200 dark:border-slate-800 rounded-md '>
            <span className='flex justify-center items-center text-indigo-600 dark:text-indigo-500 border-l border-slate-200 dark:border-slate-800 col-span-1 h-full'>
                {icon}
            </span>
            <input
            onChange={onChange}
                value={value}
                type={type}
                placeholder={placeholder}
                className='w-full h-full bg-none col-span-6 mr-2 text-slate-500 text-sm outline-none'
            />
        </div>
    )
}

export default Input