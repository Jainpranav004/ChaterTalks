import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function ProfileModal({ user, trigger }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <span onClick={handleOpen}>{trigger}</span>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {user ? (
            <>
              <Typography
                sx={{
                  fontFamily: 'work-sans',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                id="keep-mounted-modal-title"
                variant="h5"
                component="h2"
              >
                {user.name}
              </Typography>
              <img
                src={user.pic}
                alt={user.name}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'block',
                  margin: '16px auto',
                }}
              />
              <Typography
                sx={{
                  fontFamily: 'work-sans',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                variant="h6"
              >
                {user.email}
              </Typography>
            </>
          ) : (
            <Typography>No user data available.</Typography>
          )}

          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </div>
  );
}
