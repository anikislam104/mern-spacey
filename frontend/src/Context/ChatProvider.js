import {createContext, useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({children}) => {
  const [notification1, setNotification1] = useState([]);
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  const [hostId, setHostId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    console.log(user);
    // if (!userInfo) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        hostId,
        setHostId,
        notification1,
        setNotification1,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};


export const ChatState = () => {
  return useContext(ChatContext);
}
export default ChatProvider;