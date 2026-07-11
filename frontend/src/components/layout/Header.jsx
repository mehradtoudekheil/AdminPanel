import React from 'react'
import AccountBox from '../feat/AccountBox';


function Header() {
  return (
    <div className='h-full w-full grid grid-cols-5 p-3 gap-x-5'>

      <div className='col-span-1 bg-red-100 h-full'></div>

      <div className='col-span-3 bg-red-200 h-full'></div>

      <div className='col-span-1  flex justify-center items-center h-full'>
       <AccountBox/>
      </div>
    </div>
  )
}

export default Header