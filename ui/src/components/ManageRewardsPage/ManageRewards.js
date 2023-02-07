import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ManageRewards() {
  const [rewards, setRewards] = useState(null);

  useEffect(() => {
    getRewards();
  }, []);

  const getRewards = async () => {
    // Get rewards
    const res = await axios.get("http://localhost:8000/management/rewards");

    // Set to state
    setRewards(res.data);
    console.log(res.data);
  };

  return (
    <div>
      <div>
        <h2>Manage Rewards</h2>
      </div>
      <div>
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
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
      </div>
    </div>
  );
}
