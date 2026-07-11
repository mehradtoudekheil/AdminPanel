import React from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
function SearchBox() {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='w-[60%] h-8 bg-slate-50 grid grid-cols-11 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl'>
                <input
                    type="text"
                    placeholder='جستجو کنید...'
                    className='col-span-10 h-full pr-2 text-sm text-slate-500 dark:text-slate-400 outline-none'
                />
                <button className='col-span-1 rounded-tl-xl rounded-bl-xl flex items-center justify-center text-indigo-500'>
                    <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default SearchBox