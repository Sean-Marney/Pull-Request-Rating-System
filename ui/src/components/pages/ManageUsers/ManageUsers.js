import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
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
    Modal,
} from "@material-ui/core";
import useAxiosInstance from "../../../useAxiosInstance";
import { useStyles } from "../../styles/Manageusers.style";
import Pagination from "../../reusable/Pagination";

export default function ManageUsers() {
    const classes = useStyles();

    const navigate = useNavigate();
    const { request } = useAxiosInstance();
    const [users, setUsers] = useState(null);
    const [visible, setVisible] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    const handleOpen = (userId) => {
        setUserIdToDelete(userId);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    useEffect(() => {
        getUsers();
    }, []);

  const getUsers = async () => {
    // Get users
    const res = await request({
      method: "get",
      url: "/management/users/roles/Developer", withCredentials: true,
    });

    // Set to state
    setUsers(res.data);
  };
  const deleteUser = async (_id) => {
    // Delete user
    await request({
      method: "delete",
      url: `/management/users/delete/${_id}`, withCredentials: true,
    });

        getUsers(); // Get updated list of users
        handleClose(); // Close the modal
    };

    // Handling "Load More" click
    const handlePageClick = () => {
        setVisible((preValue) => preValue + 10);
    };

    return (
        <div className={classes.tableContainer}>
            <Paper className={classes.paper}>
                <Box padding={3}>
                    <Typography variant="h4" className={classes.title}>
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
                                        <TableCell
                                            className={classes.tableHeaders}
                                        >
                                            <b>Name</b>
                                        </TableCell>
                                        <TableCell
                                            className={classes.tableHeaders}
                                        >
                                            <b>Email</b>
                                        </TableCell>
                                        <TableCell
                                            className={classes.tableHeaders}
                                        >
                                            <b>GitHub Username</b>
                                        </TableCell>
                                        <TableCell
                                            className={classes.tableHeaders}
                                        >
                                            <b>Role</b>
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* Render items that have been loaded via pagination */}
                                    {users.slice(0, visible).map((user) => (
                                        <TableRow key={user._id}>
                                            <TableCell
                                                className={classes.tableContent}
                                            >
                                                {user.name}
                                            </TableCell>
                                            <TableCell
                                                className={classes.tableContent}
                                            >
                                                {user.email}
                                            </TableCell>
                                            <TableCell
                                                className={classes.tableContent}
                                            >
                                                {user.git_username}
                                            </TableCell>
                                            <TableCell
                                                className={classes.tableContent}
                                            >
                                                {user.hasRole}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    title="Edit User"
                                                    onClick={() =>
                                                        navigate(
                                                            `/management/users/update/${user._id}`
                                                        )
                                                    }
                                                >
                                                    <EditIcon
                                                        className={
                                                            classes.editButton
                                                        }
                                                    />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    title="Delete User"
                                                    onClick={() =>
                                                        handleOpen(user._id)
                                                    }
                                                >
                                                    <DeleteIcon
                                                        className={
                                                            classes.deleteButton
                                                        }
                                                    />
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
            <div>
                {/* Render "Load More" button from the reusable component and use the handler on click */}
                <Pagination handlePageClick={handlePageClick} />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
                aria-labelledby="popup-box"
                aria-describedby="popup-box-description"
            >
                <div className={classes.modalPaper}>
                    <Typography variant="h5" className={classes.modalTitle}>
                        WARNING
                    </Typography>
                    <Typography
                        variant="body1"
                        className={classes.modalMessage}
                    >
                        This action is irreversible
                    </Typography>
                    <div className={classes.modalButtonContainer}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.modalButton}
                            onClick={() => deleteUser(userIdToDelete)}
                        >
                            Delete Account
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.modalButton}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}