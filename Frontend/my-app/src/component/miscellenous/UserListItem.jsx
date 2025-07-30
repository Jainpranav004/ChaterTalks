import React from 'react';
import { Avatar, Typography, Box, Paper } from '@mui/material';

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Paper
      onClick={handleFunction}
      elevation={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        height: "70px",
        width:'100%',
        p: 2,
        mb: 1.5,
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: '#1976d2',
          color: 'white',
          transform: 'scale(1.02)',
        },
      }}
    >
      <Avatar
        alt={user.name}
        src={user.pic}
        sx={{ width: 48, height: 48, mr: 2 }}
      />
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            {user.name}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            <b>Email:</b> {user.email}
          </Typography>
        </Box>
    </Paper>
  );
};

export default UserListItem;
