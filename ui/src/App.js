import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/HomePage/Home";
import ManageRewards from "./components/ManageRewardsPage/ManageRewards";
import CreateReward from "./components/ManageRewardsPage/CreateRewardForm";
import UpdateReward from "./components/ManageRewardsPage/UpdateRewardForm";
import History from "./components/PullRequestHistory/PullRequestHistory";
import PullRequest from "./components/PullRequest/PullRequest";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/management/rewards" element={<ManageRewards />} />
          <Route path="/management/rewards/create" element={<CreateReward />} />
          <Route
            path="/management/rewards/update/:id"
            element={<UpdateReward />}
          />
          <Route path="/pullrequest/:id" element={<PullRequest />}/>
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
