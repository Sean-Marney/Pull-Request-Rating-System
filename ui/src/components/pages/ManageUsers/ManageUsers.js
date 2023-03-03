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

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: "calc(100vh - 100px)",
    maxWidth: "90%",
    margin: "0 auto",
    overflow: "auto",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    boxShadow: theme.shadows[20],
    borderRadius: theme.shape.borderRadius,
  },
  tableHeaders: {
    fontSize: "1.25rem",
    textAlign: "center",
    fontWeight: "bold",
  },
  tableContent: {
    fontSize: "1rem",
    textAlign: "center",
  },

  button: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function ManageUsers() {
  const { request } = useAxiosInstance();
  const classes = useStyles();
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
          className={classes.button}
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
                        {user.hasRole}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          title="Edit User"
                          onClick={() =>
                            navigate(`/management/users/update/${user._id}`)
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="secondary"
                          title="Delete User"
                          onClick={() => deleteUser(user._id)}
                        >
                          <DeleteIcon />
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
