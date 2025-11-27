import { useEffect, useState } from 'react'
import Tabs from '../../components/Tabs'
import AppealsTable from '../../components/AppealsTable'
import LoadingSpinner from '../../components/LoadingSpinner'
import SupportTable from '../../components/SupportTable'
import { useFetchReports } from '../../utils/useApis/useReportApis/useFetchreports'
import ReportsTable from '../../components/ReportsTable'
import FlagsTable from '../../components/FlagsTable'

const Reports = () => {
  const [activeTab, setActiveTab] = useState('Reports')
  const [reportPage, setReportPage] = useState(1)
  const [flagPage, setFlagPage] = useState(1)
  const [reportItemsActiveTab, setReportItemsActiveTab] = useState('All')
  const [flagItemsActiveTab, setFlagItemsActiveTab] = useState('All')
  const [reportSearch, setReportSearch] = useState('')
  const [reportDebouncedSearch, setReportDebouncedSearch] = useState("");
  const [flagSearch, setFlagSearch] = useState('')
  const [flagDebouncedSearch, setFlagDebouncedSearch] = useState("");

  const {data:reports, isLoading:isReportLoading} = useFetchReports('report', reportPage, 10, reportDebouncedSearch, reportItemsActiveTab.toLowerCase())
  const {data:flags, isLoading:isFlagLoading} = useFetchReports('flag', flagPage, 10, flagDebouncedSearch, flagItemsActiveTab.toLowerCase())

  useEffect(() => {
      const timer = setTimeout(() => setFlagDebouncedSearch(flagSearch), 500);
      return () => clearTimeout(timer);
    }, [flagSearch]);

  useEffect(() => {
      const timer = setTimeout(() => setReportDebouncedSearch(reportSearch), 500);
      return () => clearTimeout(timer);
    }, [reportSearch]);

  const tabs = ['Reports', 'Flags']

  const itemsTabs = [
    {label: 'All'}, 
    {label: 'New'}, 
    {label: 'Investigating'}, 
    {label: 'Resolved'}, 
    {label: 'Dismissed'}, 
  ]

  return (
    <div className='mt-7 flex flex-col gap-7 h-screen'>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>

      {activeTab === 'Flags' &&
        <div>
        {isFlagLoading && !flagDebouncedSearch ? 
          <div className='w-full h-80 flex items-center justify-center'>
            <div className='w-20 h-20'>
              <LoadingSpinner size={'size-full'}/>
            </div>
          </div>
        : 
        < div>
          <FlagsTable
            reports={flags?.reports}
            page={flagPage}
            setPage={setFlagPage}
            totalPages={flags?.totalPages || 1}
            itemsTabs={itemsTabs}
            itemsActiveTab={flagItemsActiveTab}
            setItemsActiveTab={setFlagItemsActiveTab}
            search={flagSearch}
            setSearch={setFlagSearch}
          />
        </div>
        }
      </div>
        
      }

      {activeTab === 'Reports' &&
        <div>
            {isReportLoading && !reportDebouncedSearch ? 
            <div className='w-full h-80 flex items-center justify-center'>
                <div className='w-20 h-20'>
                <LoadingSpinner size={'size-full'}/>
                </div>
            </div>
            : 
            < div>
            <ReportsTable
                reports={reports?.reports}
                page={reportPage}
                setPage={setReportPage}
                totalPages={reports?.totalPages || 1}
                itemsTabs={itemsTabs}
                itemsActiveTab={reportItemsActiveTab}
                setItemsActiveTab={setReportItemsActiveTab}
                search={reportSearch}
                setSearch={setReportSearch}
            />
            </div>
            }
        </div>    
      }
    </div>
  )
}

export default Reports