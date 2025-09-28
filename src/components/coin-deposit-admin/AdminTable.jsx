import { useState } from 'react';
import EmptyUserList from '../user-management/EmptyUserList'
import EditAdminModal from './EditAdminModal';
import PasswordConfirmationModal from './PasswordConfirmationModal';
import {useEditAdminPermissions} from '../../utils/useApis/useAdminApis/useEditAdminPermissions'
import {useDeleteAdmin} from '../../utils/useApis/useAdminApis/useDeleteAdmin'
import SuccessModal from './SuccessModal';

const AdminTable = ({admins, page=1, totalPages, onPageChange:setPage}) => {

  const [isEditAdminModalOpen, setIsEditAdminModalOpen] = useState(false)
  const [isEditAdminPasswordModalOpen, setIsEditAdminPasswordModalOpen] = useState(false)
  const [isEditAdminSuccessModalOpen, setIsEditAdminSuccessModalOpen] = useState(false)
  const [isDeleteAdminModalPasswordOpen, setIsDeleteAdminPasswordModalOpen] = useState(false)
  const [isDeleteAdminSuccessModalOpen, setIsDeleteAdminSuccessModalOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState(null)

  const {editAdminPermissions, isUpdatingPermissions} = useEditAdminPermissions()
  const {deleteAdmin, isDeleting} = useDeleteAdmin()

  const getPaginationRange = () => {
  const range = [];
  const delta = 1; // neighbors each side of current page
  const totalNumbers = delta * 2 + 1; // current + neighbors
  const totalBlocks = totalNumbers + 2; // first & last

  if (totalPages <= totalBlocks) {
    // small page count, show all
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const left = Math.max(2, page - delta);
  const right = Math.min(totalPages - 1, page + delta);

  range.push(1);

  if (left > 2) {
    range.push("prev-ellipsis");
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < totalPages - 1) {
    range.push("next-ellipsis");
  }

  range.push(totalPages);

  return range;
};

const handleEditAdminPermissions = async()=>{
  await editAdminPermissions(selectedAdmin)
  setIsEditAdminSuccessModalOpen(true)
}

const handleDeleteAdmin = async()=>{
  await deleteAdmin(selectedAdmin)
  setIsDeleteAdminSuccessModalOpen(true)
}


  return (
    <>
      {admins.length > 0 ? (
      <div>
        <table className="w-full border-collapse border">
          <thead className="bg-[#0057FF] text-white">
            <tr className="text-left">
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">User ID</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Name</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Email Address</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Role</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Permissions</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Status</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a._id} className="border-b">
                <td className="py-5 px-3 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E]">
                  <div className="flex w-full items-center gap-1">
                    <span className="max-w-[80%] truncate">ADMIN-{a._id}</span>
                    <span>{handleAdminIcon(a.role)}</span>
                  </div>
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E] max-w-32 truncate">
                  {a.fullName}
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E] max-w-40 truncate">
                  {a.email}
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E] max-w-40 truncate">
                  {a.role}
                </td>
                <td className="p-3 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E]">
                    <div className="flex flex-wrap gap-2">
                        {a.permissions.length === 6 ? (
                            <span>All access</span>
                        ) : a.permissions.map((p, i) => (
                        <span key={i} className="text-sm">
                            {p}
                        </span>
                        ))}
                    </div>
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base">
                  {handleStatus(a.status)}
                </td>
                <td className="py-3 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-blue-600 cursor-pointer whitespace-nowrap">
                  <span className={`text-sm font-medium flex items-center gap-2 py-1 px-3 rounded-lg text-[#666666]`}>
                    <button onClick={()=>{
                      setSelectedAdmin(a)
                      setIsEditAdminModalOpen(true)
                    }} className='flex items-center gap-2 py-2 px-4 bg-[#FAFCFF] border border-[#85ABF8] rounded-lg'>
                        <span>{icons.edit}</span>
                        <span>Edit access</span>
                    </button>
                    <button onClick={()=>{
                      setSelectedAdmin(a)
                      setIsDeleteAdminPasswordModalOpen(true)
                    }} className='flex items-center gap-2 py-2 px-4 bg-[#FDF5F5] border border-[#E6757E] rounded-lg'>
                        <span>{icons.delete}</span>
                        <span>Delete</span>
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50 flex items-center"
          >
            ← Previous
          </button>

          {getPaginationRange().map((p, idx) => {
            if (p === "prev-ellipsis") {
              return (
                <span
                  key={`${idx}b`}
                  onClick={() => setPage(Math.max(1, page - 3))}
                  className="px-2 text-gray-500 cursor-pointer hover:text-gray-700"
                >
                  ...
                </span>
              );
            }
            if (p === "next-ellipsis") {
              return (
                <span
                  key={`${idx}a`}
                  onClick={() => setPage(Math.min(totalPages, page + 3))}
                  className="px-2 text-gray-500 cursor-pointer hover:text-gray-700"
                >
                  ...
                </span>
              );
            }
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded ${
                  p === page ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            );
          })}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50 flex items-center"
          >
            Next →
          </button>
        </div>
        <EditAdminModal 
          isOpen={isEditAdminModalOpen}
          onClose={()=>setIsEditAdminModalOpen(false)}
          adminData={selectedAdmin}
          setAdminData={setSelectedAdmin}
          openDeleteModal={()=>setIsDeleteAdminPasswordModalOpen(true)}
          openPasswordModal={()=>setIsEditAdminPasswordModalOpen(true)}
        />
        <PasswordConfirmationModal
        header='Save Changes?'
        text='Enter your password to save changes.'
        buttonText='Yes, Save changes'
        icon={icons.lock}
        isOpen={isEditAdminPasswordModalOpen}
        onClose={()=>setIsEditAdminPasswordModalOpen(false)}
        adminData={selectedAdmin}
        setAdminData={setSelectedAdmin}
        openAdminModal={()=>setIsEditAdminModalOpen(true)}
        onSubmit={handleEditAdminPermissions}
        isLoading={isUpdatingPermissions}
      />
      <SuccessModal
        header='Changes Saved!'
        text='You have successfully saved all changes.'
        icon={icons.success}
        isOpen={isEditAdminSuccessModalOpen}
        onClose={()=>setIsEditAdminSuccessModalOpen(false)}
      />

        <PasswordConfirmationModal
        header='Delete Account?'
        text={`This action will permanently delete ${selectedAdmin?.fullName ?? 'Admin'}'s account. To proceed, kindly enter your password`}
        buttonText={`Yes, delete ${selectedAdmin?.fullName ?? 'Admin'}’s account`}
        icon={icons.deleteAdmin}
        isOpen={isDeleteAdminModalPasswordOpen}
        onClose={()=>setIsDeleteAdminPasswordModalOpen(false)}
        adminData={selectedAdmin}
        setAdminData={setSelectedAdmin}
        openAdminModal={()=>{}}
        onSubmit={handleDeleteAdmin}
        isLoading={isDeleting}
        />
        <SuccessModal
          header='Account deleted!'
          text={`You have successfully deleted ${selectedAdmin?.fullName ?? 'Admin'}’s account.`}
          icon={icons.success}
          isOpen={isDeleteAdminSuccessModalOpen}
          onClose={()=>setIsDeleteAdminSuccessModalOpen(false)}
        />
      </div>) : <EmptyUserList/>}
    </>
  );
};

export default AdminTable

const handleStatus = (status)=>{
  if(status === 'Active') return (
    <span className={`text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#F6FDF9] text-[#189553]`}>
      {icons.active}
      {status}
    </span>
  )
  else return (
    <span className={`text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#FFF8F5] text-[#FF640F]`}>
      {icons.suspended}
      {status}
    </span>
  )
}

const handleAdminIcon = (role)=>{
    if(role === 'Super Admin') return(
        icons.superAdmin
    )
    else if(role === 'Moderator') return(
        icons.moderator
    )
    else return(
        icons.support
    )
}

const icons = {
  active: 
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1.3335C4.32667 1.3335 1.33333 4.32683 1.33333 8.00016C1.33333 11.6735 4.32667 14.6668 8 14.6668C11.6733 14.6668 14.6667 11.6735 14.6667 8.00016C14.6667 4.32683 11.6733 1.3335 8 1.3335ZM11.1867 6.46683L7.40667 10.2468C7.31333 10.3402 7.18667 10.3935 7.05333 10.3935C6.92 10.3935 6.79333 10.3402 6.7 10.2468L4.81333 8.36016C4.62 8.16683 4.62 7.84683 4.81333 7.6535C5.00667 7.46016 5.32667 7.46016 5.52 7.6535L7.05333 9.18683L10.48 5.76016C10.6733 5.56683 10.9933 5.56683 11.1867 5.76016C11.38 5.9535 11.38 6.26683 11.1867 6.46683Z" fill="#189553"/>
    </svg>,
  suspended: 
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.98 1.3335C4.3 1.3335 1.31333 4.32016 1.31333 8.00016C1.31333 11.6802 4.3 14.6668 7.98 14.6668C11.66 14.6668 14.6467 11.6802 14.6467 8.00016C14.6467 4.32016 11.6667 1.3335 7.98 1.3335ZM10.82 8.82016C10.82 9.92683 9.92666 10.8202 8.82 10.8202H7.18C6.07333 10.8202 5.18 9.92683 5.18 8.82016V7.18016C5.18 6.0735 6.07333 5.18016 7.18 5.18016H8.82C9.92666 5.18016 10.82 6.0735 10.82 7.18016V8.82016Z" fill="#FF640F"/>
    </svg>,
  details: 
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.00001 1.3335C4.32001 1.3335 1.33334 4.32016 1.33334 8.00016C1.33334 11.6802 4.32001 14.6668 8.00001 14.6668C11.68 14.6668 14.6667 11.6802 14.6667 8.00016" stroke="#1C63F3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.66666 7.33337L14.1333 1.8667" stroke="#1C63F3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14.6667 4.5535V1.3335H11.4467" stroke="#1C63F3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>,

  superAdmin: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.9667 8.94948L16.8333 7.63281C16.6167 7.38281 16.4417 6.91615 16.4417 6.58281V5.16615C16.4417 4.28281 15.7167 3.55781 14.8333 3.55781H13.4167C13.0917 3.55781 12.6167 3.38281 12.3667 3.16615L11.05 2.03281C10.475 1.54115 9.53334 1.54115 8.95 2.03281L7.64167 3.17448C7.39167 3.38281 6.91667 3.55781 6.59167 3.55781H5.15C4.26667 3.55781 3.54167 4.28281 3.54167 5.16615V6.59115C3.54167 6.91615 3.36667 7.38281 3.15834 7.63281L2.03334 8.95781C1.55 9.53281 1.55 10.4661 2.03334 11.0411L3.15834 12.3661C3.36667 12.6161 3.54167 13.0828 3.54167 13.4078V14.8328C3.54167 15.7161 4.26667 16.4411 5.15 16.4411H6.59167C6.91667 16.4411 7.39167 16.6161 7.64167 16.8328L8.95834 17.9661C9.53334 18.4578 10.475 18.4578 11.0583 17.9661L12.375 16.8328C12.625 16.6161 13.0917 16.4411 13.425 16.4411H14.8417C15.725 16.4411 16.45 15.7161 16.45 14.8328V13.4161C16.45 13.0911 16.625 12.6161 16.8417 12.3661L17.975 11.0495C18.4583 10.4745 18.4583 9.52448 17.9667 8.94948ZM13.4667 8.42448L9.44167 12.4495C9.325 12.5661 9.16667 12.6328 9 12.6328C8.83334 12.6328 8.675 12.5661 8.55834 12.4495L6.54167 10.4328C6.3 10.1911 6.3 9.79115 6.54167 9.54948C6.78334 9.30781 7.18334 9.30781 7.425 9.54948L9 11.1245L12.5833 7.54115C12.825 7.29948 13.225 7.29948 13.4667 7.54115C13.7083 7.78281 13.7083 8.18281 13.4667 8.42448Z" fill="url(#paint0_linear_1324_55277)"/>
<defs>
<linearGradient id="paint0_linear_1324_55277" x1="10.0037" y1="1.66406" x2="10.0037" y2="18.3349" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF9358"/>
<stop offset="1" stop-color="#FFE418"/>
</linearGradient>
</defs>
</svg>,
moderator: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.9667 8.94948L16.8333 7.63281C16.6167 7.38281 16.4417 6.91615 16.4417 6.58281V5.16615C16.4417 4.28281 15.7167 3.55781 14.8333 3.55781H13.4167C13.0917 3.55781 12.6167 3.38281 12.3667 3.16615L11.05 2.03281C10.475 1.54115 9.53334 1.54115 8.95 2.03281L7.64167 3.17448C7.39167 3.38281 6.91667 3.55781 6.59167 3.55781H5.15C4.26667 3.55781 3.54167 4.28281 3.54167 5.16615V6.59115C3.54167 6.91615 3.36667 7.38281 3.15834 7.63281L2.03334 8.95781C1.55 9.53281 1.55 10.4661 2.03334 11.0411L3.15834 12.3661C3.36667 12.6161 3.54167 13.0828 3.54167 13.4078V14.8328C3.54167 15.7161 4.26667 16.4411 5.15 16.4411H6.59167C6.91667 16.4411 7.39167 16.6161 7.64167 16.8328L8.95834 17.9661C9.53334 18.4578 10.475 18.4578 11.0583 17.9661L12.375 16.8328C12.625 16.6161 13.0917 16.4411 13.425 16.4411H14.8417C15.725 16.4411 16.45 15.7161 16.45 14.8328V13.4161C16.45 13.0911 16.625 12.6161 16.8417 12.3661L17.975 11.0495C18.4583 10.4745 18.4583 9.52448 17.9667 8.94948ZM13.9 9.99948L12.925 12.9661C12.8 13.4578 12.275 13.8578 11.7417 13.8578H10.2C9.93334 13.8578 9.55834 13.7661 9.39167 13.5995L8.16667 12.6411C8.14167 13.1745 7.9 13.3995 7.30834 13.3995H6.90834C6.29167 13.3995 6.04167 13.1578 6.04167 12.5745V8.59115C6.04167 8.00781 6.29167 7.76615 6.90834 7.76615H7.31667C7.93334 7.76615 8.18334 8.00781 8.18334 8.59115V8.89115L9.8 6.49115C9.96667 6.23281 10.3917 6.04948 10.75 6.19115C11.1417 6.32448 11.3917 6.75781 11.3083 7.14115L11.1083 8.44115C11.0917 8.55781 11.1167 8.66615 11.1917 8.74948C11.2583 8.82448 11.3583 8.87448 11.4667 8.87448H13.0917C13.4083 8.87448 13.675 8.99948 13.8333 9.22448C13.975 9.44115 14 9.71615 13.9 9.99948Z" fill="#0057FF"/>
</svg>,
support: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 1.66797H5C3.61667 1.66797 2.5 2.7763 2.5 4.14297V13.2346C2.5 14.6013 3.61667 15.7096 5 15.7096H5.63333C6.3 15.7096 6.93333 15.968 7.4 16.4346L8.825 17.843C9.475 18.4846 10.5333 18.4846 11.1833 17.843L12.6083 16.4346C13.075 15.968 13.7167 15.7096 14.375 15.7096H15C16.3833 15.7096 17.5 14.6013 17.5 13.2346V4.14297C17.5 2.7763 16.3833 1.66797 15 1.66797ZM10.2333 12.468C10.1083 12.5096 9.9 12.5096 9.76667 12.468C8.68333 12.093 6.25 10.5513 6.25 7.9263C6.25833 6.76797 7.18333 5.83464 8.33333 5.83464C9.01667 5.83464 9.61667 6.15964 10 6.66797C10.3833 6.15964 10.9833 5.83464 11.6667 5.83464C12.8167 5.83464 13.75 6.76797 13.75 7.9263C13.7417 10.5513 11.3167 12.093 10.2333 12.468Z" fill="#2AC472"/>
</svg>,
edit: <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5933 3.59924L5.38335 12.2892C5.07335 12.6192 4.77335 13.2692 4.71335 13.7192L4.34335 16.9592C4.21335 18.1292 5.05335 18.9292 6.21335 18.7292L9.43335 18.1792C9.88335 18.0992 10.5133 17.7692 10.8233 17.4292L19.0333 8.73924C20.4533 7.23924 21.0933 5.52924 18.8833 3.43924C16.6833 1.36924 15.0133 2.09924 13.5933 3.59924Z" stroke="#1C63F3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.2236 5.05078C12.6536 7.81078 14.8936 9.92078 17.6736 10.2008L12.2236 5.05078Z" fill="#1C63F3"/>
<path d="M12.2236 5.05078C12.6536 7.81078 14.8936 9.92078 17.6736 10.2008" stroke="#1C63F3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.3335 22H21.3335" stroke="#1C63F3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>,
delete: <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.0137 1.75H13.6338C14.6997 1.75003 15.1741 2.0587 15.4189 2.36621C15.6916 2.70864 15.7725 3.152 15.8506 3.63086V3.63379L16.0635 4.89258V5.33301L16.5361 5.35938C18.1498 5.44903 19.7527 5.56836 21.3545 5.72754H21.3564C21.4973 5.74104 21.6018 5.86497 21.5938 6.00879C21.5756 6.13639 21.4664 6.23042 21.3438 6.23047H21.293C16.3133 5.73329 11.3366 5.5253 6.38574 5.93262L5.39453 6.02246L3.35449 6.22266C3.20861 6.23565 3.09412 6.13486 3.08105 6.00098C3.06816 5.8661 3.16739 5.74127 3.31152 5.72754H3.3125L5.35254 5.52734L5.35156 5.52637C6.27226 5.43727 7.19466 5.37942 8.12598 5.31934L8.52246 5.29297L8.58691 4.90137L8.79688 3.62109C8.88017 3.11613 8.9636 2.67914 9.2334 2.34668C9.47556 2.04831 9.94603 1.75 11.0137 1.75Z" fill="#D61C2B" stroke="#D61C2B"/>
<path d="M6.01367 8.25H18.6533C18.8538 8.25 19.0516 8.33187 19.1973 8.48047C19.3369 8.63314 19.4158 8.84001 19.4043 9.05957L18.7842 19.3096C18.7272 20.1015 18.6624 20.8021 18.2773 21.3291C17.923 21.8138 17.2032 22.2597 15.5439 22.2598H9.12402C7.46527 22.2598 6.74526 21.8114 6.39062 21.3252C6.10083 20.9278 5.99193 20.4333 5.93164 19.8779L5.88281 19.3037L5.2627 9.0498C5.25128 8.84156 5.32942 8.63315 5.47168 8.47852C5.60092 8.33804 5.80431 8.25002 6.01367 8.25ZM10.6641 15.75C9.97792 15.75 9.41406 16.3139 9.41406 17C9.41406 17.6861 9.97792 18.25 10.6641 18.25H13.9941C14.6801 18.2498 15.2441 17.686 15.2441 17C15.2441 16.314 14.6801 15.7502 13.9941 15.75H10.6641ZM9.83398 11.75C9.14784 11.75 8.58398 12.3139 8.58398 13C8.58398 13.6861 9.14784 14.25 9.83398 14.25H14.834C15.52 14.2499 16.084 13.6861 16.084 13C16.084 12.3139 15.52 11.7501 14.834 11.75H9.83398Z" fill="#D61C2B" stroke="#D61C2B"/>
</svg>,
  lock: <svg width="80" height="81" viewBox="0 0 80 81" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.5" width="80" height="80" rx="40" fill="#EBF2FF"/>
<path d="M53.5 32.5V36.7C52.62 36.58 51.62 36.52 50.5 36.5V32.5C50.5 26.2 48.72 22 40 22C31.28 22 29.5 26.2 29.5 32.5V36.5C28.38 36.52 27.38 36.58 26.5 36.7V32.5C26.5 26.7 27.9 19 40 19C52.1 19 53.5 26.7 53.5 32.5Z" fill="#0057FF"/>
<path d="M53.5 36.7C52.62 36.58 51.62 36.52 50.5 36.5H29.5C28.38 36.52 27.38 36.58 26.5 36.7C21.4 37.32 20 39.82 20 46.5V50.5C20 58.5 22 60.5 30 60.5H50C58 60.5 60 58.5 60 50.5V46.5C60 39.82 58.6 37.32 53.5 36.7ZM33.42 49.92C33.04 50.28 32.52 50.5 32 50.5C31.74 50.5 31.48 50.44 31.24 50.34C30.98 50.24 30.78 50.1 30.58 49.92C30.22 49.54 30 49.02 30 48.5C30 48.24 30.06 47.98 30.16 47.74C30.26 47.5 30.4 47.28 30.58 47.08C30.78 46.9 30.98 46.76 31.24 46.66C31.98 46.34 32.86 46.52 33.42 47.08C33.6 47.28 33.74 47.5 33.84 47.74C33.94 47.98 34 48.24 34 48.5C34 49.02 33.78 49.54 33.42 49.92ZM41.84 49.26C41.74 49.5 41.6 49.72 41.42 49.92C41.04 50.28 40.52 50.5 40 50.5C39.46 50.5 38.96 50.28 38.58 49.92C38.4 49.72 38.26 49.5 38.16 49.26C38.06 49.02 38 48.76 38 48.5C38 47.96 38.22 47.46 38.58 47.08C39.32 46.34 40.66 46.34 41.42 47.08C41.78 47.46 42 47.96 42 48.5C42 48.76 41.94 49.02 41.84 49.26ZM49.42 49.92C49.04 50.28 48.52 50.5 48 50.5C47.48 50.5 46.96 50.28 46.58 49.92C46.22 49.54 46 49.04 46 48.5C46 47.96 46.22 47.46 46.58 47.08C47.34 46.34 48.68 46.34 49.42 47.08C49.5 47.18 49.58 47.28 49.66 47.4C49.74 47.5 49.8 47.62 49.84 47.74C49.9 47.86 49.94 47.98 49.96 48.1C49.98 48.24 50 48.38 50 48.5C50 49.02 49.78 49.54 49.42 49.92Z" fill="#0057FF"/>
</svg>,
deleteAdmin: <svg width="80" height="81" viewBox="0 0 80 81" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.5" width="80" height="80" rx="40" fill="#FDF5F5"/>
<path d="M40 20.5C34.76 20.5 30.5 24.76 30.5 30C30.5 35.14 34.52 39.3 39.76 39.48C39.92 39.46 40.08 39.46 40.2 39.48C40.24 39.48 40.26 39.48 40.3 39.48C40.32 39.48 40.32 39.48 40.34 39.48C45.46 39.3 49.48 35.14 49.5 30C49.5 24.76 45.24 20.5 40 20.5Z" fill="#D61C2B"/>
<path d="M50.1599 44.8017C44.5799 41.0817 35.4799 41.0817 29.8599 44.8017C27.3199 46.5017 25.9199 48.8017 25.9199 51.2617C25.9199 53.7217 27.3199 56.0017 29.8399 57.6817C32.6399 59.5617 36.3199 60.5017 39.9999 60.5017C43.6799 60.5017 47.3599 59.5617 50.1599 57.6817C52.6799 55.9817 54.0799 53.7017 54.0799 51.2217C54.0599 48.7617 52.6799 46.4817 50.1599 44.8017ZM43.8799 53.0217C44.4599 53.6017 44.4599 54.5617 43.8799 55.1417C43.5799 55.4417 43.1999 55.5817 42.8199 55.5817C42.4399 55.5817 42.0599 55.4417 41.7599 55.1417L39.9999 53.3817L38.2399 55.1417C37.9399 55.4417 37.5599 55.5817 37.1799 55.5817C36.7999 55.5817 36.4199 55.4417 36.1199 55.1417C35.5399 54.5617 35.5399 53.6017 36.1199 53.0217L37.8799 51.2617L36.1199 49.5017C35.5399 48.9217 35.5399 47.9617 36.1199 47.3817C36.6999 46.8017 37.6599 46.8017 38.2399 47.3817L39.9999 49.1417L41.7599 47.3817C42.3399 46.8017 43.2999 46.8017 43.8799 47.3817C44.4599 47.9617 44.4599 48.9217 43.8799 49.5017L42.1199 51.2617L43.8799 53.0217Z" fill="#D61C2B"/>
</svg>,
success:<svg width="80" height="81" viewBox="0 0 80 81" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.5" width="80" height="80" rx="40" fill="#F6FDF9"/>
<path d="M40 20.5C28.98 20.5 20 29.48 20 40.5C20 51.52 28.98 60.5 40 60.5C51.02 60.5 60 51.52 60 40.5C60 29.48 51.02 20.5 40 20.5ZM49.56 35.9L38.22 47.24C37.94 47.52 37.56 47.68 37.16 47.68C36.76 47.68 36.38 47.52 36.1 47.24L30.44 41.58C29.86 41 29.86 40.04 30.44 39.46C31.02 38.88 31.98 38.88 32.56 39.46L37.16 44.06L47.44 33.78C48.02 33.2 48.98 33.2 49.56 33.78C50.14 34.36 50.14 35.3 49.56 35.9Z" fill="#2AC472"/>
</svg>

}