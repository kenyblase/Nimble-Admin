const LogoutButton = ({logout}) => {
  return (
    <button onClick={logout} className='flex gap-2.5 border-2 items-center justify-center border-[#D61C2B] rounded-lg py-3 px-5 mb-2'>
        {icons.logout}
        <span className='text-[#D61C2B] font-semibold text-base'>Logout Session</span>
    </button>
  )
}

export default LogoutButton

const icons = {
    logout: <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.90002 7.80828C9.21002 4.20828 11.06 2.73828 15.11 2.73828H15.24C19.71 2.73828 21.5 4.52828 21.5 8.99828V15.5183C21.5 19.9883 19.71 21.7783 15.24 21.7783H15.11C11.09 21.7783 9.24002 20.3283 8.91002 16.7883" stroke="#D61C2B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 12.25H3.62" stroke="#D61C2B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.85 8.89844L2.5 12.2484L5.85 15.5984" stroke="#D61C2B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
}