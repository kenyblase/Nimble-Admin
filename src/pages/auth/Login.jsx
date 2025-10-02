import { useState } from "react";
import { User, ChevronRightCircleIcon, Lock } from 'lucide-react'
import { toast } from "react-hot-toast";
import Input from "../../components/Input";
import { useLogin } from "../../utils/useApis/useAuthApis/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../utils/api/store/useAuthStore";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login, isLoggingIn} = useLogin()

  const {setAndAuthenticateAdmin} = useAuthStore()

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    const admin = await login({email, password})

    setAndAuthenticateAdmin(admin)

    navigate('/', {replace: true})
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="min-w-md p-10 rounded-lg shadow-2xl border border-gray-200 text-center">

        <h1 className="text-2xl text-[#2E2E2E] font-semibold mb-1">Welcome to the Admin Portal</h1>
        <p className="text-sm text-[#757575] font-semibold mb-6">Enter your email and password to continue to dashboard</p>

        <div className="text-left space-y-4">
          <label htmlFor="email" className="font-semibold text-lg text-[#757575]">
            Email Address
          </label>
          <Input
            icon={User}
            placeholder='Enter your email address here'
            value={email}
            handleChange={(e)=>setEmail(e.target.value)}
            otherStyles='mt-2'
          />

        </div>

        <div className="text-left space-y-4">
          <label htmlFor="email" className="font-semibold text-lg text-[#757575]">
            Password
          </label>
          <Input
            icon={Lock}
            placeholder='Enter your password here'
            value={password}
            handleChange={(e)=>setPassword(e.target.value)}
            otherStyles='mt-2'
          />

        </div>

        <div className="flex justify-center">
          <button onClick={handleSubmit} className="flex items-center bg-[#3652AD] text-[#FFFFFF] text-base justify-center px-10 py-3 w-1/2 rounded-full">{isLoggingIn ? <LoadingSpinner size='size-6'/> : 'Log In'}</button>
        </div>
      </div>
    </div>
  );
}
