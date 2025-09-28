import { Loader } from "lucide-react"

const BlueGradientButton = ({text, icon, width,handleClick, isLoading=false, reverse=false, otherStyles}) => {
  return (
    <button onClick={handleClick} disabled={isLoading} className={`w-[${width}%] flex justify-center p-3 px-20 gap-2 rounded-lg cursor-pointer bg-gradient-to-b from-[#0057FF] to-[#6197FF] ${reverse ? 'flex-row-reverse' : "flex-row"} ${otherStyles}`}>
        {isLoading ? <Loader className="size-4 animate-spin text-white" /> : (
          <>
            <span>{icon}</span>
            <p className='text-[#FDEAF0] font-semibold text-base whitespace-nowrap'>{text}</p>
          </>
        )}
    </button>
  )
}

export default BlueGradientButton