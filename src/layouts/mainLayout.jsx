import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function MainLayout() {
  return (
    <div className="main-layout">
      <div className="flex min-h-screen">
        <div className='min-w-60'>
          <Sidebar />
        </div>
        <main className="flex flex-col w-full">
          <div className='px-10'>
            <Navbar />
          </div>
          <div className='px-10 bg-gray-50 h-full'>
          <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
