import React from 'react'

const Tabs = ({tabs, activeTab, setActiveTab}) => {
  return (
    <div className='flex gap-8 h-11 border-b border-[#0000001A] pb-2'>
        {tabs.map((tab, idx)=>(
            <div onClick={()=>setActiveTab(tab)} key={idx} className={`${activeTab === tab && 'bg-[#FE7A361A]'} flex items-center cursor-pointer h-9 px-6 rounded-[200px]`}>
            <p className={`${activeTab === tab ? 'text-[#FE7A36]' : 'text-[#202224]'}`}>{tab}</p>
            </div>
        ))}
    </div>
  )
}

export default Tabs