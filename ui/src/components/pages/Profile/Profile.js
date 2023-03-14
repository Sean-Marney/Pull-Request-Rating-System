import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from '@mui/icons-material/Delete';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import { Modal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";

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



export default function ManageProfiles() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cookies] = useCookies();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const deleteUserByEmail = async () => {
    // email.preventDefault();
    try {
    // Delete user
    await axios.delete(
        `http://localhost:8000/management/users/deleteUser/email/${cookies.user.email}`
    );
    getUserByEmail();
    navigate("/login");
  } catch(error){
    navigate("/profile");
  }
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

        {/* rewards
        <Card>
          <h4>Rewards Claimed</h4>
          table
        </Card> */}

        {/* Edit button  */}
        <Button onClick={() => navigate("/profile/update")} startIcon={<EditIcon />}>
          Edit Profile
        </Button>
       
       {/* Change password button  */}
      <Button onClick={() => navigate("/profile/password")} startIcon={<SyncLockIcon />}>
        Change password
      </Button>
      <br></br>

      {/* delete account modal button  */}
      <Button  onClick={handleOpen} startIcon={<DeleteIcon />} style={{ color: "red" }}>
        Delete Account
      </Button>

      {/* delete account modal  */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4 onClick={handleClose} style={{ color: "black" ,  Align: "right", position: 'absolute', top: 1, right: 1, alignItems: 'center'}}>
            <CloseIcon />
          </h4>
          <Typography id="modal-modal-title" variant="h6" component="h2">
             <h4>Delete Account</h4>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this account ?
          </Typography><br></br>
          <Button  onClick={() => deleteUserByEmail(user.email)} startIcon={<DeleteIcon />} style={{ color: "red" }}>
          Delete Account
          </Button>
        </Box>
      </Modal>


        </div>
      )}
      </Container>
    </div>
  );
}
