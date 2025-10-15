import React, { useState } from 'react'
import Tabs from '../../components/Tabs'
import AnalyticsCard from '../../components/AnalyticsCard'
import ItemTabs from '../../components/ItemTabs'

const Listings = () => {
  const [activeTab, setActiveTab] = useState('Listings')
  const [itemsActiveTab, setItemsActiveTab] = useState('Active')

  const tabs = ['Listings', 'Ads', 'Request']
  const itemsTabs = [
    {label: 'Active', count: 12, bgColor: 'bg-[#DEF9D4]', countColor: 'text-[#348352]'}, 
    {label: 'Review', count: 12, bgColor: 'bg-[#C6C7F880]', countColor: 'text-[#3652AD]'}, 
    {label: 'Closed', count: 12, bgColor: 'bg-[#F9EDD4]', countColor: 'text-[#FF8911]'}, 
    {label: 'Rejected', count: 12, bgColor: 'bg-[#F9D8D4]', countColor: 'text-[#E81008]'}, 
    {label: 'Expired', count: 12, bgColor: 'bg-[#F9D8D4]', countColor: 'text-[#E81008]'},
  ]

  const analytics = [
    {
      title: "Active Listing",
      value: 689,
      trendPercent: 8.5,
      trendDirection: 'up',
      trendLabel: 'from yesterday',
    },
    {
      title: "Closed Listing",
      value: 10289,
      trendPercent: 1.3,
      trendDirection: 'up',
      trendLabel: 'from yesterday',
    },
    {
      title: "Expired Listing",
      value: 689,
      trendPercent: -4.3,
      trendDirection: 'down',
      trendLabel: 'from yesterday',
    },
  ]

  return (
    <div className='mt-7 flex flex-col gap-7'>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>

      {activeTab === 'Listings' &&
        <div className='flex gap-8'>
          {
              analytics.map((card, index)=>(
                    <AnalyticsCard key={index} {...card} />
              ))
          }
        </div>
      }

      <ItemTabs ItemsTabs={itemsTabs} itemsActiveTab={itemsActiveTab} setItemsActiveTab={setItemsActiveTab}/>
    </div>
  )
}

export default Listings