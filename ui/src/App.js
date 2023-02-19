import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/reusable/SidebarData";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import History from "./components/pages/History/History";
import Register from "./components/pages/signIn/Register";
import Login from "./components/pages/signIn/Login";
import ManageRewards from "./components/pages/ManageRewardsPage/ManageRewards";
import CreateReward from "./components/pages/ManageRewardsPage/CreateRewardForm";
import UpdateReward from "./components/pages/ManageRewardsPage/UpdateRewardForm";
import Rewards from "./components/pages/RewardsPage/Rewards";
import { useCookies } from "react-cookie";
import ProtectedRoute from "./routes/ProtectedRoutes";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  return (
    <BrowserRouter>
      <Sidebar removeCookie={removeCookie}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/history" element={<History />} />
          <Route
            path="/management/rewards"
            element={
              <ProtectedRoute token={cookies.token}>
                {" "}
                <ManageRewards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/management/rewards/create"
            element={
              <ProtectedRoute token={cookies.token}>
                {" "}
                <CreateReward />
              </ProtectedRoute>
            }
          />
          <Route
            path="/management/rewards/update/:id"
            element={<UpdateReward />}
          />
          <Route path="/rewards" element={<Rewards />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
