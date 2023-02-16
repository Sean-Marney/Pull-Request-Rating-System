import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/SidebarData";
import Dashboard from "./routes/Dashboard";
import "./App.css";
import Achievements from "./routes/Achievements";
import FAQ from "./routes/FAQ";
import History from "./routes/History";
import TrackProgress from "./routes/TrackProgress";
import Merge from "./routes/Merge";

import ManageRewards from "./components/ManageRewardsPage/ManageRewards";
import CreateReward from "./components/ManageRewardsPage/CreateRewardForm";
import UpdateReward from "./components/ManageRewardsPage/UpdateRewardForm";
import Rewards from "./components/RewardsPage/Rewards";
import ManagerHelp from "./routes/ManagerHelp";
import RepositoryList from "./components/Repositories/Repositories";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Achievements" element={<Achievements />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/History" element={<History />} />
          <Route path="/TrackProgress" element={<TrackProgress />} />
          <Route path="/Merge" element={<Merge />} />
          <Route path="/management/rewards" element={<ManageRewards />} />
          <Route path="/management/rewards/create" element={<CreateReward />} />
          <Route
            path="/management/rewards/update/:id"
            element={<UpdateReward />}
          />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/ManagerHelp" element={<ManagerHelp />} />
          <Route path="/repositories" element={<RepositoryList />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
