import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateReward() {
  const [updateForm, setUpdateForm] = useState({
    rewardName: "",
    starsRequired: "",
  });

  const { id } = useParams(); // Get reward ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    getReward();
  }, []);

  const getReward = async () => {
    // Get reward by id
    const res = await axios.get(
      `http://localhost:8000/management/rewards/${id}`
    );

    // Set to state (fills in textboxes)
    setUpdateForm({
      rewardName: res.data.rewardName,
      starsRequired: res.data.starsRequired,
    });
  };

  const updateEditFormField = (e) => {
    const { name, value } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const updateReward = async (e) => {
    e.preventDefault();

    // Update reward
    await axios.patch(
      `http://localhost:8000/management/rewards/update/${id}`,
      updateForm
    );

    navigate("/management/rewards");
  };

  return (
    <div>
      <div>
        <h1>Update Reward</h1>
      </div>
      <div>
        <form onSubmit={updateReward}>
          <label>Reward Name</label>
          <input
            onChange={updateEditFormField}
            value={updateForm.rewardName}
            name="rewardName"
          />
          <br />
          <label>Stars Required</label>
          <input
            onChange={updateEditFormField}
            value={updateForm.starsRequired}
            name="starsRequired"
          />
          <br />
          <button onClick={() => navigate("/management/rewards")}>
            Cancel
          </button>
          <button type="submit">Update Reward</button>
        </form>
      </div>
    </div>
  );
}
