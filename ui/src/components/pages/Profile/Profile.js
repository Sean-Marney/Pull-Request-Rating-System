import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import DeleteIcon from '@mui/icons-material/Delete';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import Container from "@mui/material/Container";
import { makeStyles } from "@material-ui/core";
import axios from "axios";

export default function ManageProfiles() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cookies] = useCookies();

  //Get user on page load
  useEffect(() => {
    getUserByEmail();
  }, []);

  const getUserByEmail = async () => {
    //Get user by id
    const res = await axios.get(
      `http://localhost:8000/management/users/email/${cookies.user.email}`
    );

    //Set to state
    setUser(res.data);
  };
  return (
    <div>
      <Container>
      <Box padding={3}>
        <h2>Profile</h2>
      </Box>
      {user && (
        <div>
          <Stack direction="row" spacing={2}>
            <Avatar />
            <Card >
              <h3>Name : {user.name}</h3>
              <h3>Role : {user.hasRole}</h3>
              <h3>Email : {user.email}</h3>
              <h3>Total stars Recived : {user.stars}</h3>
            </Card>
          </Stack>

          {/* bio */}
        <Card  
        component="div"
        sx={{
          whiteSpace: 'normal',
          my: 2,
          p: 1,
          orientation: 'vertical',
          // maxWidth: '100%', 
          overflow: 'auto',
          bgcolor: (theme) =>
            theme.palette.mode === 'white' ? '#101010' : 'white.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          borderRadius: 2,
          fontSize: '0.975rem',
          fontWeight: '700',
        }}
        >
        <h3>Bio :</h3> 
        {user.bio}
        </Card>

        {/* rewards */}
        <Card>
          <h4>Rewards Gotten</h4>
          table
        </Card>

        {/* Edit button  */}
        <Button onClick={() => navigate("/profile/update")} startIcon={<EditIcon />}>
          Edit Profile
        </Button>
       
       {/* Change password button  */}
      <Button onClick={() => navigate("/profile/password")} startIcon={<SyncLockIcon />}>
        Change password
      </Button>
      <br></br>

      {/* delete account button  */}
      <Button  onClick={() => navigate("/login")} startIcon={<DeleteIcon />} style={{ color: "red" }}>
        Delete Account
      </Button>
      {/* </Stack> */}
      {/* </Box> */}
        </div>
      )}
      </Container>
    </div>
  );
}
