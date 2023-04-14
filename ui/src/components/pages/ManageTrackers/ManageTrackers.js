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
} from "@material-ui/core";
import useAxiosInstance from "../../../useAxiosInstance";
import { useStyles } from "../../styles/tableStyle";
import Pagination from "../../reusable/Pagination";

export default function ManageTrackers() {
  const classes = useStyles();

  const navigate = useNavigate();
  const { request } = useAxiosInstance();
  const [trackers, setTracker] = useState(null);
  const [visible, setVisible] = React.useState(10);

  useEffect(() => {
    getAllTrackers();
  }, []);

  // Gets all trackers
  const getAllTrackers = async () => {
    try {
      const response = await request({
        method: "get",
        url: "/management/trackers",
      });
      setTracker([...response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTracker = async (_id) => {
    // Delete user
    await request({
      method: "delete",
      url: `/management/trackers/delete/${_id}`,
    });

    getAllTrackers(); // Get updated list of trackers
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
            <b>Manage Trackers</b>
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
          onClick={() => navigate("/management/trackers/create")}
        >
          Add New Tracker
        </Button>
        <Box>
          {/* Get all users from database and display in a table */}
          {trackers && (
            <TableContainer>
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
                  {/* Render items that have been loaded via pagination */}
                  {trackers.slice(0, visible).map((tracker) => (
                    <TableRow key={tracker._id}>
                      <TableCell className={classes.tableContent}>
                        {tracker.name}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          title="Edit Tracker"
                          onClick={() =>
                            navigate(
                              `/management/trackers/update/${tracker._id}`
                            )
                          }
                        >
                          <EditIcon className={classes.editButton} />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          title="Delete Tracker"
                          onClick={() => deleteTracker(tracker._id)}
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

          <div>
            {/* Render "Load More" button from the reusable component and use the handler on click */}
            <Pagination handlePageClick={handlePageClick} />
          </div>
        </Box>
      </Paper>
    </div>
  );
}
