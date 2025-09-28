import BlueGradientButton from '../BlueGradientButton'
import CsvPdfDropdown from '../DropdownMenu'
import GrayButton from '../GrayButton'

const HeaderButtons = ({icon, text, isDisabled}) => {
  return (
    <div>
        <div className='flex items-center gap-4'>
            {icon && icon}

            {isDisabled ? 
            <GrayButton
              icon={
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.90674 11.5V17.5L11.9067 15.5" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.90674 17.5L7.90674 15.5" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22.9067 10.5V15.5C22.9067 20.5 20.9067 22.5 15.9067 22.5H9.90674C4.90674 22.5 2.90674 20.5 2.90674 15.5V9.5C2.90674 4.5 4.90674 2.5 9.90674 2.5H14.9067" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22.9067 10.5H18.9067C15.9067 10.5 14.9067 9.5 14.9067 6.5V2.5L22.9067 10.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              }
              text={text}
            /> : 
            <BlueGradientButton
              icon={<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.90674 11.5V17.5L11.9067 15.5" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9.90674 17.5L7.90674 15.5" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22.9067 10.5V15.5C22.9067 20.5 20.9067 22.5 15.9067 22.5H9.90674C4.90674 22.5 2.90674 20.5 2.90674 15.5V9.5C2.90674 4.5 4.90674 2.5 9.90674 2.5H14.9067" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22.9067 10.5H18.9067C15.9067 10.5 14.9067 9.5 14.9067 6.5V2.5L22.9067 10.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  }
              text={text}
            />
            }


            <CsvPdfDropdown/>
        </div>
    </div>
  )
}

export default HeaderButtons