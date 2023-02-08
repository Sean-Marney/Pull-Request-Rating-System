import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateReward() {
  const [createForm, setCreateForm] = useState({
    rewardName: "",
    starsRequired: "",
  });

  const navigate = useNavigate();

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;

    setCreateForm({
      ...createForm, // Duplicates object
      [name]: value,
    });
  };

  const createReward = async (e) => {
    e.preventDefault(); // Prevents refresh after submit

    // Create new reward
    const res = await axios.post(
      "http://localhost:8000/management/rewards/create",
      createForm
    );

    navigate("/management/rewards"); // Redirects after reward is created

    console.log(res);
  };

  return (
    <div>
      <div>
        <h1>Create New Reward</h1>
      </div>
      <div>
        <form onSubmit={createReward}>
          <label>Reward Name</label>
          <input
            onChange={updateCreateFormField}
            value={createForm.rewardName}
            name="rewardName"
          />
          <br />
          <label>Stars Required</label>
          <input
            onChange={updateCreateFormField}
            value={createForm.starsRequired}
            name="starsRequired"
          />
          <br />
          <button onClick={() => navigate("/management/rewards")}>
            Cancel
          </button>
          <button type="submit">Create Reward</button>
        </form>
      </div>
    </div>
  );
}
