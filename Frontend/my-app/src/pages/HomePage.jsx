import React from 'react';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Login from '../component/Authentication/Login.jsx';
import Signup from '../component/Authentication/Signup.jsx'
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react';

const HomePage = () => {
  const [user, setUser] = useState();

  //If user is already logged in redirect to chats page
   const navigate = useNavigate();
   useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        setUser(user);

        //if user not loggedin
        if (user) {
            navigate('/chats'); 
        }
    }, [navigate]);
   


  const [selectedTab, setSelectedTab] = useState(0);

  return (
  
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: 4,
        }}
      >
        {/* Wrap both boxes in a column flex container */}
        <Box
          sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, // spacing between first and second box
          }}
        >
          {/* First Box */}
            <Box
              sx={{
                height: '40px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: 5,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Lora", serif',
                  fontSize:'18px',
                  color: 'black',
                }}
              >
                ChaterTalks 
              </Typography>
            </Box>

          {/* Second Box (just below the first one) */}
            <Box
              sx={{
                width: '400px', bgcolor: 'white', height: '450px', borderRadius: 2, boxShadow: 5,
              }}
            >
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' ,paddingTop: 1 }}>
                    <Tabs value={selectedTab} onChange={(e,val) => setSelectedTab(val)}  aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'transparent' }}>
                      <TabList
                        disableUnderline
                        sx={{
                          p: 0.5, gap: 0.5,  borderRadius: 'xl', bgcolor: 'background.level1', alignItems:'center',
                          [`& .${tabClasses.root}[aria-selected="true"]`]: {
                            boxShadow: 'sm',
                            bgcolor: 'background.surface',
                          },
                        }}
                      >
                        <Tab  disableIndicator  >Login</Tab>
                        <Tab  disableIndicator >SignUp/New User</Tab>
                      </TabList>
                      <TabPanel value={0}>
                          <Login />
                          </TabPanel>
                          <TabPanel value={1}>
                          <Signup />
                      </TabPanel>
                    </Tabs>
                </Box> 
            </Box>
        </Box>
      </Box>
    
  );
};

export default HomePage;
