// import components
import Login from "../components/auth/Login"
import Register from "../components/auth/Register"
// import tools 
import { useState } from "react"


function AuthPage() {

  const [showLogin , setShowLogin] = useState(true);


  return (
    <div className="w-full h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center relative">
      {showLogin ? <Login setShowLogin={setShowLogin}/> : <Register setShowLogin={setShowLogin}/>}
    </div>
  )
}

export default AuthPage