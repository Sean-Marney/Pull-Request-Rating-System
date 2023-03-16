import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  IconButton,
  Paper,
} from "@material-ui/core";
import useAxiosInstance from "../../../useAxiosInstance";
import { useStyles } from "../../styles/tableStyle";

export default function ManageUsers() {
  const classes = useStyles();

  const { request } = useAxiosInstance();
  const [users, setUsers] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    // Get users
    const res = await axios.get(
      "http://localhost:8000/management/users/roles/Developer"
    );

    // Set to state
    setUsers(res.data);
  };
  const deleteUser = async (_id) => {
    // Delete user
    await axios.delete(`http://localhost:8000/management/users/delete/${_id}`);

    getUsers(); // Get updated list of users
  };

  return (
    <div className={classes.tableContainer}>
      <Paper className={classes.paper}>
        <Box padding={3}>
          <Typography variant="h4">
            <b>Manage Users</b>
          </Typography>
        </Box>
        <Button
          style={{
            marginLeft: "20px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddCircleIcon />}
          onClick={() => navigate("/management/users/create")}
        >
          Add New User
        </Button>
        <Box>
          {/* Get all users from database and display in a table */}
          {users && (
            <TableContainer className={classes.table}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeaders}>
                      <b>Name</b>
                    </TableCell>
                    <TableCell className={classes.tableHeaders}>
                      <b>Email</b>
                    </TableCell>
                    <TableCell className={classes.tableHeaders}>
                      <b>GitHub Username</b>
                    </TableCell>
                    <TableCell className={classes.tableHeaders}>
                      <b>Role</b>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className={classes.tableContent}>
                        {user.name}
                      </TableCell>
                      <TableCell className={classes.tableContent}>
                        {user.email}
                      </TableCell>
                      <TableCell className={classes.tableContent}>
                        {user.git_username}
                      </TableCell>
                      <TableCell className={classes.tableContent}>
                        {user.hasRole}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          title="Edit User"
                          onClick={() =>
                            navigate(`/management/users/update/${user._id}`)
                          }
                        >
                          <EditIcon className={classes.editButton} />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          title="Delete User"
                          onClick={() => deleteUser(user._id)}
                        >
                          <DeleteIcon className={classes.deleteButton} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>
    </div>
  );
}
