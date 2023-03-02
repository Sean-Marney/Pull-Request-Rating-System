import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
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
import axios from "axios";
// import { getUserByEmail } from "../../../../../api/controllers/manageUsers.controller";



export default function ManageProfiles() {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);

    const [cookies] = useCookies();
    console.log(cookies.user);

    //Get user on page load
    useEffect(() =>{
        getUserByEmail();
    }, []);

    const getUserByEmail = async () => {
        //Get user by id
        const response = await axios.get(
            `http://localhost:8000/management/users/email/:email${cookies.user.email}`
        );
        //Set to state 
        setUser(response.data.email)
    };

    

    return (
        <div>
        <Box padding={3}>
        <h2>
         Profile
        </h2>
        </Box>
        {user.map((item) => (
            <div key={item.email}>
        <Stack direction="row" spacing={2} >
        <Avatar/>
        <Paper width={800} height={160} >
        <h4>
            Name : {item.name}
        </h4>
        <h4>
            Role :
        </h4>
        <h4>
            company :
        </h4>
        <h4>
            stars :
        </h4>
        </Paper>
        </Stack>
        </div>
         ))}
        <Box padding={3}>
        <h4>
            Bio
        </h4>
        <Skeleton variant="rectangular" width={800} height={160} />
        <Button onClick={() => navigate("/profile/update")}>
            Edit Profile
        </Button>
        </Box>
        <h4>
            Rewards Gotten
        </h4>
        <Button onClick={() => navigate("/profile/password")}>
            Change password
        </Button>
        </div>
    );
}