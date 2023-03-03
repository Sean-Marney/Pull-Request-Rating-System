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
} from "@material-ui/core";
import useAxiosInstance from "../../../useAxiosInstance";

const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
        boxShadow: theme.shadows[20],
        paddingBottom: theme.spacing(0),
        borderRadius: "20px",
    },
    tableContainer: {
        paddingLeft: theme.spacing(20),
        paddingRight: theme.spacing(20),
    },
    tableHeaders: {
        fontSize: "25px",
    },
    tableContent: {
        fontSize: "20px",
    },
}));

export default function ManageTrackers() {
    const { request } = useAxiosInstance();
    const classes = useStyles();
    const [trackers, setTracker] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getAllTrackers();
    }, []);

    // Gets all trackers
    const getAllTrackers = async () => {
        try {
            const response = await axios.get(
                // Sends GET request to API to get all trackers
                "http://localhost:8000/management/trackers"
            );
            setTracker([...response.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTracker = async (_id) => {
        // Delete user
        await axios.delete(
            `http://localhost:8000/management/trackers/delete/${_id}`
        );

        getAllTrackers(); // Get updated list of trackers
    };

    return (
        <div className={classes.tableContainer}>
            <Box padding={3}>
                <Typography variant="h4">
                    <b>Manage Trackers</b>
                </Typography>
            </Box>
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AddCircleIcon />}
                onClick={() => navigate("/management/trackers/create")}
            >
                Add New Tracker
            </Button>
            <Box>
                {/* Get all users from database and display in a table */}
                {trackers && (
                    <TableContainer className={classes.table}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHeaders}>
                                        <b>Name</b>
                                    </TableCell>
                                    <TableCell className={classes.tableHeaders}>
                                        <b>Edit</b>
                                    </TableCell>
                                    <TableCell className={classes.tableHeaders}>
                                        <b>Remove</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {trackers.map((tracker) => (
                                    <TableRow key={tracker._id}>
                                        <TableCell
                                            className={classes.tableContent}
                                        >
                                            {tracker.name}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="primary"
                                                title="Edit Tracker"
                                                onClick={() =>
                                                    navigate(
                                                        `/management/trackers/update/${tracker._id}`
                                                    )
                                                }
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="secondary"
                                                title="Delete Tracker"
                                                onClick={() =>
                                                    deleteTracker(tracker._id)
                                                }
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
        </div>
    );
}
