// import components
import Login from "../components/auth/Login"
import Register from "../components/auth/Register"

// import tools 
import { useState } from "react"


function AuthPage() {

  const [showLogin , setShowLogin] = useState(false);


  return (
    <div className="w-full h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
      {showLogin ? <Login/> : <AuthPage/>}
    </div>
  )
}

export default AuthPage