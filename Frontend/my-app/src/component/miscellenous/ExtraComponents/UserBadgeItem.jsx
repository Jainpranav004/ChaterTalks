import { Margin } from '@mui/icons-material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';

const UserBadgeItem = ({ user, handleFunction }) => {
    return (
        <>
            <Box
                sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    bgcolor: "#e0f7fa",
                    color: "#0c2265ff",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    mr: 1,
                    mb: 1,
                }}
            >
                {user.name}
                <CloseIcon
                    onClick={handleFunction}
                    sx={{ pl: 0.5, cursor: "pointer", color: "#1a0a53ff" }}
                />
            </Box>

        </>
    )
}

export default UserBadgeItem
