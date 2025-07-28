import React from 'react'
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { Alert, Box, Button, FormControl, FormLabel, IconButton, Input , InputAdornment , Snackbar} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signup = () => {
   
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmPw, setConfirmPw] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPw, setshowConfirmPw] = useState(false);
  


  //SnackBar states
  const [snackbarOpen, setsnackbarOpen] = useState(false);
  const [snackbarMsg, setsnackbarMsg] = useState("");
  const [snackbarSeverity, setsnackbarSeverity] = useState("Success");
  const handleSnackBarClose = () => setsnackbarOpen(false);

  const handleTogglePw = () => setShowPassword(!showPassword);
  const handleToggleConfirmPw = () => setshowConfirmPw(!showConfirmPw);

  
  //Cloudinary Upload function
  const postDetails = async(pics) => {
    setloading(true);
    if (pics == undefined) {
      setsnackbarMsg("Please select an image.");
      setsnackbarSeverity("warning");
      setsnackbarOpen(true);
      setloading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Chatertalks"); // ✅ Replace with your Cloudinary preset
      data.append("cloud_name", "dvfoed2ds"); // ✅ Replace with your Cloudinary name

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dvfoed2ds/image/upload", {
          method: "POST",
          body: data,
        });

          const result = await res.json();
           setPic(result.url.toString());
           setloading(false);

          setsnackbarMsg("Image uploaded successfully!");
          setsnackbarSeverity("success");
          setsnackbarOpen(true);
        } catch (error) {
          setsnackbarMsg("Upload failed. Try again.");
          setsnackbarSeverity("error");
          setsnackbarOpen(true);
          setloading(false);
        }
      } else {
        setsnackbarMsg("Please select a JPEG or PNG image.");
        setsnackbarSeverity("warning");
        setsnackbarOpen(true);
      }
      setloading(false);  
    };


  const submitHandler = async () => {
    if (!name || !email || !password || !confirmPw) {
      setsnackbarMsg("Please fill all req. fields");
      setsnackbarSeverity("error");
      setsnackbarOpen(true);
      return;
    }
    if (password !== confirmPw) {
      setsnackbarMsg("Password don not match");
      setsnackbarSeverity("error");
      setsnackbarOpen(true);
      return;
    }

    //submit form with cloudinary url
    console.log({ name, email, password, pic });

    //For feeding the respionse data in mongodb
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/user/signup", 
        { name, email, password, pic }, config);
      
          setsnackbarMsg("Registration Successful !");
          setsnackbarSeverity("success");
          setsnackbarOpen(true);
      
       localStorage.setItem("userInfo", JSON.stringify(data));
       navigate("/chats");

    } catch (error){
        setsnackbarMsg(error.response.data.message);
        setsnackbarSeverity("Error!");
        setsnackbarOpen(true);

    }
  }

  

  return (
    <>

      <Stack spacing={2}>
        
        <FormControl id="first-name" color="black" required >
          <FormLabel sx={{ fontWeight: "bold", color: "black" }}>Name </FormLabel>
          <Box sx={{ border: "black", bgcolor: "#eaeded", borderRadius: "5px" }}>
            <Input placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} />
          </Box>
        </FormControl>
            
        <FormControl id="email" color="black" required >
          <FormLabel sx={{ fontWeight: "bold", color: "black" }}>Email</FormLabel>
          <Box sx={{ border: "black", bgcolor: "#eaeded", borderRadius: "5px" }}>
            <Input placeholder='Enter Email Id' onChange={(e) => setEmail(e.target.value)} />
          </Box>
        </FormControl>
      

        <FormControl id="password" color="black" required >
          <FormLabel sx={{ fontWeight: "bold", color: "black" }}>Password </FormLabel>
          <Box sx={{ border: "black", bgcolor: "#eaeded", borderRadius: "5px" }}>
            <Input type={showPassword ? 'text' : 'password'}
              placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePw} sx={{ paddingLeft: "30px" }} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
                
              }
            />
          </Box>
        </FormControl>
       
        
        <FormControl id="confirmPassword" color="black" required >
          <FormLabel sx={{ fontWeight: "bold", color: "black" }}>Confirm Password</FormLabel>
          <Box sx={{ border: "black", bgcolor: "#eaeded", borderRadius: "5px" }}>
            <Input type={showConfirmPw ? 'text' : 'password'}
              placeholder='Enter Password Again' onChange={(e) => setConfirmPw(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton sx={{ paddingLeft: "30px" }} onClick={handleToggleConfirmPw} edge="end">
                    {showConfirmPw ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
        </FormControl>
          
        
        <FormControl id="pic">
          <FormLabel sx={{ fontWeight: "bold", color: "black" }}> Upload Your Picture</FormLabel>
          <Box sx={{ border: "black", bgcolor: "#eaeded", borderRadius: "5px" }}>
            <Input type='file' onChange={(e) => postDetails(e.target.files[0])}>
            </Input>
          </Box>
        </FormControl>
            
        
        <Button variant="contained" onClick={submitHandler}>SignUp</Button>
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
  );
};

export default Signup;
