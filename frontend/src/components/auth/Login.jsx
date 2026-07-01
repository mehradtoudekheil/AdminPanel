// import icons 
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";
// import tools 
import { useState } from 'react'
// import components 
import Input from '../ui/Input'
import FormButton from '../ui/FormButton'


function Login({setShowLogin}) {

  // set form data in state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  // handle login 
  const loginHandler = () => {
    console.log(loginData);
  }

  return (
    <div className='w-64 h-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center p-3'>
      <h2 className='text-3xl text-indigo-600 dark:text-indigo-500 text-center font-bold'>
        ورود 
      </h2>
      {/* registe form */}
      <form className='w-full pt-3 h-40 flex flex-col justify-between'>
         {/* email input */}
        <Input
          type={"email"}
          icon={<EnvelopeIcon className='w-5 h-5' />}
          placeholder={"ایمیل :"}
          value={loginData.email}
          onChange={(e) =>
            setLoginData({
              ...loginData,
              email: e.target.value,
            })
          }
        />
        {/* password input */}
        <Input
          type={"password"}
          icon={<KeyIcon className='w-5 h-5' />}
          placeholder={"رمز عبور :"}
          value={loginData.password}
          onChange={(e) =>
            setLoginData({
              ...loginData,
              password: e.target.value,
            })
          }
        />
        {/* Login Button */}
         <FormButton
          type={"button"}
          onClick={loginHandler}
        />
      </form>
      <p className="text-[11px] font-light mt-2 text-slate-500 dark:text-slate-400 text-center">
           تا کنون اکانتی تداشته اید؟ <button 
           onClick={()=>setShowLogin(false)}
           className="text-blue-500 cursor-pointer hover:text-indigo-500">ثبت نام </button> کنید 
      </p>
    </div>
  )
}

export default Login