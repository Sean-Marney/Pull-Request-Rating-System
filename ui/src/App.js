import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/HomePage/Home";
import ManageRewards from "./components/ManageRewardsPage/ManageRewards";
import CreateReward from "./components/ManageRewardsPage/CreateRewardForm";
import UpdateReward from "./components/ManageRewardsPage/UpdateRewardForm";
import Rewards from "./components/RewardsPage/Rewards";
import History from "./components/PullRequestHistory/PullRequestHistory";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Routes for managers to manage rewards */}
          <Route path="/" element={<Home />} />
          <Route path="/management/rewards" element={<ManageRewards />} />
          <Route path="/management/rewards/create" element={<CreateReward />} />
          <Route
            path="/management/rewards/update/:id"
            element={<UpdateReward />}
          />
          {/* Routes for developers to view rewards */}
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
