import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@material-ui/core";

export default function ManageRewards() {
  const [rewards, setRewards] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getRewards();
  }, []);

  const getRewards = async () => {
    // Get rewards
    const res = await axios.get("http://localhost:8000/management/rewards");

    // Set to state
    setRewards(res.data);
  };

  const deleteReward = async (_id) => {
    // Delete reward
    await axios.delete(
      `http://localhost:8000/management/rewards/delete/${_id}`
    );

    getRewards(); // Get updated list of rewards
  };

  return (
    <div style={{ marginLeft: "50px", marginRight: "50px" }}>
      <div>
        <Typography variant="h4">Manage Rewards</Typography>
      </div>
      <div>
        {/* Get all rewards from database and display in a table */}
        {rewards && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Stars Required</b>
                  </TableCell>
                  <TableCell>
                    <b>Actions</b>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {rewards.map((reward) => (
                  <TableRow key={reward._id}>
                    <TableCell>{reward.rewardName}</TableCell>
                    <TableCell>{reward.starsRequired}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() =>
                          navigate(`/management/rewards/update/${reward._id}`)
                        }
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => deleteReward(reward._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<AddCircleIcon />}
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/management/rewards/create")}
      >
        Add New Reward
      </Button>
    </div>
  );
}
