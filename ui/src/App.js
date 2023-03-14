import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoutes";
import PullRequestRating from "./components/pages/Repositories/PullRequestRating";
import Leaderboard from "./components/pages/Leaderboard/Leaderboard";
import Sidebar from "./components/reusable/SidebarData";
import ManagerDashboard from "./components/pages/ManagerDashboard/ManagerDashboard";
import DeveloperDashboard from "./components/pages/DeveloperDashboard/DeveloperDashboard";
import History from "./components/pages/History/History";
import Register from "./components/pages/signIn/Register";
import Login from "./components/pages/signIn/Login";
import ManageRewards from "./components/pages/ManageRewards/ManageRewards";
import ManageUsers from "./components/pages/ManageUsers/ManageUsers";
import ManageTrackers from "./components/pages/ManageTrackers/ManageTrackers";
import CreateUser from "./components/pages/ManageUsers/CreateUserForm";
import UpdateUser from "./components/pages/ManageUsers/UpdateUserForm";
import CreateReward from "./components/pages/ManageRewards/CreateRewardForm";
import CreateTracker from "./components/pages/ManageTrackers/CreateTrackerForm";
import UpdateReward from "./components/pages/ManageRewards/UpdateRewardForm";
import UpdateTracker from "./components/pages/ManageTrackers/UpdateTrackerForm";
import Rewards from "./components/pages/Rewards/Rewards";
import FAQ from "./components/pages/FAQ/FAQ";
import CreateFAQ from "./components/pages/ManageFAQ/CreateFAQForm";
import ManageFAQ from "./components/pages/ManageFAQ/ManageFAQs";
import UpdateFAQs from "./components/pages/ManageFAQ/UpdateFAQForm";
import ClaimedRewards from "./components/pages/ClaimedRewards/ClaimedRewards";
import ArchivedRewards from "./components/pages/ClaimedRewards/ArchivedRewards";
import Repositories from "./components/pages/Repositories/Repositories";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  return (
    <BrowserRouter>
      {cookies.token && (
        <Sidebar removeCookie={removeCookie} role={cookies.role}>
          <Routes>
            <Route path="/" element={<DeveloperDashboard />} />
            <Route path="/management" element={<ManagerDashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/history" element={<History />} />
            <Route
              path="/management/repositories/rating"
              element={<PullRequestRating />}
            />
            <Route 
              path="/management/Leaderboard" 
              element={
                <ProtectedRoute token={cookies.token} role={cookies.role}>
                  {" "}
                <Leaderboard />
                </ProtectedRoute>
              } 
              />
            <Route
              path="/management/users"
              element={
                <ProtectedRoute token={cookies.token} role={cookies.role}>
                  {" "}
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/users/create"
              element={
                <ProtectedRoute token={cookies.token} role={cookies.role}>
                  {" "}
                  <CreateUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/users/update/:id"
              element={
                <ProtectedRoute token={cookies.token} role={cookies.role}>
                  {" "}
                  <UpdateUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/rewards"
              element={
                <ProtectedRoute token={cookies.token} role={cookies.role}>
                  {" "}
                  <ManageRewards />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/rewards/create"
              element={
                <ProtectedRoute token={cookies.token} role={cookies.role}>
                  {" "}
                  <CreateReward />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/rewards/update/:id"
              element={
                <ProtectedRoute token={cookies.token} role={cookies.role}>
                  {" "}
                  <UpdateReward />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/rewards/claimed"
              element={
                <ProtectedRoute token={cookies.token} role={cookies.role}>
                  {" "}
                  <ClaimedRewards />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/rewards/claimed/archived"
              element={
                <ProtectedRoute token={cookies.token} role={cookies.role}>
                  {" "}
                  <ArchivedRewards />
                </ProtectedRoute>
              }
            />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route
              path="/management/faqs"
              element={
                <ProtectedRoute token={cookies.token} role={cookies.role}>
                  {" "}
                  <ManageFAQ />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/manageFaqs/create"
              element={
                <ProtectedRoute token={cookies.token} role={cookies.role}>
                  {" "}
                  <CreateFAQ />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/manageFaqs/update/:id"
              element={
                <ProtectedRoute token={cookies.token} role={cookies.role}>
                  {" "}
                  <UpdateFAQs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/repositories"
              element={
                <ProtectedRoute token={cookies.token} role={cookies.role}>
                  {" "}
                  <Repositories />
                </ProtectedRoute>
              }
            />
            <Route path="/management/trackers" element={<ManageTrackers />} />
            <Route
              path="/management/trackers/create"
              element={
                <ProtectedRoute token={cookies.token} role={cookies.role}>
                  {" "}
                  <CreateTracker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/trackers/update/:id"
              element={
                <ProtectedRoute token={cookies.token} role={cookies.role}>
                  {" "}
                  <UpdateTracker />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Sidebar>
      )}
      {!cookies.token && (
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
