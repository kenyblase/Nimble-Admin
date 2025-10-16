import { XCircle } from "lucide-react";
import toast from 'react-hot-toast'
import { useState } from "react";
import { useEditAdmin } from "../utils/useApis/useAdminApis/useEditAdmin";
import LoadingSpinner from "./LoadingSpinner";

function EditAdminModal({ isOpen, onClose, adminData, setAdminData }) {
  if (!isOpen) return null;

  const { editAdmin, isEditing } = useEditAdmin()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleClick = async()=>{
    if(!adminData.email || !adminData.firstName || !adminData.lastName || !adminData.phone) return toast.error('Fill in all fields')
    
    if(!adminData.role) return toast.error('Select a role for this admin')

    await editAdmin(adminData)
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-[#2E2E2E] opacity-70"
        onClick={onClose}
      />

      <div className="relative flex flex-col py-8 px-12 gap-10 bg-[#FBFCFF] w-[800px] max-w-full rounded-lg shadow-lg p-10 z-10">
            <div className=" flex justify-between items-center">
                <h1 className="font-bold text-3xl text-[#2E2E2E]">Add new Admin</h1>
                <div className="">
                    <XCircle onClick={()=>{
                        onClose()
                    }} color="#F87171" className="cursor-pointer"/>
                </div>
            </div>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center gap-6">

                <input 
                  type='text'
                  placeholder='First Name'
                  className='w-full h-12 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg'
                  value={adminData.firstName}
                  onChange={e => setAdminData(prev => ({ ...prev, firstName: e.target.value }))}
                />

              <input 
                  type='text'
                  placeholder='Last Name'
                  className='w-full h-12 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg'
                  value={adminData.lastName}
                  onChange={e => setAdminData(prev => ({ ...prev, lastName: e.target.value }))}
                />
            </div>
            <div className="flex justify-between items-center gap-6">

                <input 
                  type='text'
                  placeholder='Email Address'
                  className='w-full h-12 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg'
                  value={adminData.email}
                  onChange={e => setAdminData(prev => ({ ...prev, email: e.target.value }))}
                />

              <input 
                  type='text'
                  placeholder='Phone'
                  className='w-full h-12 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg'
                  value={adminData.phone}
                  onChange={e => setAdminData(prev => ({ ...prev, phone: e.target.value }))}
                />
            </div>
            <div className="flex justify-between items-center gap-6">

                <input 
                  type='text'
                  placeholder='Password'
                  className='w-full h-12 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />

              <input 
                  type='text'
                  placeholder='Confirm Password'
                  className='w-full h-12 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
            </div>
              <div className='w-full'>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 h-12 outline-none focus:ring-2 focus:ring-blue-500"
                  value={adminData.role}
                  onChange={e => setAdminData(prev => ({ ...prev, role: e.target.value }))}
                >
                  <option value="" disabled>Select Admin Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#666666]">Permissions</h3>
            </div>
            <div className="flex flex-col gap-4">
              {permissions.map((permission) => (
                <label
                  key={permission.id}
                  className={`flex items-center gap-4 px-3 rounded-lg transition`}
                >
                  <input
                    type="checkbox"
                    name="permissions"
                    checked={adminData.permissions.includes(permission.id)}
                    onChange={() => {
                      setAdminData(prev => {
                        const updated = prev.permissions.includes(permission.id)
                          ? prev.permissions.filter(id => id !== permission.id)
                          : [...prev.permissions, permission.id];
                        return { ...prev, permissions: updated };
                      });
                    }}
                    className=" accent-[#0057FF] h-4 w-4"
                  />
                  <span className={`font-semibold text-base text-[#000000CC] `}>{permission.label}</span>
                </label>
              ))}
            </div>
          </div>
        <div className="flex gap-4 w-full h-14">
          <button onClick={onClose} className={`w-full py-4 px-10 rounded-lg cursor-pointer font-semibold text-[#3652AD]`}>Cancel</button>
          <button onClick={handleClick} disabled={isEditing} className="bg-[#3652AD] px-10 rounded-full w-full cursor-pointer flex items-center justify-center ">{isEditing ? <LoadingSpinner size='size-5'/> : <p className="text-[#FEFEFF]">Save</p>}</button>
        </div>
      </div>
    </div>
  );
}

export default EditAdminModal;

  const permissions = [
     {
      id: "mediate",
      label: "Mediate in dispute",
    },
    {
      id: "messages",
      label: "Read and respond to messages",
    },
    {
      id: "listing-view",
      label: "View listing",
    },
    {
      id: "listing-approval",
      label: "Reject or approve listing",
    },
    {
      id: "transactions",
      label: "See transactions",
    },
    {
      id: "payout",
      label: "Approve payout requests",
    }
  ]