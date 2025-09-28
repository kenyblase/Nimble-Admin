import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import CoinAdminTabs from '../../components/coin-deposit-admin/CoinAdminTabs'
import HeaderButtons from '../../components/coin-deposit-admin/HeaderButtons';
import TitleAndButton from '../../components/coin-deposit-admin/TitleAndButton';
import AdminTable from '../../components/coin-deposit-admin/AdminTable';
import { useFetchAllAdmins } from '../../utils/useApis/useAdminApis/useFetchAllAdmin';
import LoadingSpinner from '../../components/LoadingSpinner'
import SearchInputAndResults from '../../components/coin-deposit-admin/SearchInputAndResults';
import TopUpForm from '../../components/coin-deposit-admin/TopUpForm';
import AuditLogs from '../../components/coin-deposit-admin/AuditLogs';
import TableHeader from '../../components/user-management/TableHeader';
import DepositAuditLogs from '../../components/coin-deposit-admin/DepositAuditLogs';

const CoinAdmin = () => {
  const [activeTab, setActiveTab] = useState("Coin Deposits");
  const [page, setPage] = useState(1)
  const [logsPage, setLogsPage] = useState(1)
  const [auditLogsFilter, setAuditLogsFilter] = useState("All");
  const {data = {admins: [], pagination: {pages: 1}}, isLoading} = useFetchAllAdmins(page)

  const mockAdminAudits = [
    { adminId: 'ADMIN001', role: "Moderator", userId: "USER10235", action: "Resolved a dispute", date: "02/07/2025" },
    { adminId: 'ADMIN001', role: "Moderator", userId: "USER10235", action: "Resolved a dispute", date: "02/07/2025" },
    { adminId: 'ADMIN001', role: "Moderator", userId: "USER10235", action: "Resolved a dispute", date: "02/07/2025" },
    { adminId: 'ADMIN001', role: "Moderator", userId: "USER10235", action: "Resolved a dispute", date: "02/07/2025" },
  ]

  const mockDepositAudits = [
    { adminId: 'ADMIN001', role: "Moderator", userId: "USER10235", amount: 100, reason: "Referal Bonus", date: "02/07/2025" },
    { adminId: 'ADMIN001', role: "Moderator", userId: "USER10235", amount: 100, reason: "Referal Bonus", date: "02/07/2025" },
    { adminId: 'ADMIN001', role: "Moderator", userId: "USER10235", amount: 100, reason: "Referal Bonus", date: "02/07/2025" },
    { adminId: 'ADMIN001', role: "Moderator", userId: "USER10235", amount: 100, reason: "Referal Bonus", date: "02/07/2025" },
    { adminId: 'ADMIN001', role: "Moderator", userId: "USER10235", amount: 100, reason: "Referal Bonus", date: "02/07/2025" },
    { adminId: 'ADMIN001', role: "Moderator", userId: "USER10235", amount: 100, reason: "Referal Bonus", date: "02/07/2025" },
  ]

  return (
    <div>   
      <div className='flex justify-between mb-5'>
        <Header
          text={'Coin deposits & Admin Levels'}
        />
        <HeaderButtons
          icon={icons.calendar}
          text={'Export User Data'}
          isDisabled={false}
        />
      </div>
      <div className='mb-5'>
        <CoinAdminTabs activeTab={activeTab} onChange={setActiveTab}/>
      </div>


      {activeTab === "Coin Deposits" && 
        <div>
          <h1 className='font-bold text-3xl text-[#2E2E2E]'>Coin Deposits</h1>
          <SearchInputAndResults/>
          <TopUpForm/>
          <div className='my-5'>
            <TableHeader title={'Audit Logs'} filter={auditLogsFilter} onFilterChange={setAuditLogsFilter}/>
            <DepositAuditLogs
              logs={mockDepositAudits}
              page={logsPage}
              totalPages={20}
              onPageChange={setLogsPage}
            />
          </div>
        </div>
      }

      {activeTab === "Admin Levels" && 
        <>
          <TitleAndButton/>
          {isLoading ? <LoadingSpinner height={'h-full'}/> :
            <>
              <AdminTable
                admins={data.admins}
                page={page}
                totalPages={data.pagination.pages}
                onPageChange={setPage}
              />
              <div className='my-5'>
                <TableHeader title={'Audit Logs'} filter={auditLogsFilter} onFilterChange={setAuditLogsFilter}/>
                <AuditLogs
                  logs={mockAdminAudits}
                  page={logsPage}
                  totalPages={20}
                  onPageChange={setLogsPage}
                />
              </div>
            </>
            
          }
        </>
      }
    </div>
  )
}

export default CoinAdmin

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