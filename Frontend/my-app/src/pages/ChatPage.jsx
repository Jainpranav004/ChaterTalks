import { ChatState } from "../Context/ChatProvider.jsx";
import SideDrawer from "../component/miscellenous/SideDrawer";
import { Box } from "@mui/material";
import MyChats from "../component/miscellenous/MyChats.jsx";
import ChatBox from "../component/miscellenous/ChatBox.jsx";
import { useState } from 'react';

const ChatPage = () => {
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);


    return (
        <>
            <div style={{ width: "100%" }}>
                {/* If user exist then only do this*/}

                {user && <SideDrawer />}
                <Box display={"flex"} justifyContent={"space-between"} width={"100%"} height={"91.5vh"} padding={"10px"}>
                    {user && <MyChats
                        fetchAgain={fetchAgain} />}
                    {user && <ChatBox
                        fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                </Box>
            </div>




        </>
    );

};

export default ChatPage
