import { Center } from '@chakra-ui/react';
import { Button, Tooltip , Box , Typography} from '@mui/material';
import { base } from 'framer-motion/client';
import React, { useState } from 'react'
import IconMenu from './ExtraComponents/IconMenu';
import ProfileMenu from './ExtraComponents/ProfileMenu'

const SideDrawer = () => {

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingResult, setLoadingResult] = useState();
 
    return (
    
    <>
        
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"Center"} width ="100%" bgcolor="white" p={"5px 10px 5px 10px"}>
                <Tooltip title="Search the User" arrow placement='bottom-end' >
                  <Button variant='text'>
                      <i className="fa-solid fa-magnifying-glass"></i>
                      <Typography sx={{display:{xs:"none", md:"flex"}}} textTransform={"none"} paddingX={"15px"}> Search User </Typography>
                  </Button>
                </Tooltip>
                <Typography sx={{ fontFamily: "work-sans", fontSize: "25px" }} >ChaterTalks</Typography>
              
                  <Box display="flex" gap={0}>
                    <IconMenu />
                    <ProfileMenu />
                  </Box>
                
      </Box> 
           

    </>


   
  )
}

export default SideDrawer
