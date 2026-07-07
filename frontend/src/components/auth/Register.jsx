// import components
import Input from '../ui/Input'
import FormButton from '../ui/FormButton';
// import Icons
import { UserIcon, EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";
// import tools
import { useState } from 'react';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register({ setShowLogin }) {

  const { register } = useAuth();
  const navigate = useNavigate();

  // set form data in state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });


  // validate register
  const validateRegister = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!]).{8,}$/;

     // name empty 
    if (!registerData.name.trim()) {
      toast.error("نام را وارد کنید.");
      return;
    }
    // name length
    if (registerData.name.trim().length < 3) {
      toast.error("نام باید بیشتر از دو حرف باشد. ");
      return;
    }

    // email empty 
    if (!registerData.email.trim()) {
      toast.error("ایمیل را وارد کنید.");
      return;
    }

    // email validation
    if (!emailRegex.test(registerData.email.trim())) {
      toast.error("لطفا یک ایمیل معتبر وارد کنید.")
      return;
    }

     // password empty
    if (!registerData.password.trim()) {
      toast.error("رمز عبور را وارد کنید.");
      return;
    }
    // password validation
    if (!passwordRegex.test(registerData.password.trim())) {
      toast.error("پسورد شما با الگوی پسورد ها مطابق نیست. ")
      return;
    }

    // confrim password empty check
     if (!registerData.confirmPassword.trim()) {
      toast.error("رمز عبور را وارد کنید.");
      return;
    }
    // check confirm pass with pass 
    if(!registerData.confirmPassword === registerData.password){
      toast.error("رمز عبور ها مشابه نیستند. ")
      return;
    }

    await submitRegister();
  };

  // submit register
  const submitRegister = async () => {
    try {
      await register(registerData);

      toast.success("ثبت نام با موفقیت انجام شد.");
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

        case 409:
          toast.error("این ایمیل قبلاً ثبت شده است.");
          break;

        case 500:
          toast.error("خطای سرور.");
          break;

        default:
          toast.error("خطایی رخ داد.");
      }
    }
  }



  return (
    <div className='w-64 h-92 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center p-3'>
      <h2 className='text-3xl text-indigo-600 dark:text-indigo-500 text-center font-bold'>
        ثبت نام
      </h2>
      {/* registe form */}
      <form
        onSubmit={validateRegister}
        className='w-full pt-5 h-72 flex flex-col justify-between'>
        {/* name Input */}
        <Input
          type={"text"}
          icon={<UserIcon className='w-5 h-5' />}
          placeholder={"نام :"}
          value={registerData.name}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              name: e.target.value,
            })
          }
        />
        {/* email input */}
        <Input
          type={"email"}
          icon={<EnvelopeIcon className='w-5 h-5' />}
          placeholder={"ایمیل :"}
          value={registerData.email}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              email: e.target.value,
            })
          }
        />
        {/* password input */}
        <Input
          type={"password"}
          icon={<KeyIcon className='w-5 h-5' />}
          placeholder={"رمز عبور :"}
          value={registerData.password}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              password: e.target.value,
            })
          }
        />
        {/* confirm password input */}
        <Input
          type={"password"}
          icon={<KeyIcon className='w-5 h-5' />}
          placeholder={"تائید رمز عبور :"}
          value={registerData.confirmPassword}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              confirmPassword: e.target.value,
            })
          }
        />
        <FormButton
          type={"submit"}
          text={"ثبت نام"}
        />
      </form>
      <p className="text-[11px] font-light mt-2 text-slate-500 dark:text-slate-400 text-center">
        تا کنون اکانتی تداشته اید؟ <button
          onClick={() => setShowLogin(true)}
          className="text-blue-500 cursor-pointer hover:text-indigo-500"> ورود  </button> کنید
      </p>
    </div>
  )
}

export default Register