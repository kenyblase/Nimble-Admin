import { ChevronLeft, CircleCheck, Plus } from "lucide-react";
import BlueGradientButton from "../BlueGradientButton";

function EditAdminModal({ isOpen, onClose, adminData, setAdminData, openDeleteModal, openPasswordModal }) {
  if (!isOpen) return null;

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
        <div className="flex flex-col gap-8">
          <div className="flex gap-4 items-center">
            {adminData.avatar ? (
              <img src={adminData.avatar} alt="avatar" className='w-[65px] h-[76px] object-cover rounded-lg'/>
            ) : (
              icons.avatar
            )}

            <div className="flex justify-between items-center gap-4 w-full">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <span className="font-bold text-3xl text-[#2E2E2E]">{adminData.fullName}</span>
                  <div className={`flex gap-2 items-center px-2 py-1 rounded-lg ${handleAdminRoleColor(adminData.role)}`}>
                    <span className="font-semibold text-base text-[#2E2E2E]">{adminData.role}</span>
                    <span>{handleAdminRoleIcon(adminData.role)}</span>
                  </div>
                </div>
                <span className="text-[#949494] font-semibold text-base">{`Admin ID: ADMIN-${adminData._id}`}</span>
              </div>
              <div onClick={()=>{
                onClose()
                openDeleteModal()
              }} className="bg-[#FDF5F5] border border-[#E6757E] rounded-lg p-4">
                {icons.trash}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-xl text-[#666666]">Bio Data:</span>
            <div className="flex gap-8">
              <div className="flex flex-col gap-1">
                <span className="font-medium text-[#BFBFBF] text-sm">Gender</span>
                <span className="font-semibold text-base text-[#2E2E2E]">{adminData.gender}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium text-[#BFBFBF] text-sm">Age range</span>
                <span className="font-semibold text-base text-[#2E2E2E]">{calculateAge(adminData.dateOfBirth)} years old</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium text-[#BFBFBF] text-sm">Email Address:</span>
                <span className="font-semibold text-base text-[#2E2E2E]">{adminData.email}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium text-[#BFBFBF] text-sm">Role:</span>
                <span className="font-semibold text-base text-[#2E2E2E]">{adminData.role}</span>
              </div>
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
              icon={<CircleCheck color="#EBF2FF"/>}
              text={'Save Changes'}
              otherStyles={'w-full h-full flex items-center'}
              handleClick={()=>{
                onClose()
                openPasswordModal()
              }}
            />
          </div>
          <button onClick={onClose} className={`w-full py-4 rounded-lg cursor-pointer font-semibold text-[#D61C2B]`}>No, Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditAdminModal;

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

  const handleAdminRoleIcon = (adminRole)=>{
  if(adminRole === 'Super Admin') return (
    <span>{icons.superAdmin}</span>
  )
  else if(adminRole === 'Moderator') return (
    <span>{icons.moderator}</span>
  )
  else return (
    <span>{icons.support}</span>
  )
}

  const handleAdminRoleColor = (adminRole)=>{
  if(adminRole === 'Super Admin') return (
    'bg-[#FFF8F5]'
  )
  else if(adminRole === 'Moderator') return (
    'bg-[#EBF2FF]'
  )
  else return (
    'bg-green-100'
  )
}


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

function calculateAge(isoString) {
  const dob = new Date(isoString);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}

const icons = {
  avatar: <svg width="65" height="76" viewBox="0 0 250 251" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.75" width="249" height="249" rx="7.5" fill="#FAFAFA"/>
          <rect x="0.5" y="0.75" width="249" height="249" rx="7.5" stroke="#BFBFBF"/>
          <path d="M125 125.25C136.046 125.25 145 116.296 145 105.25C145 94.2043 136.046 85.25 125 85.25C113.954 85.25 105 94.2043 105 105.25C105 116.296 113.954 125.25 125 125.25Z" fill="#BFBFBF"/>
          <path d="M125 135.25C104.96 135.25 88.6399 148.69 88.6399 165.25C88.6399 166.37 89.5199 167.25 90.6399 167.25H159.36C160.48 167.25 161.36 166.37 161.36 165.25C161.36 148.69 145.04 135.25 125 135.25Z" fill="#BFBFBF"/>
          </svg>,

  trash: <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6801 2.25H13.3002C14.3661 2.25003 14.8405 2.5587 15.0853 2.86621C15.358 3.20864 15.4389 3.652 15.517 4.13086V4.13379L15.7299 5.39258V5.83301L16.2025 5.85938C17.8162 5.94903 19.4191 6.06836 21.0209 6.22754H21.0228C21.1637 6.24104 21.2682 6.36497 21.2601 6.50879C21.242 6.63639 21.1328 6.73042 21.0101 6.73047H20.9594C15.9797 6.23329 11.003 6.0253 6.05212 6.43262L5.06091 6.52246L3.02087 6.72266C2.87499 6.73565 2.7605 6.63486 2.74744 6.50098C2.73455 6.3661 2.83378 6.24127 2.97791 6.22754H2.97888L5.01892 6.02734L5.01794 6.02637C5.93865 5.93727 6.86104 5.87942 7.79236 5.81934L8.18884 5.79297L8.2533 5.40137L8.46326 4.12109C8.54655 3.61613 8.62998 3.17914 8.89978 2.84668C9.14195 2.54831 9.61241 2.25 10.6801 2.25Z" fill="#D61C2B" stroke="#D61C2B"/>
<path d="M5.67993 8.75H18.3196C18.5201 8.75 18.7178 8.83187 18.8635 8.98047C19.0031 9.13314 19.082 9.34001 19.0706 9.55957L18.4504 19.8096C18.3934 20.6015 18.3287 21.3021 17.9436 21.8291C17.5893 22.3138 16.8695 22.7597 15.2102 22.7598H8.79028C7.13153 22.7598 6.41152 22.3114 6.05688 21.8252C5.76709 21.4278 5.65819 20.9333 5.5979 20.3779L5.54907 19.8037L4.92896 9.5498C4.91754 9.34156 4.99568 9.13315 5.13794 8.97852C5.26718 8.83804 5.47056 8.75002 5.67993 8.75ZM10.3303 16.25C9.64418 16.25 9.08032 16.8139 9.08032 17.5C9.08032 18.1861 9.64418 18.75 10.3303 18.75H13.6604C14.3464 18.7498 14.9104 18.186 14.9104 17.5C14.9104 16.814 14.3464 16.2502 13.6604 16.25H10.3303ZM9.50024 12.25C8.8141 12.25 8.25024 12.8139 8.25024 13.5C8.25024 14.1861 8.8141 14.75 9.50024 14.75H14.5002C15.1863 14.7499 15.7502 14.1861 15.7502 13.5C15.7502 12.8139 15.1863 12.2501 14.5002 12.25H9.50024Z" fill="#D61C2B" stroke="#D61C2B"/>
</svg>,

superAdmin: <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.9666 9.44948L16.8333 8.13281C16.6166 7.88281 16.4416 7.41615 16.4416 7.08281V5.66615C16.4416 4.78281 15.7166 4.05781 14.8333 4.05781H13.4166C13.0916 4.05781 12.6166 3.88281 12.3666 3.66615L11.0499 2.53281C10.4749 2.04115 9.53328 2.04115 8.94994 2.53281L7.64161 3.67448C7.39161 3.88281 6.91661 4.05781 6.59161 4.05781H5.14994C4.26661 4.05781 3.54161 4.78281 3.54161 5.66615V7.09115C3.54161 7.41615 3.36661 7.88281 3.15828 8.13281L2.03328 9.45781C1.54994 10.0328 1.54994 10.9661 2.03328 11.5411L3.15828 12.8661C3.36661 13.1161 3.54161 13.5828 3.54161 13.9078V15.3328C3.54161 16.2161 4.26661 16.9411 5.14994 16.9411H6.59161C6.91661 16.9411 7.39161 17.1161 7.64161 17.3328L8.95828 18.4661C9.53328 18.9578 10.4749 18.9578 11.0583 18.4661L12.3749 17.3328C12.6249 17.1161 13.0916 16.9411 13.4249 16.9411H14.8416C15.7249 16.9411 16.4499 16.2161 16.4499 15.3328V13.9161C16.4499 13.5911 16.6249 13.1161 16.8416 12.8661L17.9749 11.5495C18.4583 10.9745 18.4583 10.0245 17.9666 9.44948ZM13.4666 8.92448L9.44161 12.9495C9.32494 13.0661 9.16661 13.1328 8.99994 13.1328C8.83328 13.1328 8.67494 13.0661 8.55828 12.9495L6.54161 10.9328C6.29994 10.6911 6.29994 10.2911 6.54161 10.0495C6.78328 9.80781 7.18328 9.80781 7.42494 10.0495L8.99994 11.6245L12.5833 8.04115C12.8249 7.79948 13.2249 7.79948 13.4666 8.04115C13.7083 8.28281 13.7083 8.68281 13.4666 8.92448Z" fill="url(#paint0_linear_123_45961)"/>
            <defs>
            <linearGradient id="paint0_linear_123_45961" x1="10.0036" y1="2.16406" x2="10.0036" y2="18.8349" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF9358"/>
            <stop offset="1" stop-color="#FFE418"/>
            </linearGradient>
            </defs>
            </svg>,
  
  moderator: <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.9666 9.44948L16.8333 8.13281C16.6166 7.88281 16.4416 7.41615 16.4416 7.08281V5.66615C16.4416 4.78281 15.7166 4.05781 14.8333 4.05781H13.4166C13.0916 4.05781 12.6166 3.88281 12.3666 3.66615L11.0499 2.53281C10.4749 2.04115 9.53328 2.04115 8.94994 2.53281L7.64161 3.67448C7.39161 3.88281 6.91661 4.05781 6.59161 4.05781H5.14994C4.26661 4.05781 3.54161 4.78281 3.54161 5.66615V7.09115C3.54161 7.41615 3.36661 7.88281 3.15828 8.13281L2.03328 9.45781C1.54994 10.0328 1.54994 10.9661 2.03328 11.5411L3.15828 12.8661C3.36661 13.1161 3.54161 13.5828 3.54161 13.9078V15.3328C3.54161 16.2161 4.26661 16.9411 5.14994 16.9411H6.59161C6.91661 16.9411 7.39161 17.1161 7.64161 17.3328L8.95828 18.4661C9.53328 18.9578 10.4749 18.9578 11.0583 18.4661L12.3749 17.3328C12.6249 17.1161 13.0916 16.9411 13.4249 16.9411H14.8416C15.7249 16.9411 16.4499 16.2161 16.4499 15.3328V13.9161C16.4499 13.5911 16.6249 13.1161 16.8416 12.8661L17.9749 11.5495C18.4583 10.9745 18.4583 10.0245 17.9666 9.44948ZM13.8999 10.4995L12.9249 13.4661C12.7999 13.9578 12.2749 14.3578 11.7416 14.3578H10.1999C9.93328 14.3578 9.55828 14.2661 9.39161 14.0995L8.16661 13.1411C8.14161 13.6745 7.89994 13.8995 7.30828 13.8995H6.90828C6.29161 13.8995 6.04161 13.6578 6.04161 13.0745V9.09115C6.04161 8.50781 6.29161 8.26615 6.90828 8.26615H7.31661C7.93328 8.26615 8.18328 8.50781 8.18328 9.09115V9.39115L9.79994 6.99115C9.96661 6.73281 10.3916 6.54948 10.7499 6.69115C11.1416 6.82448 11.3916 7.25781 11.3083 7.64115L11.1083 8.94115C11.0916 9.05781 11.1166 9.16615 11.1916 9.24948C11.2583 9.32448 11.3583 9.37448 11.4666 9.37448H13.0916C13.4083 9.37448 13.6749 9.49948 13.8333 9.72448C13.9749 9.94115 13.9999 10.2161 13.8999 10.4995Z" fill="#0057FF"/>
              </svg>,

  support: <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 2.16797H5C3.61667 2.16797 2.5 3.2763 2.5 4.64297V13.7346C2.5 15.1013 3.61667 16.2096 5 16.2096H5.63333C6.3 16.2096 6.93333 16.468 7.4 16.9346L8.825 18.343C9.475 18.9846 10.5333 18.9846 11.1833 18.343L12.6083 16.9346C13.075 16.468 13.7167 16.2096 14.375 16.2096H15C16.3833 16.2096 17.5 15.1013 17.5 13.7346V4.64297C17.5 3.2763 16.3833 2.16797 15 2.16797ZM10.2333 12.968C10.1083 13.0096 9.9 13.0096 9.76667 12.968C8.68333 12.593 6.25 11.0513 6.25 8.4263C6.25833 7.26797 7.18333 6.33464 8.33333 6.33464C9.01667 6.33464 9.61667 6.65964 10 7.16797C10.3833 6.65964 10.9833 6.33464 11.6667 6.33464C12.8167 6.33464 13.75 7.26797 13.75 8.4263C13.7417 11.0513 11.3167 12.593 10.2333 12.968Z" fill="#2AC472"/>
          </svg>
}