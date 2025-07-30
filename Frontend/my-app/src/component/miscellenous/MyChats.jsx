import React, { useEffect } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import { useState } from 'react';
import { Box, Alert } from '@mui/material';
import { base } from 'framer-motion/client';

const MyChats = () => {
 
    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat,user , chats, setChats } = ChatState();

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
      console.log(data);
      setChats(data);
    } catch (error) {
      setsnackbarMsg("Error Fetching the chat");
      setsnackbarSeverity("error");
      setsnackbarOpen(true);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [])
  

  return (
    <>
      
      <Box
          sx={{
            //If screen size is reduced only chats page is displayed
            display: { base: selectedChat ? "none" : "flex", md: "flex" },
            flexDirection: "column", alignItems: "center",
            p: 3, bgcolor: "white", width: { base: "100%", md: "31%" },
            borderRadius: "lg", borderWidth: "1px"
          }}>
          <Box>
          
          </Box>   
      </Box>








            <Snackbar
                open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackBarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                <Alert onClose={ handleSnackBarClose }  severity={snackbarSeverity} sx={{ width: '50%' }}>
                   {snackbarMsg}
                </Alert>
            </Snackbar>

    </>
  )
}

export default MyChats
