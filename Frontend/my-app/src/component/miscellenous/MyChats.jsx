import React, { useEffect } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios';
import { useState } from 'react';
import { Box, Alert, Button, Typography, Stack, Snackbar } from '@mui/material';
import { base } from 'framer-motion/client';
import AddIcon from '@mui/icons-material/Add';
import ChatLoading from './ChatLoading'
import { getSender } from '../../config/ChatLogics'
import GroupChatmodal from '../miscellenous/GroupChatModal'

const MyChats = ({ fetchAgain }) => {

  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  //SnackBar states
  const [snackbarOpen, setsnackbarOpen] = useState(false);
  const [snackbarMsg, setsnackbarMsg] = useState("");
  const [snackbarSeverity, setsnackbarSeverity] = useState("Success");
  const handleSnackBarClose = () => setsnackbarOpen(false);



  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      setsnackbarMsg("Error Fetching the chat");
      setsnackbarSeverity("error");
      setsnackbarOpen(true);
    }
  };

  //fetching data from api ans sets logged user data to localstorage
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain])


  return (
    <>

      <Box
        sx={{
          //If screen size is reduced only chats page is displayed
          display: { base: selectedChat ? "none" : "flex", md: "flex" },
          flexDirection: "column", alignItems: "center",
          p: 2, bgcolor: "white", width: { xs: "100%", sm: "100%", md: "31%" },
          borderRadius: 2, overflow: 'auto ', border: "1px solid #ccc", boxShadow: 2, height: '88vh'
        }}>

        {/*HEADER*/}

        <Box sx={{
          pb: 2, px: 1, fontSize: { base: "28px", md: "30px" },
          fontFamily: "work sans", display: "flex", width: "100%",
          justifyContent: "space-between", alignItems: "center"
        }}>
          <Typography sx={{
            fontSize: { xs: '20px', sm: '22px', md: '24px' }, fontWeight: 600, fontFamily: "work-sans"
          }}>My Chats
          </Typography>

          <GroupChatmodal>
            <Button color='black' display="flex" fontSize={{ xs: "10px", sm: "12px", md: "14px" }}
              variant="contained" endIcon={<AddIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />} size='small'
              sx={{ bgcolor: "#007bff", px: 1.5, py: 0.5, '&:hover': { bgcolor: "#0056b3" } }}>New Group Chat</Button>
          </GroupChatmodal>
        </Box>


        {/*Chat List*/}
        <Box sx={{
          flex: 1, display: "flex", flexDirection: "column", p: 1, bgcolor: "#F5F5F5", width: "100%",
          height: "100%", borderRadius: 2, overflow: "auto"
        }}>
          {chats ? (
            <Stack overflowY="scroll" gap={1}>
              {chats.map((chat) => (
                <Box onClick={() => setSelectedChat(chat)} key={chat._id}
                  sx={{
                    cursor: "pointer", px: 2, py: 1.5, borderRadius: 2,
                    bgcolor: selectedChat === chat ? "#1976d2" : "#e0e0e0",
                    color: selectedChat === chat ? "white" : "black",
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: selectedChat === chat ? "#1565c0" : "d5d5d5", }
                  }}>

                  <Typography fontWeight={500} noWrap sx={{ fontSize: { xs: '14px', sm: '16px' } }}  >
                    {!chat.isGroupChat ? (loggedUser && chat.users ? getSender(loggedUser, chat.users) : "Unknown User") : chat.chatName}
                  </Typography>
                </Box>
              ))}

            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>

      </Box>


      <Snackbar
        open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackBarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
        <Alert onClose={handleSnackBarClose} severity={snackbarSeverity}
          sx={{ width: '50%' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>

    </>
  )
}

export default MyChats
