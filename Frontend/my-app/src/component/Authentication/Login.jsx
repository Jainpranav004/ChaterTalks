import React from 'react'
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { Alert, Box, Button, FormControl, FormLabel, IconButton, Input , InputAdornment, Snackbar} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Login = () => {
   
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const navigate = useNavigate();


  //SnackBar states
  const [snackbarOpen, setsnackbarOpen] = useState(false);
  const [snackbarMsg, setsnackbarMsg] = useState("");
  const [snackbarSeverity, setsnackbarSeverity] = useState("Success");
  const handleSnackBarClose = () => setsnackbarOpen(false);



  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePw = () => setShowPassword(!showPassword);


   const submitHandler = async () => {
    if (!name || !email || !password ) {
      setsnackbarMsg("Please fill all req. fields");
      setsnackbarSeverity("error");
      setsnackbarOpen(true);
      return;
    }

    //submit form with cloudinary url
    console.log({ name, email, password});

    //For feeding the respionse data in mongodb
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/user/login", 
        { name, email, password}, config);
      
          setsnackbarMsg("Registration Successful !");
          setsnackbarSeverity("success");
          setsnackbarOpen(true);
      
       localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/chats");
          setsnackbarMsg("Login Successful !");
          setsnackbarSeverity("success");
          setsnackbarOpen(true);

    } catch (error){
        setsnackbarMsg(error.response.data.message);
        setsnackbarSeverity("Error!");
        setsnackbarOpen(true);
    }
  }



  return (
   <>

      <Stack spacing={2}>
          <FormControl id="first-name" color ="black" required >
              <FormLabel sx={{fontWeight:"bold" , color:"black" }}>Name </FormLabel>
              <Box sx={{border:"black", bgcolor:"#eaeded" , borderRadius:"5px"}}>
                <Input placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} />
              </Box>
            </FormControl>
            
            <FormControl id="email" color ="black" required >
              <FormLabel sx={{fontWeight:"bold", color:"black" }}>Email</FormLabel>
              <Box sx={{border:"black", bgcolor:"#eaeded" , borderRadius:"5px"}}>
              <Input placeholder='Enter Email Id' onChange={(e) => setEmail(e.target.value)} />
              </Box>
            </FormControl>
      

          <FormControl id="password" color ="black" required >
            <FormLabel sx={{fontWeight:"bold", color:"black" }}>Password </FormLabel>
            <Box sx={{border:"black", bgcolor:"#eaeded" , borderRadius:"5px"}}>
            <Input type={showPassword ? 'text' : 'password'}
             placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} 
              endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePw} sx={{paddingLeft:"30px"}} edge="end">
                    {showPassword ? <VisibilityOff/> : <Visibility/> }
                </IconButton>
                </InputAdornment>
                
            }
             />
            </Box>
          </FormControl>
           
      <Button variant="contained" onClick={submitHandler}>Login</Button>
      
        
              <Button variant="contained" sx={{ bgcolor: "red", width: '100%' }} 
                  onClick={() => {
                    setEmail("janinapranv02@gmail.com");
                    setPassword("123456@@");
                  }}>Get User Credentials</Button>
          

    </Stack>
    

           <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={handleSnackBarClose}
        //     isLoading = {loading}     //isLoading is not a function in material ui so this feature is not implemented
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert onClose={ handleSnackBarClose } severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMsg}
            </Alert>
          </Snackbar>
    
    </>
  )
}

export default Login
