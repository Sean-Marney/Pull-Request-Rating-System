import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ClaimIcon from "@material-ui/icons/Redeem";
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
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
import { useStyles } from "../../styles/tableStyle";

export default function ManageRewards() {
  const classes = useStyles();

  const [badges, setBadges] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getBadges();
  }, []);

  const getBadges = async () => {
    // Get rewards
    const res = await axios.get("http://localhost:8000/badge/all");
    for (let i = 0; i < res.data.length; i++) {
      const blob = new Blob([Int8Array.from(res.data[i].img.data.data)], {type: res.data[i].img.data.contentType });
      const image = window.URL.createObjectURL(blob);
      res.data[i].photo = image;
    }
    // Set to state
    setBadges(res.data);
  };

  const deleteBadge = async (_id) => {
    // Delete reward
    await axios.delete(
      `http://localhost:8000/management/badge/delete/${_id}`
    );

    getBadges(); // Get updated list of rewards
  };

  return (
    <div className={classes.tableContainer}>
      <Paper className={classes.paper}>
        <Typography variant="h4">
          <b>Manage Badges</b>
        </Typography>
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
          onClick={() => navigate("/management/badges/create")}
        >
          Add New Badge
        </Button>
        <Box>
          {/* Get all rewards from database and display in a table */}
          {badges && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell className={classes.tableHeaders}>
                      <b>Name</b>
                    </TableCell>
                    <TableCell className={classes.tableHeaders}>
                      <b>Stars Required</b>
                    </TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {badges.map((badge) => (
                    <TableRow key={badge._id}>
                      <TableCell className={classes.tableContent}>
                        <img src={badge.photo} alt="badge" width="75" height="75" style ={{ "display": "block","marginLeft": "auto","marginRight": "auto"}}/>
                        {/* <LocalPoliceIcon /> */}
                      </TableCell>
                      <TableCell className={classes.tableContent}>
                        {badge.name}
                      </TableCell>
                      <TableCell className={classes.tableContent}>
                        {badge.value}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          title="Edit Badge"
                          onClick={() =>
                            navigate(`/management/badges/update/${badge._id}`)
                          }
                        >
                          <EditIcon className={classes.editButton} />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          title="Delete Badge"
                          onClick={() => deleteBadge(badge._id)}
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
