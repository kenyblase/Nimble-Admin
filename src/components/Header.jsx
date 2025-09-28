import CsvPdfDropdown from "./DropdownMenu"
import BlueGradientButton from './BlueGradientButton'
import {FileDown} from 'lucide-react'


const Header = ({text, icon, }) => {
  return (
    <div className='h-12 flex justify-between items-center'>
        <p className='text-[#B0B0B0] font-semibold text-base'>Dashboard / <span className='text-[#3B3B3B] text-xl font-semibold'>{text}</span></p>
    </div>
  )
}

export default Header