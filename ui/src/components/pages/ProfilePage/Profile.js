import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
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
      <Box padding={3}>
        <h2>Profile</h2>
      </Box>
      {user && (
        <div>
          <Stack direction="row" spacing={2}>
            <Avatar />
            <Paper width={800} height={160}>
              <h4>Name : {user.name}</h4>
              <h4>Role : {user.hasRole}</h4>
              <h4>Email : {user.email}</h4>
              <h4>Total stars Recived : {user.stars}</h4>
            </Paper>
          </Stack>

          {/* bio */}
          <Box padding={3}>
        <h4>Bio</h4>
        <Skeleton variant="rectangular" width={800} height={160} />
        {/* Bio box */}
        <box>
        <h4>Bio : {user.bio}</h4>
        </box>
        <Button onClick={() => navigate("/profile/update")}>
          Edit Profile
        </Button>

        {/* rewards */}
        <h4>Rewards Gotten</h4>
      <Button onClick={() => navigate("/profile/password")}>
        Change password
      </Button>
      <Button style={{ color: "red" }}>
        Delete Account
      </Button>
      </Box>
        </div>
      )}
    </div>
  );
}
