import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';

// const useStyles = makeStyles((theme) => ({
//     Box: {
//         width: 300,
//         height: 300,
//         backgroundColor: 'primary.dark'
//     }
// }));

export default function ManageProfiles() {

    return (
        <div>
        <Box padding={3}>
        <h2>
            Manage Profile
        </h2>
        </Box>
        <Box padding={3}>
        <h4>
            Name
        </h4>
        <h4>
            Status
        </h4>
        <h4>
            company
        </h4>
        </Box>
        <Box padding={3}>
        <h4>
            bio
        </h4>
        </Box>
        <Box padding={3}>
        <h4>
            stars Aquired 
        </h4>
        </Box>
        <Box padding={3}>
        <h4>
            Rewards Gotten
        </h4>
        </Box>
        <Box padding={3}>
        <h4>
            Change password
        </h4>
        </Box>
        </div>
    );
}