
import { ChatState } from '../../Context/ChatProvider'
import { Box, Icon, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getSender, getSenderFull } from '../../config/ChatLogics';
import ProfileModal from './ProfileModal';
import UpdateGroupChatModal from './ExtraComponents/UpdateGroupChatModal';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const { user, selectedChat, setSelectedChat } = ChatState();

    return (
        <>
            {selectedChat ? (
                <>
                    <Box sx={{ display: "flex", alignItems: "center", px: 2, pb: 3 }}>
                        <ArrowBackIcon
                            sx={{ display: { xs: "flex", md: "none" }, cursor: "pointer", mr: 2 }}
                            onClick={() => setSelectedChat("")}
                        />
                        {!selectedChat.isGroupChat ? (
                            <>
                                {getSender(user, selectedChat.users)}
                                <ProfileModal
                                    user={getSenderFull(user, selectedChat.users)}
                                    trigger={
                                        <span style={{ color: "#007bff", cursor: "pointer", fontSize: "14px" }} > View Profile</span>
                                    }
                                />
                                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                            </>
                        ) : (
                            <>
                                <Typography sx={{ fontFamily: "work-sans", fontWeight: "bold" }} variant="h6">
                                    {selectedChat.chatName.toUpperCase()}
                                </Typography>

                                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                            </>

                        )}
                    </Box>
                    <Typography></Typography>
                    <Box sx={{
                        display: "flex", flexDirection: "coloumn", height: "100%", width: "100%", bgcolor: "#E8E8E8", borderRadius: "10px", p: 3, justifyContent
                            : "flex-end", overflow: "hidden"
                    }}>
                        {/* Chat messages will be displayed here */}
                    </Box>




                </>
            ) : (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography variant="h6" sx={{ color: grey[700], fontFamily: "work sans" }}>
                        Click on a chat to start chatting
                    </Typography>
                </Box>
            )}
        </>
    );
}

export default SingleChat
