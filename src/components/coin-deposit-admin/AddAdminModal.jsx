import { Calendar, ChevronLeft, Mail, Plus, User } from "lucide-react";
import BlueGradientButton from "../BlueGradientButton";
import Input from '../Input'
import toast from 'react-hot-toast'

function AddAdminModal({ isOpen, onClose, adminData, setAdminData, openPasswordModal }) {
  if (!isOpen) return null;

  const handleClick = ()=>{
    if(!adminData.email || !adminData.fullName || !adminData.dateOfBirth || !adminData.gender) return toast.error('Fill in all fields')
    
    if(!adminData.role) return toast.error('Select a role for this admin')
    onClose()
    openPasswordModal()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-[#2E2E2E] opacity-70"
        onClick={onClose}
      />

      <div className="relative flex flex-col gap-4 bg-white w-[800px] max-w-full rounded-lg shadow-lg p-10 z-10">
        <div onClick={onClose} className="flex items-start gap-1 cursor-pointer">
          <ChevronLeft color="#666666"/> 
          <p className="text-[#666666] font-semibold">Go Back</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl text-[#2E2E2E]">Add new Admin</h1>
          <div>
            <div className="flex justify-between items-center gap-4">
              <div className='flex flex-col gap-2 w-full'>
                <label className='text-base font-semibold text-[#757575]'> Email Address </label>
                <Input 
                  type='text'
                  placeholder='Enter Admin Email Address'
                  icon={Mail}
                  otherStyles={'w-full pt-2 pb-2 '}
                  value={adminData.email}
                  handleChange={e => setAdminData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <label className='text-base font-semibold text-[#757575]'> Full Name </label>
                <Input 
                  type='text'
                  placeholder='Enter Admin Full Name'
                  icon={User}
                  otherStyles={'w-full pt-2 pb-2 '}
                  value={adminData.fullName}
                  onChange={e => setAdminData(prev => ({ ...prev, fullName: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex justify-between gap-4">  
              <div className='flex flex-col gap-2 w-full'>
                <label className='text-base font-semibold text-[#757575]'> Date Of Birth </label>
                <Input 
                  type='date'
                  placeholder='Enter Admin Date of Birth'
                  icon={Calendar}
                  otherStyles={'w-full pt-2 pb-2 '}
                  value={adminData.dateOfBirth}
                  onChange={e => setAdminData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                />
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <label className='text-base font-semibold text-[#757575]'> Gender </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={adminData.gender}
                  onChange={e => setAdminData(prev => ({ ...prev, gender: e.target.value }))}
                >
                  <option value="" disabled>Select Admin Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-[#666666]">Select role</h3>
            <div className="flex gap-1">
              {roles.map((role) => (
                <label
                  key={role.id}
                  className={`flex items-center gap-4 px-3 py-1.5 rounded-lg cursor-pointer transition
                    ${
                      adminData.role === role.id &&`border ${role.borderColor} ${role.bgColor}`
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="role"
                    checked={adminData.role === role.id}
                    onChange={() => {
                      const newRole = role.id;
                      const allAccess = newRole === "Super Admin";
                      const permissionsForRole = allAccess ? permissions.map(p => p.id) : [];
                      
                      setAdminData(prev => ({
                        ...prev,
                        role: newRole,
                        allowAllAccess: allAccess,
                        permissions: permissionsForRole
                      }));
                    }}
                    className="hidden peer"
                  />
                    {adminData.role === role.id ? (
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="4.5" width="16" height="16" rx="2" fill="#0057FF"/>
                      <path d="M10 16.9L6 12.9L7.4 11.5L10 14.1L16.6 7.5L18 8.9L10 16.9Z" fill="white"/>
                      </svg>
                    ): (
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="5" y="5.5" width="14" height="14" rx="1" stroke="#DEDEDE" stroke-width="2"/>
                      </svg>
                    )}
                  <span className="font-semibold text-base text-[#2E2E2E]">{role.label}</span>
                  <span className="text-lg">{role.icon}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#666666]">Permissions</h3>
            <div className="flex items-center gap-2">
              <p>Allow All Access</p>
              <Toggle 
                enabled={adminData.allowAllAccess} 
                onClick={() => {
                  const newState = !adminData.allowAllAccess;
                  setAdminData(prev => ({
                    ...prev,
                    allowAllAccess: newState,
                    permissions: newState ? permissions.map(p => p.id) : []
                  }));
                }}
              />
            </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {permissions.map((permission) => (
                <label
                  key={permission.id}
                  className={`flex items-center gap-4 px-3 py-1.5 rounded-lg ${adminData.allowAllAccess ? 'cursor-not-allowed' : 'cursor-pointer'} transition`}
                >
                  <input
                    type="checkbox"
                    name="permissions"
                    checked={adminData.permissions.includes(permission.id)}
                    disabled={adminData.allowAllAccess}
                    onChange={() => {
                      setAdminData(prev => {
                        const updated = prev.permissions.includes(permission.id)
                          ? prev.permissions.filter(id => id !== permission.id)
                          : [...prev.permissions, permission.id];
                        return { ...prev, permissions: updated };
                      });
                    }}
                    className=" accent-[#0057FF]"
                  />
                  <span className={`font-semibold text-base ${adminData.allowAllAccess ? 'text-[#DEDEDE]' : 'text-[#A3A3A3]'} `}>{permission.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <div className="w-full flex items-center">
            <BlueGradientButton
              icon={<Plus color="#EBF2FF"/>}
              text={'Add admin'}
              otherStyles={'w-full h-full flex items-center'}
              handleClick={handleClick}
            />
          </div>
          <button onClick={onClose} className={`w-full py-4 rounded-lg cursor-pointer font-semibold text-[#D61C2B]`}>No, Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddAdminModal;

const roles = [
    {
      id: "Super Admin",
      label: "Super Admin",
      borderColor: "border-[#FFA776]",
      bgColor: 'bg-[#FFF8F5]',
      icon: <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.9667 9.44948L16.8334 8.13281C16.6167 7.88281 16.4417 7.41615 16.4417 7.08281V5.66615C16.4417 4.78281 15.7167 4.05781 14.8334 4.05781H13.4167C13.0917 4.05781 12.6167 3.88281 12.3667 3.66615L11.0501 2.53281C10.4751 2.04115 9.5334 2.04115 8.95007 2.53281L7.64173 3.67448C7.39173 3.88281 6.91673 4.05781 6.59173 4.05781H5.15006C4.26673 4.05781 3.54173 4.78281 3.54173 5.66615V7.09115C3.54173 7.41615 3.36673 7.88281 3.1584 8.13281L2.0334 9.45781C1.55007 10.0328 1.55007 10.9661 2.0334 11.5411L3.1584 12.8661C3.36673 13.1161 3.54173 13.5828 3.54173 13.9078V15.3328C3.54173 16.2161 4.26673 16.9411 5.15006 16.9411H6.59173C6.91673 16.9411 7.39173 17.1161 7.64173 17.3328L8.9584 18.4661C9.5334 18.9578 10.4751 18.9578 11.0584 18.4661L12.3751 17.3328C12.6251 17.1161 13.0917 16.9411 13.4251 16.9411H14.8417C15.7251 16.9411 16.4501 16.2161 16.4501 15.3328V13.9161C16.4501 13.5911 16.6251 13.1161 16.8417 12.8661L17.9751 11.5495C18.4584 10.9745 18.4584 10.0245 17.9667 9.44948ZM13.4667 8.92448L9.44173 12.9495C9.32507 13.0661 9.16673 13.1328 9.00007 13.1328C8.8334 13.1328 8.67507 13.0661 8.5584 12.9495L6.54173 10.9328C6.30007 10.6911 6.30007 10.2911 6.54173 10.0495C6.7834 9.80781 7.1834 9.80781 7.42507 10.0495L9.00007 11.6245L12.5834 8.04115C12.8251 7.79948 13.2251 7.79948 13.4667 8.04115C13.7084 8.28281 13.7084 8.68281 13.4667 8.92448Z" fill="url(#paint0_linear_123_46435)"/>
      <defs>
      <linearGradient id="paint0_linear_123_46435" x1="10.0037" y1="2.16406" x2="10.0037" y2="18.8349" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF9358"/>
      <stop offset="1" stop-color="#FFE418"/>
      </linearGradient>
      </defs>
      </svg>,
    },
    {
      id: "Moderator",
      label: "Moderator",
      borderColor: "border-[#0057FF]",
      bgColor: 'bg-[#EBF2FF]',
      icon: <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.9667 9.44948L16.8334 8.13281C16.6167 7.88281 16.4417 7.41615 16.4417 7.08281V5.66615C16.4417 4.78281 15.7167 4.05781 14.8334 4.05781H13.4167C13.0917 4.05781 12.6167 3.88281 12.3667 3.66615L11.0501 2.53281C10.4751 2.04115 9.5334 2.04115 8.95007 2.53281L7.64173 3.67448C7.39173 3.88281 6.91673 4.05781 6.59173 4.05781H5.15006C4.26673 4.05781 3.54173 4.78281 3.54173 5.66615V7.09115C3.54173 7.41615 3.36673 7.88281 3.1584 8.13281L2.0334 9.45781C1.55007 10.0328 1.55007 10.9661 2.0334 11.5411L3.1584 12.8661C3.36673 13.1161 3.54173 13.5828 3.54173 13.9078V15.3328C3.54173 16.2161 4.26673 16.9411 5.15006 16.9411H6.59173C6.91673 16.9411 7.39173 17.1161 7.64173 17.3328L8.9584 18.4661C9.5334 18.9578 10.4751 18.9578 11.0584 18.4661L12.3751 17.3328C12.6251 17.1161 13.0917 16.9411 13.4251 16.9411H14.8417C15.7251 16.9411 16.4501 16.2161 16.4501 15.3328V13.9161C16.4501 13.5911 16.6251 13.1161 16.8417 12.8661L17.9751 11.5495C18.4584 10.9745 18.4584 10.0245 17.9667 9.44948ZM13.9001 10.4995L12.9251 13.4661C12.8001 13.9578 12.2751 14.3578 11.7417 14.3578H10.2001C9.9334 14.3578 9.5584 14.2661 9.39173 14.0995L8.16673 13.1411C8.14173 13.6745 7.90007 13.8995 7.3084 13.8995H6.9084C6.29173 13.8995 6.04173 13.6578 6.04173 13.0745V9.09115C6.04173 8.50781 6.29173 8.26615 6.9084 8.26615H7.31673C7.9334 8.26615 8.1834 8.50781 8.1834 9.09115V9.39115L9.80007 6.99115C9.96673 6.73281 10.3917 6.54948 10.7501 6.69115C11.1417 6.82448 11.3917 7.25781 11.3084 7.64115L11.1084 8.94115C11.0917 9.05781 11.1167 9.16615 11.1917 9.24948C11.2584 9.32448 11.3584 9.37448 11.4667 9.37448H13.0917C13.4084 9.37448 13.6751 9.49948 13.8334 9.72448C13.9751 9.94115 14.0001 10.2161 13.9001 10.4995Z" fill="#0057FF"/>
      </svg>,
    },
    {
      id: "Support",
      label: "Support",
      borderColor: "border-green-500",
      bgColor: 'bg-green-100',
      icon: <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 2.16797H5C3.61667 2.16797 2.5 3.2763 2.5 4.64297V13.7346C2.5 15.1013 3.61667 16.2096 5 16.2096H5.63333C6.3 16.2096 6.93333 16.468 7.4 16.9346L8.825 18.343C9.475 18.9846 10.5333 18.9846 11.1833 18.343L12.6083 16.9346C13.075 16.468 13.7167 16.2096 14.375 16.2096H15C16.3833 16.2096 17.5 15.1013 17.5 13.7346V4.64297C17.5 3.2763 16.3833 2.16797 15 2.16797ZM10.2333 12.968C10.1083 13.0096 9.9 13.0096 9.76667 12.968C8.68333 12.593 6.25 11.0513 6.25 8.4263C6.25833 7.26797 7.18333 6.33464 8.33333 6.33464C9.01667 6.33464 9.61667 6.65964 10 7.16797C10.3833 6.65964 10.9833 6.33464 11.6667 6.33464C12.8167 6.33464 13.75 7.26797 13.75 8.4263C13.7417 11.0513 11.3167 12.593 10.2333 12.968Z" fill="#2AC472"/>
      </svg>,
    },
  ];

  const permissions = [
     {
      id: "analytics",
      label: "Analytics",
    },
    {
      id: "user-management",
      label: "User Management",
    },
    {
      id: "coin-deposits",
      label: "Coin Deposits",
    },
    {
      id: "notification-creation",
      label: "Notification Creation",
    },
    {
      id: "withdrawal-request",
      label: "Withdrawal Request",
    },
    {
      id: "dispute",
      label: "Dispute",
    }
  ]


  function Toggle({ enabled, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-22 h-12 flex items-center rounded-lg p-1 transition-colors duration-200 ${
        enabled ? "bg-[#EBF2FF] border border-[#669AFF]" : "bg-[#F5F5F5] border border-[#EBEBEB]"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-sm shadow-md transform transition-transform duration-200 ${
          enabled ? "bg-[#0057FF] translate-x-10" : "bg-[#BFBFBF] translate-x-0"
        }`}
      />
    </button>
  );
}