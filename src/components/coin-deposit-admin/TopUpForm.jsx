import { CircleCheck, Coins, Notebook, User } from 'lucide-react'
import { useState } from 'react'
import Input from '../Input'
import BlueGradientButton from '../BlueGradientButton'

const TopUpForm = () => {
  const [userName, setUserName] = useState('')
  const [amount, setAmount] = useState(0)
  const [selectedReason, setSelectedReason] = useState("");
  const [note, setNote] = useState("");

  const reasons = [
    "Payment Failure",
    "Compensation",
    "Gifting/Referrals",
    "Others",
  ];
  return (
    <div className='flex flex-col gap-8'>
      <div className="flex justify-between items-center gap-4">
          <div className='flex flex-col gap-2 w-full'>
            <label className='text-base font-semibold text-[#757575]'> Username: </label>
            <Input 
              type='text'
              placeholder='Enter Username'
              icon={User}
              otherStyles={'w-full pt-2 pb-2 '}
              value={userName}
              handleChange={e => setUserName(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label className='text-base font-semibold text-[#757575]'> Coin Amount: </label>
            <div className="relative w-full">
            <Input 
              type='number'
              placeholder='Enter coin amount'
              icon={Coins}
              otherStyles={'w-full pt-2 pb-2 '}
              value={amount}
              min={0}
              onChange={e => setAmount(e.target.value)}
            />
            
              <span className="absolute right-25 top-2.5 text-gray-400 text-sm">
                ≈ ₦{(amount * 100).toLocaleString()}
              </span>
              <span className="absolute right-10 top-2 text-gray-400">Coins</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <label className='text-base font-semibold text-[#757575]'> Reason for top up: </label>
           <div className="flex gap-6">
            {reasons.map((reason) => (
              <label
                key={reason}
                className="flex items-center gap-2 cursor-pointer select-none p-3 pr-10"
              >
                <input
                  type="checkbox"
                  checked={selectedReason === reason}
                  onChange={() => setSelectedReason(reason)}
                  className="h-4 w-4 border border-gray-400 rounded-sm checked:accent-[#0057FF] "
                />
                <span className="text-base font-semibold text-[#757575]">{reason}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className='flex flex-col gap-2 w-full'>
            <label className='text-base font-semibold text-[#757575]'> Note (Optional) </label>
            <textarea
              className="w-full p-2 border border-[#EBEBEB] bg-[#FAFAFA] rounded-lg resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              rows="3"
              placeholder="Write a brief description about this transaction"
              value={note}
              onChange={e=>setNote(e.target.value)}
            />
          </div>
        </div>

        <div className='w-full flex gap-6 justify-end mb-2'>
          <div className="flex gap-4 w-1/2">
            <div className="w-full flex items-center">
              <BlueGradientButton
                icon={<CircleCheck color="#EBF2FF"/>}
                text='Save changes'
                otherStyles='w-full h-full flex items-center'
              />
            </div>
            <button className={`w-full py-4 rounded-lg cursor-pointer font-semibold text-[#D61C2B]`}>Cancel</button>
          </div>
        </div>
    </div>
  )
}

export default TopUpForm