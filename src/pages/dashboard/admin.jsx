import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AdminTable from '../../components/AdminTable'
import { useFetchAllAdmins } from '../../utils/useApis/useAdminApis/useFetchAllAdmin'
import { useState } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useEffect } from 'react'

const Categories = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const navigate = useNavigate()
  const {data:Admins, isLoading} = useFetchAllAdmins(page, 10, debouncedSearch)
  // Debounce search input (500ms)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className='mt-7 mb-5 flex flex-col gap-7'>
      <div className='h-11 flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-[#202224]'>Admin</h1>
        <button onClick={()=>navigate('/categories/create')} className='flex gap-1 items-center cursor-pointer h-full rounded-full bg-[#3652AD] px-5'>
          <Plus size={18} color='#F6F6F6'/>
          <h1 className='text-lg font-semibold text-[#FEFEFF]'>Add New Admin</h1>
        </button>
      </div>

      <div>
        {isLoading && !debouncedSearch ? 
          <div className='w-full h-80 flex items-center justify-center'>
            <div className='w-20 h-20'>
              <LoadingSpinner size={'size-full'}/>
            </div>
          </div>
        : 
        <AdminTable 
        admins={Admins?.data} 
        totalPages={Admins?.pagination?.totalPages} 
        page={page} 
        setPage={setPage} 
        search={search} 
        setSearch={setSearch}
        />}
      </div>
    </div>
  )
}

export default Categories