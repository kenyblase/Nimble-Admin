import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function MainLayout() {
  return (
    <div className="main-layout">
      <div className="flex">
        <div className='min-w-16'>
          <Sidebar />
        </div>
        <main className="flex flex-col w-full px-4">
          <Navbar />
          <Outlet />
        </main>
      </div>
    </div>
  )
}