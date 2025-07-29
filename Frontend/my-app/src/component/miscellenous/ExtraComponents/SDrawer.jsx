import * as React from 'react';
import { useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { InputAdornment, Typography ,Input, TextField } from '@mui/material';



export default function SDrawer({isOpen , onClose}) {
  
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    console.log("Searching for:", search);
  }

  const drawerContent = (
    <Box sx={{width:250}} role="presentation" >
      <List>
        <Typography sx={{display:"flex" , paddingLeft:"13px"}}>Search Users</Typography>
          <Box display="flex" gap={1} alignItems={"center"} pt={1}>
            <TextField value={search} size='small' variant='outlined' placeholder='Search here..' sx={{ width: "200px" }} onChange={(e) => setSearch(e.target.value)}/>
            <Button variant="contained" onClick={handleSearch}>Go</Button>
          </Box>
        
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
               
              </ListItemIcon>
              <ListItemText  />
            </ListItemButton>
          </ListItem>
        
      </List>
        
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