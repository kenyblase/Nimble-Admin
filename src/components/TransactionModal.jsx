import { XCircle } from "lucide-react";
import toast from 'react-hot-toast'
import { useState } from "react";
import { useAddAdmin } from "../utils/useApis/useAdminApis/useAddAdmin";
import LoadingSpinner from "./LoadingSpinner";

function AddAdminModal({ isOpen, onClose, selectedTransaction=null }) {
  if (!isOpen || !selectedTransaction) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-[#2E2E2E] opacity-70"
        onClick={onClose}
      />

      <div className="relative flex flex-col p-14 gap-8 bg-[#FBFCFF] w-[800px] max-w-full rounded-3xl shadow-lg z-10 max-h-screen">
          <div className=" flex justify-between items-center">
                <h1 className="font-bold text-3xl text-[#2E2E2E]">Transaction Details</h1>
                <div className="">
                    <XCircle onClick={()=>{
                        onClose()
                    }} color="#F87171" className="cursor-pointer"/>
                </div>
            </div>

            <div className="flex flex-col rounded-xl py-5 px-4 gap-6">
                <div className="flex justify-between items-center">
                    <p className="font-normal text-lg text-[#00000099]">User</p>
                    <p className="font-normal text-lg text-[#000000]">{selectedTransaction?.user?.firstName} {selectedTransaction?.user?.lastName}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-normal text-lg text-[#00000099]">Date</p>
                    <p className="font-normal text-lg text-[#000000]">{formatDateTime(selectedTransaction?.createdAt)}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-normal text-lg text-[#00000099]">Type</p>
                    <p className="font-normal text-lg text-[#000000]">{selectedTransaction?.type}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-normal text-lg text-[#00000099]">Amount</p>
                    <p className="font-normal text-lg text-[#000000]">{selectedTransaction?.amount}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-normal text-lg text-[#00000099]">ID</p>
                    <p className="font-normal text-lg text-[#000000]">{selectedTransaction?._id.toUpperCase()}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-normal text-lg text-[#00000099]">Status</p>
                    <p className="font-normal text-lg text-[#000000]">{handleStatus(selectedTransaction?.status)}</p>
                </div>
            </div>

            {selectedTransaction?.status === 'pending' && 
            <div className="flex items-center gap-6 h-14">
                <button className="w-full h-full rounded-full px-10 bg-[#DC2626]">
                    <p className="text-base font-medium text-[#FFFFFF]">Reject</p>
                </button>
                <button className="w-full h-full rounded-full px-10 bg-[#2A7948]">
                    <p className="text-base font-medium text-[#FEFEFF]">Approve</p>
                </button>
            </div>}
      </div>
    </div>
  );
}

export default AddAdminModal;

const formatDateTime = (date) => {
  if (!date) return '';

  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = d.getFullYear();

  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const handleStatus = (status)=>{
  if(status === 'successful') return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#DEF9D4] text-[#348352]`}>
      {status}
    </span>
  )
  else if(status === 'failed') return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#F9D8D4] text-[#FF640F]`}>
      {status}
    </span>
  )
  else  return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#F9EDD4] text-[#FF8911]`}>
      {status}
    </span>
  )
}