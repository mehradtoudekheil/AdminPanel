import React from 'react'
// import components
import Input from '../ui/Input'
import FormButton from '../ui/FormButton';
// import Icons
import { UserIcon, EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";
// import tools
import { useState } from 'react';

function Register({setShowLogin}) {

  // set form data in state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // handle register
  const registerHandler = () => {
    console.log(formData);
  }


  return (
    <div className='w-64 h-92 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center p-3'>
      <h2 className='text-3xl text-indigo-600 dark:text-indigo-500 text-center font-bold'>
        ثبت نام
      </h2>
      {/* registe form */}
      <form className='w-full pt-5 h-72 flex flex-col justify-between'>
        {/* name Input */}
        <Input
          type={"text"}
          icon={<UserIcon className='w-5 h-5' />}
          placeholder={"نام :"}
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />
        {/* email input */}
        <Input
          type={"email"}
          icon={<EnvelopeIcon className='w-5 h-5' />}
          placeholder={"ایمیل :"}
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />
        {/* password input */}
        <Input
          type={"password"}
          icon={<KeyIcon className='w-5 h-5' />}
          placeholder={"رمز عبور :"}
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />
        {/* confirm password input */}
        <Input
          type={"password"}
          icon={<KeyIcon className='w-5 h-5' />}
          placeholder={"تائید رمز عبور :"}
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({
              ...formData,
              confirmPassword: e.target.value,
            })
          }
        />
        <FormButton
          type={"button"}
          onClick={registerHandler}
        />
      </form>
      <p className="text-[11px] font-light mt-2 text-slate-500 dark:text-slate-400 text-center">
           تا کنون اکانتی تداشته اید؟ <button 
           onClick={()=>setShowLogin(true)}
           className="text-blue-500 cursor-pointer hover:text-indigo-500"> ورود  </button> کنید 
      </p>
    </div>
  )
}

export default Register