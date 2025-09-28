import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../utils/api/store/useAuthStore";
import { useEffect, useState } from "react";
import Input from "../../components/Input";
import BlueGradientButton from "../../components/BlueGradientButton";
import { ChevronRightCircleIcon, Lock, User } from "lucide-react";
import toast from "react-hot-toast";
import { useLogin } from "../../utils/useApis/useAuthApis/useLogin";

const VerifyPassword = () => {
  const [password, setPassword] = useState("");

  const {login, isLoggingIn} = useLogin()

  const {admin, loginSuccess} = useAuthStore()

  const navigate = useNavigate()

  useEffect(()=>{
    if(!admin){
      navigate('/login')
    }
  },[admin])

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!password.trim()){
      toast.error("Enter Password to continue");
      return;
    }

    await login({email: admin.email, password})

    loginSuccess(admin)

    navigate('/', {replace: true})
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-[35%] min-w-md p-10 rounded-lg shadow-2xl border border-gray-200 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-lg border border-[#BFBFBF] flex items-center justify-center text-gray-400 text-3xl">
            {admin.avatar ? <img src={admin.avatar} alt="avatar" className="w-32 h-32 object-cover"/> :
            <svg width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M48.9067 48.5C59.9524 48.5 68.9067 39.5457 68.9067 28.5C68.9067 17.4543 59.9524 8.5 48.9067 8.5C37.861 8.5 28.9067 17.4543 28.9067 28.5C28.9067 39.5457 37.861 48.5 48.9067 48.5Z" fill="#1C1C1C"/>
              <path d="M48.9068 58.5C28.8668 58.5 12.5468 71.94 12.5468 88.5C12.5468 89.62 13.4268 90.5 14.5468 90.5H83.2668C84.3868 90.5 85.2668 89.62 85.2668 88.5C85.2668 71.94 68.9468 58.5 48.9068 58.5Z" fill="#1C1C1C"/>
            </svg>}
          </div>
        </div>

        <h1 className="text-2xl text-[#2E2E2E] font-semibold mb-1">Welcome Back, {admin.fullName || 'Admin'}</h1>
        <p className="text-sm text-[#757575] font-semibold mb-6">Enter your login details to get started</p>

        <div className="w-full bg-[#F5F8FE] border border-[#1C63F3] flex justify-center items-center gap-2 p-3 rounded-lg mb-5">
          <User color="#0D59F2"/>
          <p className="text-[#3B3B3B] font-semibold">{admin.email || 'Admin Email'}</p>
        </div>

        <form className="text-left space-y-4">
          <label htmlFor="password" className="font-semibold text-xl text-[#757575]">
            Password
          </label>
          <Input
            icon={Lock}
            placeholder='Enter your password'
            value={password}
            handleChange={(e)=>setPassword(e.target.value)}
            type="password"
          />

          <div className="flex items-center justify-center">
            <BlueGradientButton
                icon={<ChevronRightCircleIcon color="white"/>}
                text={'Go To Dashboard'}
                isLoading={isLoggingIn}
                width={50}
                handleClick={handleSubmit}
              />
          </div>
        </form>
        <Link to={'/login'}>
          <p className="font-medium text-[#0057FF] mt-5">Login into another account</p>
        </Link>
      </div>
    </div>
  );
}

export default VerifyPassword