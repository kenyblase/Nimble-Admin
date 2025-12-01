import { useFetchNotifications } from '../../utils/useApis/useNotificationApis/useFetchNotifications'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useEffect, useState } from 'react'

const Notifications = () => {
    const [page, setPage] = useState(1)

    const { data:notifications, isLoading } = useFetchNotifications(page, 10)

    const totalPages = notifications?.pagination?.totalPages || 1

    const getPaginationRange = () => {
    const range = [];
    const delta = 1;
    const totalNumbers = delta * 2 + 1;
    const totalBlocks = totalNumbers + 2;
    if (totalPages <= totalBlocks) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const left = Math.max(2, page - delta);
    const right = Math.min(totalPages - 1, page + delta);
    range.push(1);
    if (left > 2) range.push("prev-ellipsis");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages - 1) range.push("next-ellipsis");
    range.push(totalPages);
    return range;
  };

    if(isLoading) return  <LoadingSpinner/>
  return (
    <div className='mt-7 mb-5 flex flex-col gap-7'>
      <div className='h-11 flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-[#202224]'>Notifications</h1>
      </div>

      <div className='flex flex-col w-full rounded-2xl border border-[#0000000D] bg-[#FFFFFF]'>
        {notifications?.data.map((notification) => {
            const { reportedBy } = notification.metadata || {};
            const { firstName, lastName, profilePic } = reportedBy || {};

            return (
                <div key={notification._id} className="flex justify-between p-6 border-b border-[#E9F1FF] hover:bg-[#F6F9FF]">
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex gap-2.5 items-center">

                                {profilePic && (
                                    <img
                                        src={profilePic}
                                        alt="Reporter"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                )}

                                {(firstName || lastName) && !profilePic  && (
                                    <div className='flex items-center justify-center w-8 h-8 bg-[#2376FC] rounded-full'>
                                        <p className='text-[#FBFCFF] font-medium text-[10px]'>{firstName[0]} {lastName[0]}</p>
                                    </div>
                                )}

                                <p className="text-[#071832] text-lg font-medium">
                                    {notification?.title}
                                </p>
                            </div>

                            <p className="text-[#071832CC] font-light text-xs">
                                {formatTimeAgo(notification?.createdAt)}
                            </p>
                        </div>

                        <p className='text-base font-light text-[#071832]'>{notification?.message}</p>
                    </div>
                </div>
            );
        })}
      </div>

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
    </div>
  )
}

export default Notifications

function formatTimeAgo(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date; // milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;

  // For older dates → show full date
  return date.toLocaleDateString('en-GB'); // e.g. "02/03/2024"
}