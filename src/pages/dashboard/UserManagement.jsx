import { useState } from 'react';
import Header from '../../components/Header'
import HeaderButtons from '../../components/user-management/HeaderButtons'
import UserTabs from '../../components/user-management/UserTabs';
import UserTable from '../../components/user-management/UserTable';
import PostTable from '../../components/user-management/PostTable';
import PostAuditTable from '../../components/user-management/PostAuditTable';
import TableHeader from '../../components/user-management/TableHeader';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("User list");
  const [userListFilter, setUserListFilter] = useState("All");
  const [userPostFilter, setUserPostFilter] = useState("All");
  const [auditLogsFilter, setAuditLogsFilter] = useState("All");
  const [userListPage, setUserListPage] = useState(1);
  const [userPostPage, setUserPostPage] = useState(1);
  const [auditLogsPage, setAuditLogsPage] = useState(1);
  const [userListTotalPage, setUserListTotalPage] = useState(20);
  const [userPostTotalPage, setUserPostTotalPage] = useState(20);
  const [auditLogsTotalPage, setAuditLogsTotalPage] = useState(20);

  const mockUsers = [
    { id: "USER10235111111111111111111111", name: "Lilian White", email: "lily@example.com", phone: "+23480000000000", joinDate: "02/07/2025", status: "Active", verification: "Verified" },
    { id: "USER10236", name: "Lilian Black", email: "lily@example.commmmmmm", phone: "+23480000000000", joinDate: "02/07/2025", status: "Restricted", verification: "Pending" },
  ];

  const mockPosts = [
    { requestId: "RQID10235", userId: "USER10235", postType: "Multi-media", report: "Inappropriate Post", joinDate: "02/07/2025", timeStamp: '02:03:56 PM', status: "Deleted" }
  ];

  const mockAudits = [
    { adminId: 'ADMIN001', requestId: "RQID10235", userId: "USER10235", report: "Inappropriate Post", action: "Resolved", note: 'Not against our policy', date: "02/07/2025" },
    { adminId: 'ADMIN002', requestId: "RQID10236", userId: "USER10236", report: "Inappropriate Post", action: "Deleted", note: 'Contain sexual contents', date: "02/07/2025" }
  ]
  return (
    <div className='h-full'>
      <div className='flex justify-between'>
      <Header
        text={'User Management'}
      />
      <HeaderButtons
        icon={icons.calendar}
        text={'Export User Data'}
        isDisabled={false}
      />
      </div>
      <div className="py-3">
        <UserTabs activeTab={activeTab} onChange={setActiveTab} />
        {
          activeTab === 'User list' &&
          <>
            <TableHeader title={'User list'} filter={userListFilter} onFilterChange={setUserListFilter} />

            <UserTable
              users={mockUsers}
              page={userListPage}
              totalPages={userListTotalPage}
              onPageChange={setUserListPage}
            />
          </>
        }
        {
          activeTab === 'User post' &&
          <>
          <TableHeader title={'User post'} filter={userPostFilter} onFilterChange={setUserPostFilter}/>
          <div className='mb-5'>
            <PostTable
              posts={mockPosts}
              page={userPostPage}
              totalPages={userPostTotalPage}
              onPageChange={setUserPostPage}
            />
          </div>

          <TableHeader title={'Audit Logs'} filter={auditLogsFilter} onFilterChange={setAuditLogsFilter}/>
          <PostAuditTable
            logs={mockAudits}
            page={auditLogsPage}
            totalPages={auditLogsTotalPage}
            onPageChange={setAuditLogsPage}
          />

          </>
        }
      </div>
    </div>
  )
}

export default UserManagement

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