import * as React from 'react';
import { useState } from 'react'

import { Box, Button, TextField, List } from '@mui/material';
import { Drawer } from '@mui/material';  
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { InputAdornment, Typography ,Input} from '@mui/material';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserListItem';
import { ChatState } from '../../../Context/ChatProvider';


export default function SDrawer({isOpen , onClose}) {
  
     const [search, setSearch] = useState("");
     const [searchResult, setSearchResult] = useState([]);
     const [loading, setLoading] = useState(false);
     const [loadingResult, setLoadingResult] = useState();
     const { user, setSelectedChat, chats, setChats } = ChatState();
     
  
  //SnackBar states
  const [snackbarOpen, setsnackbarOpen] = useState(false);
  const [snackbarMsg, setsnackbarMsg] = useState("");
  const [snackbarSeverity, setsnackbarSeverity] = useState("Success");
  const handleSnackBarClose = () => setsnackbarOpen(false);


  const accessChat = async (userId) => {
      try {
        setLoadingResult(true);
         const config = {
           headers: {
             "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }; 
        const { data } = await axios.post("/api/chat", { userId }, config);
        setSelectedChat(data);
        setLoadingResult(false);
        onClose();
        
      } catch (error) {
          setsnackbarMsg("Error Fetching the chat");
          setsnackbarSeverity("error");
          setsnackbarOpen(true);
      }
   }

  const handleSearch = async() => {
    if (!search) {
      setsnackbarMsg("Please fill the req. fields");
      setsnackbarSeverity("error");
      setsnackbarOpen(true);
    }
    try {

      setLoading(true);

      //Send JWT Token
      const user = JSON.parse(localStorage.getItem("userInfo"));

       const config = {
         headers: {
           Authorization: `Bearer ${user.token}`,
         },
       };
       const { data } = await axios.get(`/api/user?search=${search}`, config)
      setLoading(false);
      setSearchResult(data);
       
    } catch (error) {
      setsnackbarMsg("Error Occurred");
      setsnackbarSeverity("error");
      setsnackbarOpen(true);
    }
  }


  const drawerContent = (
    <Box sx={{width:300}} role="presentation" >
      <List disablePadding>
        <Typography sx={{display:"flex" ,fontFamily:"work-sans" ,paddingLeft:"13px", pt:1}}>Search Users</Typography>
          <Box display="flex" gap={1.5} alignItems={"center"} pt={1}>
            <TextField value={search} size='small' variant='outlined' placeholder='Search here..' sx={{ width: "200px" , ml:1 }} onChange={(e) => setSearch(e.target.value)}/>
            <Button  variant="contained" onClick={handleSearch}>Go</Button>
          </Box>
      </List>
      
      <ListItem disablePadding sx={{width:"100%"}}>
          {loading ? (
            <ChatLoading />
        ) : (
            <Box sx={{ width: "100%", p:1, pt:2 }} >
              {searchResult?.map((user) => (
                <Box key={user._id}>
                <UserListItem
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
                </Box>
              ))}
            </Box>
          )}
      </ListItem>
        
    
        
      <Divider />
      
      
      <List>
       
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
               
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
       
      </List>

        <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackBarClose}
              //     isLoading = {loading}     //isLoading is not a function in material ui so this feature is not implemented
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  >
                    <Alert onClose={ handleSnackBarClose }  severity={snackbarSeverity} sx={{ width: '50%' }}>
                    {snackbarMsg}
                  </Alert>
      </Snackbar>
      

    </Box>
  );

  return (
    <div>
       <Drawer anchor="left" open={isOpen} onClose={onClose}>
          {drawerContent}
       </Drawer>
    </div>
  );
}