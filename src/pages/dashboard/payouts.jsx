import { useState } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useEffect } from 'react'
import AnalyticsCard from '../../components/AnalyticsCard'
import ItemTabs from '../../components/ItemTabs'
import { useFetchPayoutAnalytics } from '../../utils/useApis/usePayoutApis/useFetchPayoutAnalytics'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PayoutsTable from '../../components/PayoutTable'
import { useFetchPayouts } from '../../utils/useApis/usePayoutApis/useFetchPayouts'
import CreatePayoutModal from '../../components/CreatePayoutModal'

const Payouts = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [itemsActiveTab, setItemsActiveTab] = useState('All')
  const [isCreatePayoutModalOpen, setIsCreatePayoutModalOpen] = useState(false)
  const navigate = useNavigate()

  const {data, isLoading} = useFetchPayouts(page, 10, debouncedSearch, itemsActiveTab === 'All' ? '' : itemsActiveTab.toUpperCase())
  const {data:analytics, isLoading:loading} = useFetchPayoutAnalytics()
  // Debounce search input (500ms)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const payoutAnalytics = [
    {
      title: "Total Payout",
      value: `₦${analytics?.totalPayout?.value?.toLocaleString()}`,
    },
    {
      title: "Pending Payout",
      value: `₦${analytics?.pendingPayout?.value?.toLocaleString()}`,
    }
  ];

  const itemsTabs = [
    {label: 'All', count: 12, bgColor: 'bg-[#DEF9D4]', countColor: 'text-[#348352]'}, 
    {label: 'Pending', count: 12, bgColor: 'bg-[#C6C7F880]', countColor: 'text-[#3652AD]'}, 
    {label: 'Approved', count: 12, bgColor: 'bg-[#F9EDD4]', countColor: 'text-[#FF8911]'}, 
    {label: 'Rejected', count: 12, bgColor: 'bg-[#F9D8D4]', countColor: 'text-[#E81008]'}, 
    {label: 'Failed', count: 12, bgColor: 'bg-[#F9EDD4]', countColor: 'text-[#FF8911]'}, 
    {label: 'Success', count: 12, bgColor: 'bg-[#F9D8D4]', countColor: 'text-[#E81008]'}, 
  ]

  return (
    <div className='mt-7 mb-5 flex flex-col gap-7'>
       <div className='h-11 flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-[#202224]'>Payouts</h1>
        <button onClick={()=>setIsCreatePayoutModalOpen(true)} className='flex gap-1 items-center cursor-pointer h-full rounded-full bg-[#3652AD] px-5'>
          <Plus size={18} color='#F6F6F6'/>
          <h1 className='text-lg font-semibold text-[#FEFEFF]'>Create payout</h1>
        </button>
      </div>

      <div className='flex gap-8'>
          {loading? <div className='w-full flex justify-center items-center'>
                      <LoadingSpinner size='size-20'/> 
                    </div>
            :
            payoutAnalytics.map((card, index)=>(
                  <AnalyticsCard key={index} {...card} />
            ))
          }
      </div>

      <div>
        {isLoading && !debouncedSearch ? 
          <div className='w-full h-80 flex items-center justify-center'>
            <div className='w-20 h-20'>
              <LoadingSpinner size={'size-full'}/>
            </div>
          </div>
        : 
        < div className='flex flex-col gap-4 p-6 bg-[#FFFFFF] border border-[#F2E9FF] rounded-2xl relative'>
          <ItemTabs ItemsTabs={itemsTabs} itemsActiveTab={itemsActiveTab} setItemsActiveTab={setItemsActiveTab}/>
          <PayoutsTable 
          payouts={data?.withdrawals} 
          totalPages={data?.totalPages} 
          page={page} 
          setPage={setPage} 
          search={search} 
          setSearch={setSearch}
          />
        </div>
        }
      </div>

      <CreatePayoutModal isOpen={isCreatePayoutModalOpen} onClose={()=>setIsCreatePayoutModalOpen(false)}/>
    </div>
  )
}

export default Payouts