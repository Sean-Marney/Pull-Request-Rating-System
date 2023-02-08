import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div>
      <div>
        <h2>Manage Rewards</h2>
      </div>
      <div>
        {/* Get all rewards from database and display in a table */}
        {rewards &&
          rewards.map((reward) => {
            return (
              <div key={reward._id}>
                <table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>Stars Required</th>
                    </tr>
                    <tr>
                      <td>{reward.rewardName}</td>
                      <td>{reward.starsRequired}</td>
                      <td>
                        <button
                          onClick={() =>
                            navigate(`/management/rewards/update/${reward._id}`)
                          }
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button onClick={() => deleteReward(reward._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
      </div>
      <button onClick={() => navigate("/management/rewards/create")}>
        Add New Reward
      </button>
    </div>
  );
}
