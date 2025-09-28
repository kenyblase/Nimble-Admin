import { useState } from 'react'
import Header from '../../components/Header'
import HeaderButtons from '../../components/user-management/HeaderButtons'
import RequestTabs from '../../components/requests/RequestTabs'
import TableHeader from '../../components/requests/TableHeader'
import { Filter } from 'lucide-react'
import RequestListTable from '../../components/requests/RequestListTable'
import RequestListAuditTable from '../../components/requests/RequestListAuditTable'
import RequestInboxTable from '../../components/requests/RequestInboxTable'

const Requests = () => {
  const [activeTab, setActiveTab] = useState('All Requests')
  const [requestListFilter, setRequestListFilter] = useState('Pending')
  const [requestListPage, setRequestListPage] = useState(1)
  const [requestInboxListPage, setRequestInboxListPage] = useState(1)
  const [requestAuditListPage, setRequestAuditListPage] = useState(1)

  const mockRequests = [
    { name: "Lilian White", gender: 'MALE', minAge: 26, maxAge: 35, creatorCity: 'Ikeja', creatorState: "Lagos", meetingType: "Casual", meetingCity: "Warri", meetingState:"Delta State",  status: "Pending", createdAt: "02/07/2025" },
    { name: "Lilian White", gender: 'MALE', minAge: 26, maxAge: 35, creatorCity: 'Ikeja', creatorState: "Lagos", meetingType: "Casual", meetingCity: "Warri", meetingState:"Delta State",  status: "Matched", createdAt: "02/07/2025" },
    { name: "Lilian White", gender: 'MALE', minAge: 26, maxAge: 35, creatorCity: 'Ikeja', creatorState: "Lagos", meetingType: "Casual", meetingCity: "Warri", meetingState:"Delta State",  status: "Closed", createdAt: "02/07/2025" },
    { name: "Lilian White", gender: 'MALE', minAge: 26, maxAge: 35, creatorCity: 'Ikeja', creatorState: "Lagos", meetingType: "Casual", meetingCity: "Warri", meetingState:"Delta State",  status: "Pending", createdAt: "02/07/2025" },
    { name: "Lilian White", gender: 'MALE', minAge: 26, maxAge: 35, creatorCity: 'Ikeja', creatorState: "Lagos", meetingType: "Casual", meetingCity: "Warri", meetingState:"Delta State",  status: "Matched", createdAt: "02/07/2025" },
    { name: "Lilian White", gender: 'MALE', minAge: 26, maxAge: 35, creatorCity: 'Ikeja', creatorState: "Lagos", meetingType: "Casual", meetingCity: "Warri", meetingState:"Delta State",  status: "Closed", createdAt: "02/07/2025" },
    { name: "Lilian White", gender: 'MALE', minAge: 26, maxAge: 35, creatorCity: 'Ikeja', creatorState: "Lagos", meetingType: "Casual", meetingCity: "Warri", meetingState:"Delta State",  status: "Pending", createdAt: "02/07/2025" },
  ]

  const mockRequestInboxLists = [
    { id: "RQID001", users: [{name: 'Lilian White'}, {name: 'Keny Blase'}], status: "Completed", lastMessage: {sender: 'Lilian White', message: "After i sent you money for logistics and all, you still decided not to show uppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp"} },
    { id: "RQID001", users: [{name: 'Lilian White'}, {name: 'Keny Blase'}], status: "Flagged", lastMessage: {sender: 'Lilian White', message: "After i sent you money for logistics and all, you still decided not to show uppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp"} },
    { id: "RQID001", users: [{name: 'Lilian White'}, {name: 'Keny Blase'}], status: "Active", lastMessage: {sender: 'Lilian White', message: "After i sent you money for logistics and all, you still decided not to show uppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp"} },
    { id: "RQID001", users: [{name: 'Lilian White'}, {name: 'Keny Blase'}], status: "Completed", lastMessage: {sender: 'Lilian White', message: "After i sent you money for logistics and all, you still decided not to show uppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp"} },
    { id: "RQID001", users: [{name: 'Lilian White'}, {name: 'Keny Blase'}], status: "Flagged", lastMessage: {sender: 'Lilian White', message: "After i sent you money for logistics and all, you still decided not to show uppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp"} },
    { id: "RQID001", users: [{name: 'Lilian White'}, {name: 'Keny Blase'}], status: "Active", lastMessage: {sender: 'Lilian White', message: "After i sent you money for logistics and all, you still decided not to show uppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp"} },
    { id: "RQID001", users: [{name: 'Lilian White'}, {name: 'Keny Blase'}], status: "Completed", lastMessage: {sender: 'Lilian White', message: "After i sent you money for logistics and all, you still decided not to show uppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp"} },
    { id: "RQID001", users: [{name: 'Lilian White'}, {name: 'Keny Blase'}], status: "Flagged", lastMessage: {sender: 'Lilian White', message: "After i sent you money for logistics and all, you still decided not to show uppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp"} },
    { id: "RQID001", users: [{name: 'Lilian White'}, {name: 'Keny Blase'}], status: "Active", lastMessage: {sender: 'Lilian White', message: "After i sent you money for logistics and all, you still decided not to show uppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp"} },
  ]

  const mockAuditLogs = [
    { adminId: "ADMIN001", requestId: "RQID001", creator: "Lilian White", meetingType: "Casual", action: "Flag Request", reason: "Inappropriate Content",  date: "02/07/2025" },   
    { adminId: "ADMIN001", requestId: "RQID001", creator: "Lilian White", meetingType: "Casual", action: "Flag Request", reason: "Inappropriate Content",  date: "02/07/2025" },   
    { adminId: "ADMIN001", requestId: "RQID001", creator: "Lilian White", meetingType: "Casual", action: "Flag Request", reason: "Inappropriate Content",  date: "02/07/2025" },   
    { adminId: "ADMIN001", requestId: "RQID001", creator: "Lilian White", meetingType: "Casual", action: "Flag Request", reason: "Inappropriate Content",  date: "02/07/2025" },   
    { adminId: "ADMIN001", requestId: "RQID001", creator: "Lilian White", meetingType: "Casual", action: "Flag Request", reason: "Inappropriate Content",  date: "02/07/2025" },   
    { adminId: "ADMIN001", requestId: "RQID001", creator: "Lilian White", meetingType: "Casual", action: "Flag Request", reason: "Inappropriate Content",  date: "02/07/2025" },   
    { adminId: "ADMIN001", requestId: "RQID001", creator: "Lilian White", meetingType: "Casual", action: "Flag Request", reason: "Inappropriate Content",  date: "02/07/2025" },   
  ]
  return (
    <div>
      <div className='flex justify-between'>
        <Header
          text={'Request Management'}
        />
        <HeaderButtons
          icon={icons.calendar}
          text={'Export User Data'}
          isDisabled={false}
        />
      </div>
      <div className='py-3'>
        <RequestTabs activeTab={activeTab} onChange={setActiveTab} />

        {
          activeTab === 'All Requests' &&
          <>
            <div className='flex justify-between items-center'>
              <TableHeader title={'Request lists'} filter={requestListFilter} onFilterChange={setRequestListFilter} />
              <div className='flex items-center justify-center border border-[#EBEBEB] rounded-lg size-10'>
                <Filter color='#666666' className='size-5'/>
              </div>
            </div>

            <RequestListTable requests={mockRequests} page={requestListPage} totalPages={20} onPageChange={setRequestListPage} />

            <div className='mt-2'>
              <TableHeader title={'Audit Logs'} isFiltering={false}/>
              <RequestListAuditTable logs={mockAuditLogs} page={requestAuditListPage} onPageChange={setRequestAuditListPage} totalPages={20}/>
            </div>
          </>
        }

        {
          activeTab === 'Request Inbox' &&
          <>
            <div className='flex justify-between items-center'>
              <TableHeader title={'Request Inbox'} isFiltering={false} />
              <div className='flex items-center justify-center border border-[#EBEBEB] rounded-lg size-10'>
                <Filter color='#666666' className='size-5'/>
              </div>
            </div>

            <RequestInboxTable requests={mockRequestInboxLists} page={requestInboxListPage} onPageChange={setRequestInboxListPage} totalPages={20}/>

          </>
        }

        {
          activeTab === 'Disputes' &&
          <>
            <TableHeader title={'Disputes'} isFiltering={false} />

          </>
        }

        {
          activeTab === 'Fee Settings' &&
          <>
            <TableHeader title={'Request fee settings'} isFiltering={false} />

          </>
        }
      </div>
    </div>
  )
}

export default Requests

const icons = {
  calendar: <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.906738" y="0.5" width="48" height="48" rx="8" fill="#F5F5F5"/>
            <path d="M20.9067 14.5V17.5" stroke="#2E2E2E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M28.9067 14.5V17.5" stroke="#2E2E2E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.4067 21.5898H33.4067" stroke="#2E2E2E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M34.9067 31.5C34.9067 32.25 34.6967 32.96 34.3267 33.56C33.6367 34.72 32.3667 35.5 30.9067 35.5C29.8967 35.5 28.9767 35.13 28.2767 34.5C27.9667 34.24 27.6967 33.92 27.4867 33.56C27.1167 32.96 26.9067 32.25 26.9067 31.5C26.9067 29.29 28.6967 27.5 30.9067 27.5C32.1067 27.5 33.1767 28.03 33.9067 28.86C34.5267 29.57 34.9067 30.49 34.9067 31.5Z" stroke="#2E2E2E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M29.3467 31.5L30.3367 32.49L32.4667 30.52" stroke="#2E2E2E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M33.9067 21V28.86C33.1767 28.03 32.1067 27.5 30.9067 27.5C28.6967 27.5 26.9067 29.29 26.9067 31.5C26.9067 32.25 27.1167 32.96 27.4867 33.56C27.6967 33.92 27.9667 34.24 28.2767 34.5H20.9067C17.4067 34.5 15.9067 32.5 15.9067 29.5V21C15.9067 18 17.4067 16 20.9067 16H28.9067C32.4067 16 33.9067 18 33.9067 21Z" stroke="#2E2E2E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M24.9022 26.2002H24.9112" stroke="#2E2E2E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21.2011 26.2002H21.21" stroke="#2E2E2E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21.2011 29.2002H21.21" stroke="#2E2E2E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
}