import { Loader } from "lucide-react"

const GrayButton = ({text, icon, width,handleClick, isLoading=false, reverse=false}) => {
  return (
    <button onClick={handleClick} className={`w-[${width}%] flex justify-center p-3 px-20 gap-2 rounded-lg cursor-pointer bg-[#DEDEDE] ${reverse ? 'flex-row-reverse' : "flex-row"}`}>
        {isLoading ? <Loader className="size-4 animate-spin text-white" /> : (
          <>
            <span>{icon}</span>
            <p className='text-[#A3A3A3] font-semibold text-base'>{text}</p>
          </>
        )}
    </button>
  )
}

export default GrayButton