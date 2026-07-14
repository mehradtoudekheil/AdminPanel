import React from 'react'

function FormButton({ type , text}) {
    return (
        <button
            type={type}
            className='w-full h-10 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-600 bg-[length:200%_100%] bg-left hover:bg-right transition-[background-position] duration-500 flex justify-center items-center text-white font-bold rounded-md cursor-pointer mt-2'>
            {text}
        </button>
    )
}

export default FormButton