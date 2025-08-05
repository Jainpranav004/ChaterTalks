import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { TextField, Stack, Typography, Snackbar, Alert } from "@mui/material";

import axios from "axios";
import UserListItem from "./UserListItem";
import UserBadgeItem from "./ExtraComponents/UserBadgeItem";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontFamily: "Work Sans",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

export default function GroupChatModal({ children }) {
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const [snackbarOpen, setsnackbarOpen] = useState(false);
  const [snackbarMsg, setsnackbarMsg] = useState("");
  const [snackbarSeverity, setsnackbarSeverity] = useState("success");
  const handleSnackBarClose = () => setsnackbarOpen(false);

  const { user, chats, setChats } = ChatState();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${query}`, config);

      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setsnackbarMsg("Error Fetching the chat");
      setsnackbarSeverity("error");
      setsnackbarOpen(true);
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length === 0) {
      setsnackbarMsg("Please fill all the fields");
      setsnackbarSeverity("warning");
      setsnackbarOpen(true);
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      setOpen(false); // close modal after success

      setsnackbarMsg("New Group Chat Created");
      setsnackbarSeverity("success");
      setsnackbarOpen(true);
    } catch (error) {
      setsnackbarMsg("Failed to create the group chat");
      setsnackbarSeverity("error");
      setsnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Move these functions OUTSIDE handleSubmit
  const handleDelete = (userToDelete) => {
    setSelectedUsers(
      selectedUsers.filter((sel) => sel._id !== userToDelete._id)
    );
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.find((u) => u._id === userToAdd._id)) {
      setsnackbarMsg("User already added");
      setsnackbarSeverity("warning");
      setsnackbarOpen(true);
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  return (
    <>
      <span onClick={handleOpen}>{children}</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography
            id="parent-modal-title"
            variant="h6"
            mb={2}
            fontWeight={600}
          >
            Create Group Chat
          </Typography>
          <Stack spacing={2}>
            <TextField
              size="small"
              label="Chat Name"
              variant="outlined"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />

            <TextField
              label="Add Users"
              variant="outlined"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              size="small"
            />

            <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
              {selectedUsers.map((u) => (
                <UserBadgeItem key={u._id} user={u} handleFunction={() => handleDelete(u)} />
              ))}
            </Box>




            {/* Search and Display users */}
            {loading ? (
              <div>Loading...</div>
            ) : (
              searchResult?.slice(0, 4).map((user) => <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />)
            )
            }

          </Stack>

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyItems: "center",
                mt: 2,
                border: "1px solid", borderRadius: 2,
              }}

            >
              <Button sx={{ mx: "auto", color: "Blue" }} onClick={handleSubmit}>
                Create Chat
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyItems: "center",
                mt: 2,
                border: "1px solid", borderRadius: 2,
              }}
              onClick={handleClose}
            >
              <Button sx={{ mx: "auto", color: "red" }} >
                Close
              </Button>
            </Box>
          </Box>




        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
        sx={{ zIndex: 9999 }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

