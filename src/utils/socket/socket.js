import { io } from "socket.io-client";

export const initSocket = (userId) => {
  if (!userId) return null;

  const SOCKET_URL = import.meta.env.VITE_API_URL

  const socket = io(SOCKET_URL, {
    query: { userId },
    transports: ["websocket"],
  });

  return socket;
};
