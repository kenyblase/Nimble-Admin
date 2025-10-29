import React, { useEffect } from 'react'
import { useGetDashboardAnalytics } from '../../utils/useApis/useDashboardApis/useGetDashboardAnalytics'
import LoadingSpinner from '../../components/LoadingSpinner'
import AnalyticsCard from '../../components/AnalyticsCard'
import RecentTransactionsTable from '../../components/RecentTransactionsTable'
import { useGetLatestTransactions } from '../../utils/useApis/useDashboardApis/useGetLatestTransactions'
import { useState } from 'react'

const Home = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const { data:transactions, isLoading:isFetching} = useGetLatestTransactions(page, 10, 'all', debouncedSearch);
    const { data, isLoading} = useGetDashboardAnalytics()

    useEffect(() => {
      const timer = setTimeout(() => setDebouncedSearch(search), 500);
      return () => clearTimeout(timer);
    }, [search]);

    if(isLoading) return <LoadingSpinner/>

    const analytics = [
    {
      title: "Total Sales",
      value: `₦${data?.totalSales?.value.toLocaleString()}`,
      trendPercent: data?.totalSales?.change,
      trendDirection: data?.totalSales?.trend,
      trendLabel: data?.totalSales?.duration,
    },
    {
      title: "Active Listing",
      value: data?.activeListings?.value,
      trendPercent: data?.activeListings?.change,
      trendDirection: data?.activeListings?.trend,
      trendLabel: data?.activeListings?.duration,
    },
    {
      title: "Active User",
      value: data?.activeUsers?.value,
      trendPercent: data?.activeUsers?.change,
      trendDirection: data?.activeUsers?.trend,
      trendLabel: data?.activeUsers?.duration,
    },
    {
      title: "Total Pending",
      value: data?.totalPending?.value,
      trendPercent: data?.totalPending?.change,
      trendDirection: data?.totalPending?.trend,
      trendLabel: data?.totalPending?.duration,
    },
  ];
  return (
    <div className='mt-7 flex flex-col gap-7'>
        <h1 className='font-bold text-3xl text-[#202224]'>Hi Admin</h1>

        <div className='flex gap-8'>
            {
                analytics.map((card, index)=>(
                     <AnalyticsCard key={index} {...card} />
                ))
            }
        </div>

        <div>
        {isFetching && !debouncedSearch ? 
          <div className='w-full h-80 flex items-center justify-center'>
            <div className='w-20 h-20'>
              <LoadingSpinner size={'size-full'}/>
            </div>
          </div>
        : 
        < div>
          <RecentTransactionsTable
           transactions={transactions?.data} 
           page={page} setPage={setPage} 
           totalPages={transactions?.pagination?.totalPages}
           search={search}
           setSearch={setSearch}
          />
        </div>
        }
      </div>
    </div>
  )
}

export default Home