import React from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { Box } from '@mui/material';
import SingleChat from './SingleChat';
import { useState } from 'react';


const ChatBox = ({ fetchAgain, setFetchAgain }) => {

  const { selectedChat } = ChatState();


  return (
    <>
      <Box sx={{
        display: { xs: selectedChat ? "flex" : "none", md: "flex" },
        alignItems: "center", flexDirection: "column", p: 3, bgcolor: "white",
        width: { xs: "100%", md: "68%" }, borderRadius: "10px", borderWidth: "1px",
        boxShadow: 2,
      }}
      >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </>
  )
}

export default ChatBox
