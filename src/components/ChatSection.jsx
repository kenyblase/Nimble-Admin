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
                           { msg.type === 'text' &&
                              <div className='max-w-[300px] rounded-tl-xl rounded-tr-3xl rounded-br-3xl py-2 px-3 bg-[#EDF4FF]'>
                                <p className='font-light text-base text-[#000000]'>{msg.text}</p>
                              </div>
                            }
                            { msg.type === 'invoice' &&
                              <div className='max-w-[300px] flex flex-col gap-2 rounded-tl-xl rounded-tr-3xl rounded-bl-3xl p-3 bg-[#48AD3612]'>
                                <div className='flex items-center gap-3 pb-2 border-b border-[#3652AD1A]'>
                                  {icons.invoiceIcon}
                                  <p className='text-[#000000] text-sm font-light'>{senderName} sent an invoice <span className='font-medium'>₦{(msg?.invoice?.totalAmount).toLocaleString()}</span></p>
                                </div>
                                <div className='flex flex-col gap-2 pb-2 border-b border-[#3652AD1A]'>
                                  <p className='font-normal text-sm text-[#000000CC]'>Product Details</p>
                                  <p className='font-light text-xs text-[#000000E5]'>{chatData?.chat?.product?.name || 'price per unit'}: ₦{msg?.invoice?.productPricePerUnit}</p>
                                  <p className='font-light text-xs text-[#000000E5]'>Qty: {msg?.invoice?.quantity}</p>
                                </div>
                                <div className='flex flex-col gap-2 pb-2'>
                                  <p className='font-normal text-sm text-[#000000CC]'>Summary</p>
                                  <p className='font-light text-xs text-[#000000E5]'>Sub-total: ₦{(msg?.invoice?.productPricePerUnit * msg?.invoice?.quantity) || 0}</p>
                                  <p className='font-light text-xs text-[#000000E5]'>Delivery Fee: ₦{msg?.invoice?.deliveryFee || 0}</p>
                                  <p className='font-light text-xs text-[#000000E5]'>Total: ₦{msg?.invoice?.totalAmount}</p>
                                </div>
                              </div>
                            }
                            { msg.type === 'payment' &&
                              <div className='max-w-[300px] flex items-center gap-2 rounded-tl-xl rounded-tr-3xl rounded-bl-3xl p-3 bg-[#48AD3612]'>
                                {icons.paymentIcon}
                                <p className='text-[#000000] text-sm font-light'>{senderName} made a payment of <span className='font-medium'>₦{(msg?.payment?.amount).toLocaleString()}</span></p>
                              </div>
                            }
                             { msg.type === 'extra-charge' &&
                              <div className='max-w-[300px] flex items-center gap-2 rounded-tl-xl rounded-tr-3xl rounded-bl-3xl p-3 bg-[#48AD3612]'>
                                {icons.offerSentIcon}
                                <p className='text-[#000000] text-sm font-light'>{senderName} requested an extra charge for {msg?.extraCharge?.purpose} <span className='font-medium'>₦{(msg?.extraCharge?.amount).toLocaleString()}</span></p>
                              </div>
                            }
                            { msg.type === 'offer' && msg.offer.status === 'sent' &&
                              <div className='max-w-[300px] flex items-center gap-2 rounded-tl-xl rounded-tr-3xl rounded-bl-3xl p-3 bg-[#3652AD12]'>
                                {icons.offerSentIcon}
                                <p className='text-[#000000] text-sm font-light'>{senderName} sent an offer of <span className='font-medium'>₦{(msg?.offer?.amount).toLocaleString()}</span></p>
                              </div>
                            }
                            { msg.type === 'offer' && msg.offer.status === 'accepted' &&
                              <div className='max-w-[300px] flex items-center gap-2 rounded-tl-xl rounded-tr-3xl rounded-bl-3xl p-3 bg-[#48AD361A]'>
                                {icons.acceptedOfferIcon}
                                <p className='text-[#000000] text-sm font-light'>{senderName} accepted the offer of <span className='font-medium'>₦{(msg?.offer?.amount).toLocaleString()}</span></p>
                              </div>
                            }
                            { msg.type === 'offer' && msg.offer.status === 'declined' &&
                              <div className='max-w-[300px] flex items-center gap-2 rounded-tl-xl rounded-tr-3xl rounded-bl-3xl p-3 bg-[#CE24241A]'>
                                {icons.declinedOfferIcon}
                                <div>
                                  <p className='text-[#000000] text-sm font-light'>{senderName} declined the offer of <span className='font-medium'>₦{(msg?.offer?.amount).toLocaleString()}</span></p>
                                  {msg?.offer?.bestPrice && <p className='text-[#000000] text-sm font-light'>Best Price: <span className='font-medium'>₦{(msg.offer.bestPrice).toLocaleString()}</span></p>}
                                </div>
                              </div>
                            }
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
                            { msg.type === 'text' &&
                              <div className='max-w-[300px] rounded-tl-xl rounded-tr-3xl rounded-bl-3xl py-2 px-3 bg-[#EDF4FF]'>
                              <p className='font-light text-base text-[#000000]'>{msg.text}</p>
                            </div>
                            }
                            { msg.type === 'invoice' &&
                              <div className='max-w-[300px] flex flex-col gap-2 rounded-tl-xl rounded-tr-3xl rounded-bl-3xl p-3 bg-[#48AD3612]'>
                                <div className='flex items-center gap-3 pb-2 border-b border-[#3652AD1A]'>
                                  {icons.invoiceIcon}
                                  <p className='text-[#000000] text-sm font-light'>{senderName} sent an invoice <span className='font-medium'>₦{(msg?.invoice?.totalAmount).toLocaleString()}</span></p>
                                </div>
                                <div className='flex flex-col gap-2 pb-2 border-b border-[#3652AD1A]'>
                                  <p className='font-normal text-sm text-[#000000CC]'>Product Details</p>
                                  <p className='font-light text-xs text-[#000000E5]'>{chatData?.chat?.product?.name || 'price per unit'}: ₦{msg?.invoice?.productPricePerUnit}</p>
                                  <p className='font-light text-xs text-[#000000E5]'>Qty: {msg?.invoice?.quantity}</p>
                                </div>
                                <div className='flex flex-col gap-2 pb-2'>
                                  <p className='font-normal text-sm text-[#000000CC]'>Summary</p>
                                  <p className='font-light text-xs text-[#000000E5]'>Sub-total: ₦{(msg?.invoice?.productPricePerUnit * msg?.invoice?.quantity) || 0}</p>
                                  <p className='font-light text-xs text-[#000000E5]'>Delivery Fee: ₦{msg?.invoice?.deliveryFee || 0}</p>
                                  <p className='font-light text-xs text-[#000000E5]'>Total: ₦{msg?.invoice?.totalAmount}</p>
                                </div>
                              </div>
                            }
                            { msg.type === 'extra-charge' &&
                              <div className='max-w-[300px] flex items-center gap-2 rounded-tl-xl rounded-tr-3xl rounded-bl-3xl p-3 bg-[#48AD3612]'>
                                {icons.offerSentIcon}
                                <p className='text-[#000000] text-sm font-light'>{senderName} requested an extra charge for {msg?.extraCharge?.purpose} <span className='font-medium'>₦{(msg?.extraCharge?.amount).toLocaleString()}</span></p>
                              </div>
                            }
                            { msg.type === 'payment' &&
                              <div className='max-w-[300px] flex items-center gap-2 rounded-tl-xl rounded-tr-3xl rounded-bl-3xl p-3 bg-[#48AD3612]'>
                                {icons.paymentIcon}
                                <p className='text-[#000000] text-sm font-light'>{senderName} made a payment of <span className='font-medium'>₦{(msg?.payment?.amount).toLocaleString()}</span></p>
                              </div>
                            }
                            { msg.type === 'offer' && msg.offer.status === 'sent' &&
                              <div className='max-w-[300px] flex items-center gap-2 rounded-tl-xl rounded-tr-3xl rounded-bl-3xl p-3 bg-[#3652AD12]'>
                                {icons.offerSentIcon}
                                <p className='text-[#000000] text-sm font-light'>{senderName} sent an offer of <span className='font-medium'>₦{(msg?.offer?.amount).toLocaleString()}</span></p>
                              </div>
                            }
                            { msg.type === 'offer' && msg.offer.status === 'accepted' &&
                              <div className='max-w-[300px] flex items-center gap-2 rounded-tl-xl rounded-tr-3xl rounded-bl-3xl p-3 bg-[#48AD361A]'>
                                {icons.acceptedOfferIcon}
                                <p className='text-[#000000] text-sm font-light'>{senderName} accepted the offer of <span className='font-medium'>₦{(msg?.offer?.amount).toLocaleString()}</span></p>
                              </div>
                            }
                            { msg.type === 'offer' && msg.offer.status === 'declined' &&
                              <div className='max-w-[300px] flex items-center gap-2 rounded-tl-xl rounded-tr-3xl rounded-bl-3xl p-3 bg-[#CE24241A]'>
                                {icons.declinedOfferIcon}
                                <div>
                                  <p className='text-[#000000] text-sm font-light'>{senderName} declined the offer of <span className='font-medium'>₦{(msg?.offer?.amount).toLocaleString()}</span></p>
                                  <p className='text-[#000000] text-sm font-light'>Best Price: <span className='font-medium'>₦{(msg?.offer?.bestPrice).toLocaleString()}</span></p>
                                </div>
                              </div>
                            }
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
                            {msg.type === 'text' &&
                              <div className='max-w-[500px] rounded-xl py-2 px-3 bg-[#F5ECE1] border border-[#F3ECE3]'>
                                <p className='font-light text-base text-[#000000]'>{msg.text}</p>
                              </div>
                            }
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

const icons = {
  offerSentIcon : <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_4994_9560)">
<rect x="8" y="7" width="36" height="36" rx="18" fill="#3652AD"/>
<rect x="8.5" y="7.5" width="35" height="35" rx="17.5" stroke="#619BF6" stroke-opacity="0.05"/>
<path d="M25.9963 29.35C25.4396 29.35 24.9646 29.1521 24.5713 28.7563C24.1779 28.3604 23.9813 27.8842 23.9813 27.3275C23.9813 26.7708 24.1792 26.2958 24.575 25.9025C24.9708 25.5092 25.4475 25.3125 26.005 25.3125C26.5625 25.3125 27.0375 25.5108 27.43 25.9075C27.8225 26.3042 28.0192 26.7804 28.02 27.3363C28.0208 27.8921 27.8225 28.3671 27.425 28.7612C27.0275 29.1554 26.5512 29.3521 25.9963 29.3512M21.4688 19.6875H30.5312L32.125 16.4512C32.3017 16.1154 32.2942 15.7896 32.1025 15.4738C31.9108 15.1579 31.6233 15 31.24 15H20.76C20.3767 15 20.0892 15.1579 19.8975 15.4738C19.7058 15.7896 19.6983 16.1158 19.875 16.4525L21.4688 19.6875ZM21.7887 35H30.2113C31.8196 35 33.1863 34.4371 34.3113 33.3113C35.4371 32.1854 36 30.8162 36 29.2037C36 28.5304 35.8846 27.8746 35.6537 27.2362C35.4229 26.5979 35.0896 26.0167 34.6538 25.4925L30.8512 20.9375H21.1488L17.3463 25.4925C16.9104 26.0167 16.5771 26.5979 16.3462 27.2362C16.1154 27.8737 16 28.5296 16 29.2037C16 30.8162 16.5629 32.1854 17.6887 33.3113C18.8146 34.4371 20.1812 35 21.7887 35Z" fill="white"/>
</g>
<defs>
<filter id="filter0_d_4994_9560" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.242951 0 0 0 0 0.328763 0 0 0 0 0.828469 0 0 0 0.04 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4994_9560"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4994_9560" result="shape"/>
</filter>
</defs>
</svg>, 

declinedOfferIcon: <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_4994_8875)">
<rect x="8" y="7" width="36" height="36" rx="18" fill="#CE2424"/>
<rect x="8.5" y="7.5" width="35" height="35" rx="17.5" stroke="#619BF6" stroke-opacity="0.05"/>
<path d="M26 26.4L28.9 29.3C29.0833 29.4833 29.3167 29.575 29.6 29.575C29.8833 29.575 30.1167 29.4833 30.3 29.3C30.4833 29.1167 30.575 28.8833 30.575 28.6C30.575 28.3167 30.4833 28.0833 30.3 27.9L27.4 25L30.3 22.1C30.4833 21.9167 30.575 21.6833 30.575 21.4C30.575 21.1167 30.4833 20.8833 30.3 20.7C30.1167 20.5167 29.8833 20.425 29.6 20.425C29.3167 20.425 29.0833 20.5167 28.9 20.7L26 23.6L23.1 20.7C22.9167 20.5167 22.6833 20.425 22.4 20.425C22.1167 20.425 21.8833 20.5167 21.7 20.7C21.5167 20.8833 21.425 21.1167 21.425 21.4C21.425 21.6833 21.5167 21.9167 21.7 22.1L24.6 25L21.7 27.9C21.5167 28.0833 21.425 28.3167 21.425 28.6C21.425 28.8833 21.5167 29.1167 21.7 29.3C21.8833 29.4833 22.1167 29.575 22.4 29.575C22.6833 29.575 22.9167 29.4833 23.1 29.3L26 26.4ZM26 35C24.6167 35 23.3167 34.7373 22.1 34.212C20.8833 33.6867 19.825 32.9743 18.925 32.075C18.025 31.1757 17.3127 30.1173 16.788 28.9C16.2633 27.6827 16.0007 26.3827 16 25C15.9993 23.6173 16.262 22.3173 16.788 21.1C17.314 19.8827 18.0263 18.8243 18.925 17.925C19.8237 17.0257 20.882 16.3133 22.1 15.788C23.318 15.2627 24.618 15 26 15C27.382 15 28.682 15.2627 29.9 15.788C31.118 16.3133 32.1763 17.0257 33.075 17.925C33.9737 18.8243 34.6863 19.8827 35.213 21.1C35.7397 22.3173 36.002 23.6173 36 25C35.998 26.3827 35.7353 27.6827 35.212 28.9C34.6887 30.1173 33.9763 31.1757 33.075 32.075C32.1737 32.9743 31.1153 33.687 29.9 34.213C28.6847 34.739 27.3847 35.0013 26 35Z" fill="white"/>
</g>
<defs>
<filter id="filter0_d_4994_8875" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.242951 0 0 0 0 0.328763 0 0 0 0 0.828469 0 0 0 0.04 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4994_8875"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4994_8875" result="shape"/>
</filter>
</defs>
</svg>,

acceptedOfferIcon: <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_4994_9124)">
<rect x="8" y="7" width="36" height="36" rx="18" fill="#48AD36"/>
<rect x="8.5" y="7.5" width="35" height="35" rx="17.5" stroke="#619BF6" stroke-opacity="0.05"/>
<path d="M25.9963 29.35C25.4396 29.35 24.9646 29.1521 24.5713 28.7563C24.1779 28.3604 23.9813 27.8842 23.9813 27.3275C23.9813 26.7708 24.1792 26.2958 24.575 25.9025C24.9708 25.5092 25.4475 25.3125 26.005 25.3125C26.5625 25.3125 27.0375 25.5108 27.43 25.9075C27.8225 26.3042 28.0192 26.7804 28.02 27.3363C28.0208 27.8921 27.8225 28.3671 27.425 28.7612C27.0275 29.1554 26.5512 29.3521 25.9963 29.3512M21.4688 19.6875H30.5312L32.125 16.4512C32.3017 16.1154 32.2942 15.7896 32.1025 15.4738C31.9108 15.1579 31.6233 15 31.24 15H20.76C20.3767 15 20.0892 15.1579 19.8975 15.4738C19.7058 15.7896 19.6983 16.1158 19.875 16.4525L21.4688 19.6875ZM21.7887 35H30.2113C31.8196 35 33.1863 34.4371 34.3113 33.3113C35.4371 32.1854 36 30.8162 36 29.2037C36 28.5304 35.8846 27.8746 35.6537 27.2362C35.4229 26.5979 35.0896 26.0167 34.6538 25.4925L30.8512 20.9375H21.1488L17.3463 25.4925C16.9104 26.0167 16.5771 26.5979 16.3462 27.2362C16.1154 27.8737 16 28.5296 16 29.2037C16 30.8162 16.5629 32.1854 17.6887 33.3113C18.8146 34.4371 20.1812 35 21.7887 35Z" fill="white"/>
</g>
<defs>
<filter id="filter0_d_4994_9124" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.242951 0 0 0 0 0.328763 0 0 0 0 0.828469 0 0 0 0.04 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4994_9124"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4994_9124" result="shape"/>
</filter>
</defs>
</svg>,
paymentIcon: <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_4994_9370)">
<rect x="8" y="7" width="36" height="36" rx="18" fill="#48AD36"/>
<rect x="8.5" y="7.5" width="35" height="35" rx="17.5" stroke="#619BF6" stroke-opacity="0.05"/>
<path d="M26.7 15.8C26.3 15.4 25.7 15.4 25.3 15.8L19.3 21.8C18.9 22.2 18.9 22.8 19.3 23.2C19.5 23.4 19.75 23.5 20 23.5C20.25 23.5 20.5 23.4 20.7 23.2L26.7 17.2C27.1 16.8 27.1 16.2 26.7 15.8Z" fill="white"/>
<path d="M32.7 21.8L26.7 15.8C26.3 15.4 25.7 15.4 25.3 15.8C24.9 16.2 24.9 16.8 25.3 17.2L31.3 23.2C31.5 23.4 31.75 23.5 32 23.5C32.25 23.5 32.5 23.4 32.7 23.2C33.1 22.8 33.1 22.2 32.7 21.8Z" fill="white"/>
<path d="M32.7 33.5H19.3C18.8 33.5 18.4 33.15 18.3 32.7L16.5 23.5H35.5L33.65 32.7C33.55 33.15 33.15 33.5 32.7 33.5Z" fill="white"/>
<path d="M35.5 24.5H16.5C15.95 24.5 15.5 24.05 15.5 23.5V22.5C15.5 21.95 15.95 21.5 16.5 21.5H35.5C36.05 21.5 36.5 21.95 36.5 22.5V23.5C36.5 24.05 36.05 24.5 35.5 24.5Z" fill="white"/>
<path d="M29.4 25.3999L25.45 29.3499L23.6 27.4499L22.5 28.5499L25.45 31.4999L30.5 26.4499L29.4 25.3999Z" fill="#86AA5D"/>
</g>
<defs>
<filter id="filter0_d_4994_9370" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.242951 0 0 0 0 0.328763 0 0 0 0 0.828469 0 0 0 0.04 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4994_9370"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4994_9370" result="shape"/>
</filter>
</defs>
</svg>,

invoiceIcon: <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_4994_9392)">
<rect x="8" y="7" width="36" height="36" rx="18" fill="#3652AD"/>
<rect x="8.5" y="7.5" width="35" height="35" rx="17.5" stroke="#619BF6" stroke-opacity="0.05"/>
<path d="M26.7 15.8C26.3 15.4 25.7 15.4 25.3 15.8L19.3 21.8C18.9 22.2 18.9 22.8 19.3 23.2C19.5 23.4 19.75 23.5 20 23.5C20.25 23.5 20.5 23.4 20.7 23.2L26.7 17.2C27.1 16.8 27.1 16.2 26.7 15.8Z" fill="white"/>
<path d="M32.7 21.8L26.7 15.8C26.3 15.4 25.7 15.4 25.3 15.8C24.9 16.2 24.9 16.8 25.3 17.2L31.3 23.2C31.5 23.4 31.75 23.5 32 23.5C32.25 23.5 32.5 23.4 32.7 23.2C33.1 22.8 33.1 22.2 32.7 21.8Z" fill="white"/>
<path d="M32.7 33.5H19.3C18.8 33.5 18.4 33.15 18.3 32.7L16.5 23.5H35.5L33.65 32.7C33.55 33.15 33.15 33.5 32.7 33.5Z" fill="white"/>
<path d="M35.5 24.5H16.5C15.95 24.5 15.5 24.05 15.5 23.5V22.5C15.5 21.95 15.95 21.5 16.5 21.5H35.5C36.05 21.5 36.5 21.95 36.5 22.5V23.5C36.5 24.05 36.05 24.5 35.5 24.5Z" fill="white"/>
<path d="M29.4 25.4L25.45 29.35L23.6 27.45L22.5 28.55L25.45 31.5L30.5 26.45L29.4 25.4Z" fill="#86AA5D"/>
</g>
<defs>
<filter id="filter0_d_4994_9392" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.242951 0 0 0 0 0.328763 0 0 0 0 0.828469 0 0 0 0.04 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4994_9392"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4994_9392" result="shape"/>
</filter>
</defs>
</svg>
}


