import { useEffect, useState } from 'react'
import Tabs from '../../components/Tabs'
import ChatSection from '../../components/ChatSection'
import AppealsTable from '../../components/AppealsTable'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useFetchAppeals } from '../../utils/useApis/useAppealApis/useFetchAppeals'
import SupportTable from '../../components/SupportTable'

const Appeals = () => {
  const [activeTab, setActiveTab] = useState('Appeals')
  const [supportPage, setSupportPage] = useState(1)
  const [appealPage, setAppealPage] = useState(1)
  const [supportItemsActiveTab, setSupportItemsActiveTab] = useState('All')
  const [appealItemsActiveTab, setAppealItemsActiveTab] = useState('All')
  const [supportSearch, setSupportSearch] = useState('')
  const [supportDebouncedSearch, setSupportDebouncedSearch] = useState("");
  const [appealSearch, setAppealSearch] = useState('')
  const [appealDebouncedSearch, setAppealDebouncedSearch] = useState("");

  const {data:requests, isLoading:isRequestLoading} = useFetchAppeals('support-request', supportPage, 10, supportDebouncedSearch, supportItemsActiveTab.toLowerCase())
  const {data:appeals, isLoading:isAppealLoading} = useFetchAppeals('appeal', appealPage, 10, appealDebouncedSearch, appealItemsActiveTab.toLowerCase())

  useEffect(() => {
      const timer = setTimeout(() => setAppealDebouncedSearch(appealSearch), 500);
      return () => clearTimeout(timer);
    }, [appealSearch]);

  useEffect(() => {
      const timer = setTimeout(() => setSupportDebouncedSearch(supportSearch), 500);
      return () => clearTimeout(timer);
    }, [supportSearch]);

  const tabs = ['Appeals', 'Support requests', 'Chats']

  const itemsTabs = [
    {label: 'All', count: 12, bgColor: 'bg-[#DEF9D4]', countColor: 'text-[#348352]'}, 
    {label: 'New', count: 12, bgColor: 'bg-[#C6C7F880]', countColor: 'text-[#3652AD]'}, 
    {label: 'Open', count: 12, bgColor: 'bg-[#F9EDD4]', countColor: 'text-[#FF8911]'}, 
    {label: 'Resolved', count: 12, bgColor: 'bg-[#F9D8D4]', countColor: 'text-[#E81008]'}, 
    {label: 'Closed', count: 12, bgColor: 'bg-[#F9D8D4]', countColor: 'text-[#E81008]'}, 
  ]

  return (
    <div className='mt-7 flex flex-col gap-7 h-screen'>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>

      {activeTab === 'Appeals' &&
        <div>
        {isAppealLoading && !appealDebouncedSearch ? 
          <div className='w-full h-80 flex items-center justify-center'>
            <div className='w-20 h-20'>
              <LoadingSpinner size={'size-full'}/>
            </div>
          </div>
        : 
        < div>
          <AppealsTable
            appeals={appeals?.appeals}
            page={appealPage}
            setPage={setAppealPage}
            totalPages={appeals?.totalPages || 1}
            itemsTabs={itemsTabs}
            itemsActiveTab={appealItemsActiveTab}
            setItemsActiveTab={setAppealItemsActiveTab}
            search={appealSearch}
            setSearch={setAppealSearch}
          />
        </div>
        }
      </div>
        
      }

      {activeTab === 'Support requests' &&
            <div>
        {isRequestLoading && !supportDebouncedSearch ? 
          <div className='w-full h-80 flex items-center justify-center'>
            <div className='w-20 h-20'>
              <LoadingSpinner size={'size-full'}/>
            </div>
          </div>
        : 
        < div>
          <SupportTable
            appeals={requests?.appeals}
            page={supportPage}
            setPage={setSupportPage}
            totalPages={requests?.totalPages || 1}
            itemsTabs={itemsTabs}
            itemsActiveTab={supportItemsActiveTab}
            setItemsActiveTab={setSupportItemsActiveTab}
            search={supportSearch}
            setSearch={setSupportSearch}
          />
        </div>
        }
      </div>
        
      }

      {activeTab === 'Chats' &&
        <ChatSection/>
      }
    </div>
  )
}

export default Appeals