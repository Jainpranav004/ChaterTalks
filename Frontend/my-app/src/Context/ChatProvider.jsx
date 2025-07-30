//This file is a global context to manage chat related data ,
//also ensures user to redirectto "/" if not logged in


import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [selectedChat, setSelectedChat] = useState();
       //Populate all chats in this
    const [chats, setChats] = useState([]);
    //Add loading state (when data is loaded from localstorage ,reduce the sort delay bythis)
    const [loading, setLoading] = useState(true);


    //Runs on page load to get user data from local storage
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        //if user not loggedin
        if (!userInfo) {
            navigate('/'); 
        } else {
            setUser(userInfo);
        }
        setLoading(false);

    }, [navigate]);

    if (loading) return <div>Loading ...</div>;

    return <ChatContext.Provider value={{user , setUser ,selectedChat, setSelectedChat ,chats, setChats}}>
        {children}
    </ChatContext.Provider>
    
};

//Shortcut to use ChatContext anywhere
export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;