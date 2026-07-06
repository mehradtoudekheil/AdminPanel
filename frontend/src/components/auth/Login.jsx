// import icons 
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";
// import tools 
import { useState } from 'react'
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import components 
import Input from '../ui/Input'
import FormButton from '../ui/FormButton'


function Login({ setShowLogin }) {
  const { login } = useAuth();


  // set form data in state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();


  // validate login data
  const validateLogin = async (e) => {
    e.preventDefault();

    // regexp
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!]).{8,}$/;

    // validation 
    // email empty 
    if (!loginData.email.trim()) {
      toast.error("ایمیل را وارد کنید.");
      return;
    }

    // email validation
    if (!emailRegex.test(loginData.email.trim())) {
      toast.error("لطفا یک ایمیل معتبر وارد کنید.")
      return;
    }

    // password empty
    if (!loginData.password.trim()) {
      toast.error("رمز عبور را وارد کنید.");
      return;
    }
    // password validation
    if (!passwordRegex.test(loginData.password.trim())) {
      toast.error("پسورد شما با الگوی پسورد ها مطابق نیست. ")
      return;
    }

    await submitLogin();

  };

  const submitLogin = async () => {
    try {
      await login(loginData);

      toast.success("ورود با موفقیت انجام شد.");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      if (!error.response) {
        toast.error("ارتباط با سرور برقرار نشد.");
        return;
      }

      switch (error.response.status) {
        case 400:
          toast.error("اطلاعات وارد شده معتبر نیست.");
          break;

        case 401:
          toast.error("ایمیل یا رمز عبور اشتباه است.");
          break;

        case 500:
          toast.error("خطایی در سرور رخ داده است.");
          break;

        default:
          toast.error("خطایی رخ داد.");
      }
    }
  };

  return (
    <div className='w-64 h-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-between p-3'>
      <h2 className='text-3xl text-indigo-600 dark:text-indigo-500 text-center font-bold'>
        وارد شوید
      </h2>
      {/* registe form */}
      <form
        onSubmit={validateLogin}
        className='w-full pt-5 h-44 flex flex-col justify-between'>
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
          text={"ورود"}
          type={"submit"}
        />
      </form>
      <p className="text-[11px] font-light mt-4 text-slate-500 dark:text-slate-400 text-center">
        تا کنون اکانتی تداشته اید؟ <button
          onClick={() => setShowLogin(false)}
          className="text-blue-500 cursor-pointer hover:text-indigo-500">ثبت نام </button> کنید
      </p>
    </div>
  )
}

export default Login