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
      <Paper className={classes.paper}>
        <Box padding={3}>
          <Typography variant="h4">
            <b>Manage Trackers</b>
          </Typography>
        </Box>
        <Button
          className={classes.button}
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
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trackers.map((tracker) => (
                    <TableRow key={tracker._id}>
                      <TableCell className={classes.tableContent}>
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
                          onClick={() => deleteTracker(tracker._id)}
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

