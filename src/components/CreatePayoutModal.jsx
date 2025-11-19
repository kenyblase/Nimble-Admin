import { XCircle } from "lucide-react";
import toast from 'react-hot-toast'
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useCreatePayout } from "../utils/useApis/usePayoutApis/useCreatePayout";

function CreatePayoutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { createpayout, isCreating } = useCreatePayout()

  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')

  const handleClick = async()=>{
    if(!email || !amount) return toast.error('Fill in all fields')

    await createpayout({ email, amount, note})
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-[#2E2E2E] opacity-70"
        onClick={onClose}
      />

      <div className="relative flex flex-col py-8 px-12 gap-10 bg-[#FBFCFF] w-[800px] max-w-full rounded-lg shadow-lg p-10 z-10 max-h-screen overflow-y-scroll">
          <div className=" flex justify-between items-center">
                <h1 className="font-bold text-3xl text-[#2E2E2E]">Create Payout</h1>
                <div className="">
                    <XCircle onClick={()=>{
                        onClose()
                    }} color="#F87171" className="cursor-pointer"/>
                </div>
            </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">

                <label className="font-normal text-base text-[#000000]">User Email</label>

                <input 
                  type='text'
                  placeholder='Enter User Email'
                  className='w-full h-12 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-4">

                <label className="font-normal text-base text-[#000000]">Amount</label>

                <input 
                  type='text'
                  placeholder='Enter Amount'
                  className='w-full h-12 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg'
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-4">

                <label className="font-normal text-base text-[#000000]">Add note(optional)</label>

                <textarea 
                  type='text'
                  placeholder='Enter Note'
                  className='w-full h-12 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg'
                  value={note}
                  onChange={e => setNote(e.target.value)}
                />
            </div>
        </div>
        <div className="flex justify-center gap-4 w-full h-14">
          <button onClick={handleClick} disabled={isCreating} className="bg-[#3652AD] px-10 rounded-full w-1/2 cursor-pointer flex items-center justify-center ">{isCreating ? <LoadingSpinner size='size-5'/> : <p className="text-[#FEFEFF]">Save Payout</p>}</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePayoutModal;