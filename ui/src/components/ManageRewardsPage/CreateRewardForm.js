import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  InputLabel,
  Input,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";

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
        <Typography style={{ marginTop: "100px" }} variant="h4">
          Create New Reward
        </Typography>
      </div>
      <div>
        <Card
          style={{
            maxWidth: 600,
            minHeight: 250,
            padding: "20px 5px",
            margin: "0 auto",
            marginTop: "20px",
          }}
        >
          <CardContent>
            <form onSubmit={createReward}>
              <div>
                <InputLabel>Reward Name</InputLabel>
                <Input
                  onChange={updateCreateFormField}
                  value={createForm.rewardName}
                  name="rewardName"
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <InputLabel>Stars Required</InputLabel>
                <Input
                  onChange={updateCreateFormField}
                  value={createForm.starsRequired}
                  name="starsRequired"
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <Button
                  onClick={() => navigate("/management/rewards")}
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  style={{ marginLeft: "30px" }}
                  variant="contained"
                  color="primary"
                >
                  Create Reward
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
