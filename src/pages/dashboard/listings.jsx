import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Tabs from '../../components/Tabs'
import AnalyticsCard from '../../components/AnalyticsCard'
import ItemTabs from '../../components/ItemTabs'
import ProductCard from '../../components/ProductCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import Paginator from '../../components/Paginator'
import { useFetchListings } from '../../utils/useApis/useListingAPis/useFetchListings'
import { useFetchListingAnalytics } from '../../utils/useApis/useListingAPis/useFetchListingAnalytics'
import { useQueryClient } from '@tanstack/react-query'

const Listings = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [activeTab, setActiveTab] = useState('Listings')
  const [itemsActiveTab, setItemsActiveTab] = useState('Active')
  const [page, setPage] = useState(1)

  const {data:productData, isLoading:isfetchingProducts} = useFetchListings(page, 12, formatActiveTab(activeTab), formatStatus(itemsActiveTab))
  const {data:analytics, isLoading:loading} = useFetchListingAnalytics(formatActiveTab(activeTab))

  const tabs = ['Listings', 'Requests']
  const itemsTabs = [
    {label: 'Active', count: 12, bgColor: 'bg-[#DEF9D4]', countColor: 'text-[#348352]'}, 
    {label: 'Review', count: 12, bgColor: 'bg-[#C6C7F880]', countColor: 'text-[#3652AD]'}, 
    {label: 'Closed', count: 12, bgColor: 'bg-[#F9EDD4]', countColor: 'text-[#FF8911]'}, 
    {label: 'Rejected', count: 12, bgColor: 'bg-[#F9D8D4]', countColor: 'text-[#E81008]'}, 
    {label: 'Expired', count: 12, bgColor: 'bg-[#F9D8D4]', countColor: 'text-[#E81008]'},
  ]

  const productAnalytics = [
    {
      title: `Active ${activeTab}`,
      value: analytics?.activeListings?.value,
      trendPercent: analytics?.activeListings?.change,
      trendDirection: analytics?.activeListings?.trend,
      trendLabel: analytics?.activeListings?.duration,
    },
    {
      title: `Closed ${activeTab}`,
      value: analytics?.closedListings?.value,
      trendPercent: analytics?.closedListings?.change,
      trendDirection: analytics?.closedListings?.trend,
      trendLabel: analytics?.closedListings?.duration,
    },
    {
      title: `Expired ${activeTab}`,
      value: analytics?.expiredListings?.value,
      trendPercent: analytics?.expiredListings?.change,
      trendDirection: analytics?.expiredListings?.trend,
      trendLabel: analytics?.expiredListings?.duration,
    },
  ]

    const actions = [
    { label: "View", onClick: (p) => {
      queryClient.setQueryData(["listing", p._id], p);
      navigate(`/listings/${p._id}`)} 
    },
    // { label: "Remove", onClick: (p) => console.log("Remove", p), variant: "danger" },
  ];

  return (
    <div className='mt-7 flex flex-col gap-7'>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>

      {activeTab === 'Listings' &&
      <>
        <div className='flex gap-8'>
            {loading? <div className='w-full flex justify-center items-center'>
                        <LoadingSpinner size='size-20'/> 
                      </div>
              :
              productAnalytics.map((card, index)=>(
                    <AnalyticsCard key={index} {...card} />
              ))
            }
        </div>
        <ItemTabs ItemsTabs={itemsTabs} itemsActiveTab={itemsActiveTab} setItemsActiveTab={setItemsActiveTab}/>

        {isfetchingProducts ? 
          <div className='w-full h-80 flex items-center justify-center'>
            <div className='w-20 h-20'>
              <LoadingSpinner size={'size-full'}/>
            </div>
          </div> : 
          <>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {productData?.products?.map((p) => (
                <ProductCard key={p._id} product={p} actions={actions} />
              ))}
            </div>

            <Paginator page={page} setPage={setPage} totalPages={productData?.pagination?.totalPages || 1}/>
          </>
        }
      </>
      }
      {activeTab === 'Requests' &&
      <>
        <div className='flex gap-8'>
            {loading? <div className='w-full flex justify-center items-center'>
                        <LoadingSpinner size='size-20'/> 
                      </div>
              :
              productAnalytics.map((card, index)=>(
                    <AnalyticsCard key={index} {...card} />
              ))
            }
        </div>
        <ItemTabs ItemsTabs={itemsTabs} itemsActiveTab={itemsActiveTab} setItemsActiveTab={setItemsActiveTab}/>

        {isfetchingProducts ? 
          <div className='w-full h-80 flex items-center justify-center'>
            <div className='w-20 h-20'>
              <LoadingSpinner size={'size-full'}/>
            </div>
          </div> : 
          <>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {productData?.products?.map((p) => (
                <ProductCard key={p._id} product={p} actions={actions} />
              ))}
            </div>

            <Paginator page={page} setPage={setPage} totalPages={productData?.pagination?.totalPages || 1}/>
          </>
        }
      </>
      }

    </div>
  )
}

export default Listings

 const formatStatus = (status) => {
  if (!status) return "active";

  const normalized = status.trim().toLowerCase();

  if (normalized === "review") return "pending";

  return normalized;
};

 const formatActiveTab = (tab) => {
  if (!tab) return "listing";

  const normalized = tab.trim().toLowerCase();

  if (normalized === "listings") return "listing";
  if (normalized === "requests") return "request";

  return normalized;
};