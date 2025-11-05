import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Tabs from '../../components/Tabs'
import { useQueryClient } from '@tanstack/react-query'
import { useFetchChat, useFetchChats } from '../../utils/useApis/useChatApi.js/useFetchChats'
import { initSocket } from '../../utils/socket/socket'
import { useAuthStore } from '../../utils/api/store/useAuthStore'
import LoadingSpinner from '../../components/LoadingSpinner'

const Appeals = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState('Appeals')
  const [selectedChatId, setSelectedChatId] = useState(null)

  const {admin} = useAuthStore()
  const {data:chatListData, isLoading:IsChatListLoading} = useFetchChats()
  const {data:chatData, isLoading:isChatLoading} = useFetchChat(selectedChatId)

  useEffect(() => {
  if (!admin?._id) return;

  const socket = initSocket(admin._id);
  socket.on("newChat", (chat) => {
    queryClient.setQueryData(["chatList"], (old = []) => [chat, ...old]);
  });

  socket.on("newMessage", (message) => {
    // Update messages
    queryClient.setQueryData(["messages", message.chatId], (old = []) => [
      ...old,
      message,
    ]);

    // Update chat list & move to top
    queryClient.setQueryData(["chats"], (old = []) => {
      const chatToUpdate = old.find((chat) => chat._id === message.chatId);
      if (!chatToUpdate) return old;

      const updatedChat = {
        ...chatToUpdate,
        lastMessage: message.text || message.type,
        updatedAt: message.createdAt,
      };

      return [updatedChat, ...old.filter((chat) => chat._id !== message.chatId)];
    });
  });

  return () => {
    socket.off("newChat");
    socket.off("newMessage");
  };
}, [queryClient, admin]);



  const tabs = ['Appeals', 'Support requests', 'Chats']

  return (
    <div className='mt-7 flex flex-col gap-7 min-h-screen'>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>

      {activeTab === 'Chats' &&
        <div className='flex pb-8 gap-6 flex-1'>
            <div className='flex flex-col rounded-lg border-r border-[#D3E4FE80] bg-[#FFFFFF] py-6 gap-8 h-screen'>
                <div className='px-6 pb-2'>
                    <p className='font-medium text-2xl text-[#000000]'>Chats</p>
                </div>

                <div className="flex flex-col gap-1 px-6 flex-1 overflow-y-auto ">
                {chatListData.map((chat) => (
                    <div
                    key={chat._id}
                    onClick={()=>setSelectedChatId(chat._id)}
                    className={`flex flex-col rounded-[10px] py-2.5 px-4 ${selectedChatId === chat._id ? 'bg-[#EDF4FF]' : 'bg-[#FFFFFF] border-b border-[#E9F1FF]'} w-[360px] cursor-pointer`}
                    >
                    <div className="flex gap-3 w-full">
                        <img
                        src={chat?.seller?.profilePic || chat?.buyer?.profilePic || './default-avatar.jpeg'}
                        alt="profile picture"
                        className="h-[52px] w-[52px] rounded-full object-cover border border-[#0000001A]"
                        />
                        <div className="flex flex-col gap-2 w-full">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-[#000929] font-normal">
                                {chat?.seller?.firstName} & {chat?.buyer?.firstName}
                            </p>
                            {chat?.lastMessageSentAt && 
                            <p className="text-xs text-[#000000B2] font-light">
                                {formatUTCToLocalTimeAgo(chat?.lastMessageSentAt)}
                            </p>}
                        </div>
                        <p className="text-[#000000B2] text-xs font-light">
                            {chat?.lastMessage || 'No Messages Yet'} 
                        </p>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>

            <div className='flex flex-col justify-between rounded-lg border border-[#D3E4FE80] pt-6 bg-[#FFFFFF] w-full'>
              {!selectedChatId && 
                <div className='flex items-center justify-center'>
                  <p className='font-medium text-[#000000] text-lg'>No Chat Selected</p>
                </div>
              }
              {selectedChatId && isChatLoading && <LoadingSpinner/>}
              {selectedChatId && !isChatLoading &&
                <div className='flex justify-between border-b border-[#0000001A] px-10 pb-4'>
                  <p className='font-medium text-[#000000] text-lg'>{chatData?.chat?.seller?.firstName} & {chatData?.chat?.buyer?.firstName} <span className='font-light text-[#000000CC] text-lg'>{`(${chatData?.chat?.product?.name})`}</span></p>
                </div>
              }
            </div>
        </div>
      }
    </div>
  )
}

export default Appeals

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

function convertUTCToLocal(utcDateString) {
  if (!utcDateString) return null;
  return new Date(utcDateString); // JS automatically converts UTC to local
}

export function formatUTCToLocalTimeAgo(utcDateString) {
  const localDate = convertUTCToLocal(utcDateString);
  return formatTimeAgo(localDate);
}
