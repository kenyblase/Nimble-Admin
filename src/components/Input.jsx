const Input = ({icon:Icon, placeholder, value, handleChange, otherStyles,type='text', ...props}) => {
  return (
    <div className='relative mb-6'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        {
          Icon && 
          <Icon className = 'size-5 text-[#B0B0B0]'/>
        }
      </div>
      <input
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      type={type}
      {...props}
      className={`w-full pl-10 pr-3 py-2 bg-[#FAFAFA] rounded-lg outline-none
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-400 transition duration-200 ${otherStyles}`}/>
    </div>
  )
}

export default Input
