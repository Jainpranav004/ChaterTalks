
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { ChatState } from '../../../Context/ChatProvider';
import { useState } from 'react';
import UserBadgeItem from './UserBadgeItem';
import { Input, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const UpdateGroupChatModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const { user, selectedChat, setSelectedChat } = ChatState();

    const handleRemove = () => { }


    const handleRenameGroup = async () => {

    }



    const handleSearch = () => { }

    return (
        <div>
            <Box sx={{ borderRadius: "10px" }}>
                <IconButton onClick={handleOpen} sx={{ display: { xs: "flex" }, color: "#007bff", ml: 2 }}>  <InfoIcon /> </IconButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2"
                            sx={{ fontFamily: "work sans", display: "flex", justifyContent: "center", fontSize: "35px" }}>
                            {selectedChat.chatName}
                        </Typography>
                        <Box>
                            {selectedChat.users.map((u) => (
                                <UserBadgeItem key={u._id} user={u} handleFunction={() => handleRemove(u)} />
                            ))}
                        </Box>


                        <Box sx={{ mt: 2, display: "flex", gap: 1, mt: 2, alignItems: "center" }} >
                            <TextField placeholder='Chat Name' value={groupChatName} sx={{ mb: 3, flex: 1 }} onChange={(e) => setGroupChatName(e.target.value)} size='small' />
                            <Button sx={{ mb: 3 }} variant="contained" color='success' onClick={() => handleRenameGroup()} disabled={renameLoading} width="30%">
                                Update
                            </Button>
                        </Box>

                        <Box sx={{ gap: 1, display: "flex", alignItems: "center" }} >
                            <TextField placeholder='Add user to group' value={groupChatName} sx={{ mb: 3, flex: 1 }} onChange={(e) => setGroupChatName(e.target.value)} size='small' />

                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "end", borderRadius: "10px" }}>
                            <Button onClick={() => handleRemove(user)} color="error" sx={{ display: "flex", justifyContent: "center", justifyItems: "center" }} variant='contained'>
                                Leave Group
                            </Button>
                        </Box>





                        {/* Add Close button */}
                    </Box>
                </Modal>
            </Box >
        </div >

    )
}

export default UpdateGroupChatModal
