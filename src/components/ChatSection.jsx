import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useFetchChat, useFetchChats } from '../utils/useApis/useChatApis/useFetchChats'
import { initSocket } from '../utils/socket/socket'
import { useAuthStore } from '../utils/api/store/useAuthStore'
import LoadingSpinner from './LoadingSpinner'
import {Paperclip, Send, Headset} from 'lucide-react'
import { useSendMessage } from '../utils/useApis/useChatApis/useSendMessage'

const ChatSection = () => {
  const queryClient = useQueryClient()
  const [selectedChatId, setSelectedChatId] = useState(null)
  const [message, setMessage] = useState('')

  const {admin} = useAuthStore()
  const {data:chatListData, isLoading:IsChatListLoading} = useFetchChats()
  const {data:chatData, isLoading:isChatLoading} = useFetchChat(selectedChatId)
  const { mutateAsync: sendMessage, isPending:isSending} = useSendMessage()

  useEffect(() => {
  if (!admin?._id) return;

  const socket = initSocket(admin._id);
  socket.on("newChat", (chat) => {
    queryClient.setQueryData(["chatList"], (old = []) => [chat, ...old]);
  });

  socket.on("newMessage", (message) => {
    queryClient.setQueryData(["chat", message.chatId], (old) => {
    if (!old) return old;

    return {
        ...old,
        messages: [...(old.messages || []), message]
      };
    });

    queryClient.setQueryData(["chatList"], (old = []) => {
      console.log(old)
      const chatToUpdate = old.find((chat) => chat._id === message.chatId);
      if (!chatToUpdate) return old;

      const updatedChat = {
        ...chatToUpdate,
        lastMessage: message.text || message.type,
        lastMessageSentAt: message.createdAt,
      };

      return [updatedChat, ...old.filter((chat) => chat._id !== message.chatId)];
    });
  });

  return () => {
    socket.off("newChat");
    socket.off("newMessage");
  };
}, [queryClient, admin]);

 const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatData?.messages])

const handleSendMessage = async()=>{
  if (!message.trim() || !selectedChatId) return;

  await sendMessage({chatId: selectedChatId, text: message})

  setMessage('')
}

  return (
        <div className='flex pb-8 gap-6 flex-1'>
            <div className='flex flex-col rounded-lg border-r border-[#D3E4FE80] bg-[#FFFFFF] py-6 gap-8 h-full'>
                <div className='px-6 pb-2'>
                    <p className='font-medium text-2xl text-[#000000]'>Chats</p>
                </div>

                {IsChatListLoading ? 
                <div className='w-[360px]'>
                  <LoadingSpinner/> 
                </div>
                : 
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
                        <p className="text-[#000000B2] text-xs font-light max-w-[250px] truncate">
                            {chat?.lastMessage || 'No Messages Yet'} 
                        </p>
                        </div>
                    </div>
                    </div>
                ))}
                </div>}
            </div>

            <div className='flex flex-col justify-between rounded-lg border border-[#D3E4FE80] pt-6 bg-[#FFFFFF] flex-1 w-full'>
              {!selectedChatId && 
                <div className='flex items-center justify-center'>
                  <p className='font-medium text-[#000000] text-lg'>No Chat Selected</p>
                </div>
              }
              {selectedChatId && isChatLoading && <LoadingSpinner/>}
              {selectedChatId && !isChatLoading &&
                <div className='h-full'>
                  <div className='flex justify-between border-b border-[#0000001A] px-10 pb-4 mb-2'>
                    <p className='font-medium text-[#000000] text-lg'>{chatData?.chat?.seller?.firstName} & {chatData?.chat?.buyer?.firstName} <span className='font-light text-[#000000CC] text-lg'>{`(${chatData?.chat?.product?.name})`}</span></p>
                  </div>

                 <div className='flex flex-col h-[calc(100vh-250px)] overflow-y-auto px-10 gap-6 scrollbar-thin scrollbar-thumb-[#C1C1C1] scrollbar-track-transparent'>
                  {chatData?.messages?.map((msg) => {
                    const isSeller = msg.sender._id === chatData?.chat?.seller?._id;
                    const isBuyer = msg.sender._id === chatData?.chat?.buyer?._id;
                    const isAdmin = msg.isFromAdmin === true

                   const senderName = msg.sender.firstName

                    // SELLER MESSAGE
                    if (isSeller) {
                      return (
                        <div key={msg._id} className='flex items-center gap-4'>
                          <img
                            src={chatData?.chat?.seller?.profilePic || "./default-avatar.jpeg"}
                            alt="profile-picture"
                            className='h-12 w-12 object-cover rounded-full border border-[#0000001A]'
                          />

                          <div className='flex flex-col gap-1'>
                            <p className='text-xs text-[#00000080] font-medium'>{senderName}</p>
                            <div className='max-w-[300px] rounded-tl-xl rounded-tr-3xl rounded-br-3xl py-2 px-3 bg-[#EDF4FF]'>
                              <p className='font-light text-base text-[#000000]'>{msg.text}</p>
                            </div>
                            <p className='font-light text-[10px] text-[#00000099]'>{formatUTCToLocalTimeAgo(msg.createdAt)}</p>
                          </div>
                        </div>
                      );
                    }

                    // BUYER MESSAGE
                    if (isBuyer) {
                      return (
                        <div key={msg._id} className='flex flex-row-reverse items-center gap-4'>
                          <img
                            src={chatData?.chat?.buyer?.profilePic || "./default-avatar.jpeg"}
                            alt="profile-picture"
                            className='h-12 w-12 object-cover rounded-full border border-[#0000001A]'
                          />

                          <div className='flex flex-col gap-1 items-end'>
                            <p className='text-xs text-[#00000080] font-medium self-end'>{senderName}</p>
                            <div className='max-w-[300px] rounded-tl-xl rounded-tr-3xl rounded-bl-3xl py-2 px-3 bg-[#EDF4FF]'>
                              <p className='font-light text-base text-[#000000]'>{msg.text}</p>
                            </div>
                            <p className='font-light text-[10px] text-[#00000099]'>{formatUTCToLocalTimeAgo(msg.createdAt)}</p>
                          </div>
                        </div>
                      );
                    }

                    // ADMIN MESSAGE
                    if (isAdmin) {
                      return (
                        <div key={msg._id} className='flex items-center justify-center gap-4'>
                          <div className='flex items-center justify-center w-12 h-12 opacity-70 bg-[#D97E0E] rounded-full'>
                            <Headset color='#FFFFFF' size={24} />
                          </div>

                          <div className='flex flex-col gap-1'>
                            <p className='text-xs text-[#00000080] font-medium text-left'>{senderName}</p>
                            <div className='max-w-[500px] rounded-xl py-2 px-3 bg-[#F5ECE1] border border-[#F3ECE3]'>
                              <p className='font-light text-base text-[#000000]'>{msg.text}</p>
                            </div>
                            <p className='font-light text-[10px] text-[#00000099] text-right'>{formatUTCToLocalTimeAgo(msg.createdAt)}</p>
                          </div>
                        </div>
                      );
                    }

                    return null;
                  })}
                  <div ref={bottomRef} />
                </div>

                    <div className='flex items-center pt-1.5 pb-2.5 px-4 gap-4'>
                      <Paperclip size={18} color='#00000099'/>

                      <div className='flex gap-1 w-full'>
                        <input 
                          type="text" 
                          value={message}
                          onChange={(e)=>setMessage(e.target.value)}
                          placeholder='Type message here...'
                          className='h-10 w-full rounded-full px-4 border border-[#0000001A] focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black placeholder:text-[#040C1980] outline-none'
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          disabled={isSending}
                        />
                        <button onClick={handleSendMessage} className={`flex items-center justify-center rounded-full p-2.5  ${message ? 'bg-blue-500' : 'bg-[#000000] opacity-40'}`}>

                          <Send size={22} color='#FFFFFF'/>
                        </button>
                      </div>
                    </div>
                  </div>
              }
            </div>
        </div>
  )
}

export default ChatSection

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
