import { NavLink} from 'react-router-dom';
import { useAuthStore } from '../utils/api/store/useAuthStore';
import {
  LayoutGrid,       
  List,         
  FileText,         
  Users,            
  ListOrdered,      
  ArrowRightSquare,        
  Headset,    
  BarChart3,       
  AlertOctagon,          
  UserCog2,          
  Bell,       
  Tag,           
  Settings,        
  LogOut,         
  ChevronUp,
  ChevronDown,
  LayoutDashboard
} from "lucide-react"
import { useState } from 'react';
import { useLogout } from '../utils/useApis/useAuthApis/useLogout';
const Sidebar = () => {
    const {logout} = useLogout()
    const [open, setOpen] = useState(false);

    const topNavItems = [
    { to: "/", label: "Dashboard", icon: LayoutGrid },
    { to: "/listings", label: "Listings & ads", icon: List },
    { to: "/orders", label: "Order", icon: FileText },
    { to: "/users", label: "Users", icon: Users },
    { to: "/transactions", label: "Transactions", icon: ListOrdered },
    { to: "/payouts", label: "Payout", icon: ArrowRightSquare },
    { to: "/categories", label: "Categories", icon: LayoutDashboard },
    { to: "/appeals", label: "Supports & Appeals", icon: Headset },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/reports", label: "Report and security", icon: AlertOctagon },
    { to: "/admins", label: "Admins management", icon: UserCog2 },
    { to: "/notifications", label: "Notifications", icon: Bell },
  ];

  const subItems = [
    { to: "/orders", label: "Orders & transactions" },
    { to: "/users", label: "Users" },
    { to: "/signup-requests", label: "Signup requests" },
    { to: "/membership-plan", label: "Membership plan" },
  ];

  const bottomNavItems = [
    { to: "/settings", label: "Settings", icon: Settings }
  ]
  return (
    <div className='fixed w-60 h-screen border-2 border-[#F5F5F5] flex flex-col items-center p-6 gap-8'>
        <h1 className='text-xl text-[#000000] font-extrabold'>LOGO</h1>

        <div className='flex-1 overflow-y-auto gap-4 mt-6 no-scrollbar'>
            <div className='flex flex-col gap-2 '>
                {topNavItems.map(({ to, label, icon: Icon }) => (
                    <NavLink key={to} to={to} className="outline-none">
                    {({ isActive }) => (
                        <div
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            isActive ? "bg-[#D3E4FE]" : "hover:bg-gray-100"
                        }`}
                        >
                            <Icon size={16} />
                            <p className="text-sm">{label}</p>
                        </div>
                    )}
                    </NavLink>
                ))}

                <div className="w-full">
                    {/* Parent Item */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition"
                    >
                        <div className="flex items-center gap-3">
                        <Tag size={16} />
                        <span className="text-sm">Drop-shipping</span>
                        </div>
                        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {/* Sub Items */}
                    {open && (
                        <div className="ml-10 mt-2 flex flex-col gap-2">
                        {subItems.map(({ to, label }) => (
                            <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `text-sm transition px-1 py-2 rounded-lg ${
                                isActive ? "font-semibold text-blue-600" : "hover:bg-gray-100"
                                }`
                            }
                            >
                            {label}
                            </NavLink>
                        ))}
                        </div>
                    )}
                    </div>

                {bottomNavItems.map(({ to, label, icon: Icon }) => (
                    <NavLink key={to} to={to} className="outline-none">
                    {({ isActive }) => (
                        <div
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            isActive ? "bg-[#D3E4FE]" : "hover:bg-gray-100"
                        }`}
                        >
                            <Icon size={16} />
                            <p className="text-sm">{label}</p>
                        </div>
                    )}
                    </NavLink>
                ))}

                <div onClick={logout} className='flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer hover:bg-gray-100'>
                    <LogOut size={16} />
                    <p className="text-sm">Logout</p>
                </div>
            </div>
             
        </div>
    </div>
  )
}

export default Sidebar


const icons = {
    
}