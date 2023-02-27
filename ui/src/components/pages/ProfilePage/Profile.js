import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import {
    makeStyles,
} from "@material-ui/core";



export default function ManageProfiles() {
    const navigate = useNavigate();

    return (
        <div>
            <Container fixed>
        <Box padding={3}>
        <h2>
            Manage Profile
        </h2>
        </Box>
        <Stack direction="row" spacing={2} >
        <Avatar/>
        <Paper width={800} height={160} >
        <h4>
            Name
        </h4>
        <h4>
            Status
        </h4>
        <h4>
            company
        </h4>
        <h4>
            stars 
        </h4>
        </Paper>
        </Stack>
        <Box padding={3}>
        <h4>
            Bio
        </h4>
        <Skeleton variant="rectangular" width={800} height={160} />
        <Button onClick={() => navigate("/profile/bio")}>
            Edit Profile
        </Button>
        </Box>
        <h4>
            Rewards Gotten
        </h4>
        <Button>
            Change password
        </Button>
        </Container>
        </div>
    );
}