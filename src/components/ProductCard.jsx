import { Heart, MoreVertical } from 'lucide-react'
import StarRating from '../components/StarRating'
import { useEffect, useRef, useState } from 'react';

const ProductCard = ({ product, actions }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  return (
    <div className='relative flex flex-col w-[240px] border-[0.5px] border-[#0000001A] bg-[#FFFFFF] p-3 rounded-sm gap-2'>
        <img src={product?.images[0]} alt="product image" className='w-[216px] h-[120px] object-cover'/>

        <div className='flex flex-col gap-1.5'>
            <div className='flex justify-between items-center'>
                <StarRating rating={product?.averageRating} color='#000000' size={8}/>

                <div className='flex items-center gap-1'>
                    <Heart size={10} color='#000000'/>
                    <p className='text-[10px] text-[#000000]'>{product?.likes}</p>
                </div>
            </div>

            <div className='flex flex-col gap-0.5'>
                <p className='text-xs text-[#000000CC]'>{product?.name}</p>
                <p className='text-xs text-[#000000CC] font-medium'>₦{(product?.price).toLocaleString()}</p>
            </div>

            <div className='flex justify-between items-center'>
                <p className='text-[#00000080] text-xs'>{product?.location?.city}, {product?.location?.state}</p>
                <div className='w-fit h-5'>
                    {handleStatus(product?.status)}
                </div>
            </div>
        </div>

        <div className='flex justify-between items-center pt-2 border-t border-[#0000001A]'>
            <div className='flex flex-col gap-1'>
                <div className='flex gap-2'>
                    <p className='text-[#00000099] text-xs'>Seller:</p>
                    <p className='text-[#000000CC] text-xs'>{product?.vendor?.firstName} {product?.vendor?.lastName}</p>
                </div>
                <div className='flex gap-2'>
                    <p className='text-[#00000099] text-xs'>Listed On:</p>
                    <p className='text-[#000000CC] text-xs'>{formatDate(product?.listedOn) || 'Not listed yet'}</p>
                </div>
            </div>

            <MoreVertical onClick={() => setMenuOpen((prev) => !prev)} color='#414040' size={14} className='cursor-pointer'/>
        </div>

        {menuOpen && (
        <div
          ref={menuRef}
           className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl shadow-lg p-2 space-y-2 animate-fadeIn z-20"
        >
          {actions?.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                setMenuOpen(false);
                action.onClick(product);
              }}
              className={`block w-full text-left text-sm rounded-md px-2 py-1 ${
                action.variant === "danger"
                  ? "text-red-500 hover:bg-red-50"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductCard

const handleStatus = (status)=>{
  if(status === 'active') return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 px-3 rounded-lg bg-[#DEF9D4] text-[#348352]`}>
      {status}
    </span>
  )
  else if(status === 'pending' || status === 'closed')  return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 px-3 rounded-lg bg-[#F9EDD4] text-[#FF8911]`}>
      {status}
    </span>
  )
  else  return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 px-3 rounded-lg bg-[#F9D8D4] text-[#FF640F]`}>
      {status}
    </span>
  )
}

const formatDate = (date) => {
  if (!date) return '';

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};