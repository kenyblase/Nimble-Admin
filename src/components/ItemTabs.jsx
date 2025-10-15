import React from 'react'

const ItemTabs = ({ItemsTabs, itemsActiveTab, setItemsActiveTab}) => {
  return (
    <div>
        <div className='flex gap-14 h-14 pt-4 px-6 border-b border-[#00000033]'>
          {ItemsTabs.map((item, idx)=>(
            <div key={idx} onClick={()=>setItemsActiveTab(item.label)} className={`flex items-center cursor-pointer pb-4 gap-2 ${itemsActiveTab === item.label && 'border-b-2 border-[#FE7A36]'} w-fit`}>
              <div className={`h-6 w-fit px-1 ${item.bgColor}`}>
                <p className={`${item.countColor} text-center`}>{item.count}</p>
              </div>
              <p className='text-[#000000] text-sm font-normal'>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default ItemTabs