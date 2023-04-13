import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoutes";
import ManagerRoutes from "./routes/ManagerRoutes";
import DeveloperRoutes from "./routes/DeveloperRoutes";
import UnauthorizedPage from "./components/pages/401/UnauthorizedPage";
import RouteError from "./components/pages/404/RouteError";
import PullRequestRating from "./components/pages/Repositories/PullRequestRating";
import Leaderboard from "./components/pages/Leaderboard/Leaderboard";
import Sidebar from "./components/reusable/SidebarData";
import ManagerDashboard from "./components/pages/ManagerDashboard/ManagerDashboard";
import DeveloperDashboard from "./components/pages/DeveloperDashboard/DeveloperDashboard";
import History from "./components/pages/History/History";
import Register from "./components/pages/Auth/Register";
import Login from "./components/pages/Auth/Login";
import OTP from "./components/pages/Auth/VerifyOtp";
import ForgotPassword from "./components/pages/Auth/ForgotPassword";
import ResetPassword from "./components/pages/Auth/ResetPassword";
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
import ManageProfiles from "./components/pages/Profile/Profile";
import UpdateProfile from "./components/pages/ManageProfile/UpdateProfileForm";
import UpdatePassword from "./components/pages/ManageProfile/UpdatePasswordForm";
import AddQuestion from "./components/pages/Questions/QuestionsForm";
import ManageQuestions from "./components/pages/ManageQuestions/ManageQuestions";
import AddQuestions from "./components/pages/ManageQuestions/AddQuestion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import ManagerHelp from "./components/pages/ManagerHelp/ManagerHelp";

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    return (
      <BrowserRouter>
        {cookies.token && (
          <Sidebar removeCookie={removeCookie} role={cookies.role}>
            <Routes>
              // DeveloperDashboard
              <Route 
                        path="/" element={
                           <DeveloperRoutes
                           token={cookies.token}
                           role={cookies.role}
                       >
                           {" "}
                        <DeveloperDashboard />
                        </DeveloperRoutes>
                        } 
              />

              // ManagerDashboard
              <Route
                            path="/management"
                            element={
                              <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                            <ManagerDashboard />
                            </ManagerRoutes>
                          }
              />
                        
              // History
              <Route path="/history" element={
                          <DeveloperRoutes
                          token={cookies.token}
                          role={cookies.role}
                      >
                          {" "}
                        <History />
                        </DeveloperRoutes>
                        } 
              />

              // PullRequestRating
              <Route
                            path="/management/repositories/rating"
                            element={
                              <ManagerRoutes
                              token={cookies.token}
                              role={cookies.role}
                          >
                              {" "}
                            <PullRequestRating />
                            </ManagerRoutes>
                          }
              />

              // Leaderboard
              <Route
                            path="/management/Leaderboard"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <Leaderboard />
                                </ManagerRoutes>
                            }
              />

              // ManageUsers
              <Route
                            path="/management/users"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <ManageUsers />
                                </ManagerRoutes>
                            }
              />

              // ManagerHelp
              <Route
                            path="/management/ManagerHelp"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <ManagerHelp />
                                </ManagerRoutes>
                            }
              />

              // CreateUser
              <Route
                            path="/management/users/create"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <CreateUser />
                                </ManagerRoutes>
                            }
              />

              // UpdateUser
              <Route
                            path="/management/users/update/:id"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <UpdateUser />
                                </ManagerRoutes>
                            }
              />

              // ManageRewards
              <Route
                            path="/management/rewards"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <ManageRewards />
                                </ManagerRoutes>
                            }
              />

              // CreateRewards
              <Route
                            path="/management/rewards/create"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <CreateReward />
                                </ManagerRoutes>
                            }
              />

              // UpdateRewards
              <Route
                            path="/management/rewards/update/:id"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <UpdateReward />
                                </ManagerRoutes>
                            }
              />

              // ClaimedRewards
              <Route
                            path="/management/rewards/claimed"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <ClaimedRewards />
                                </ManagerRoutes>
                            }
              />

              // ArchivedRewards
              <Route
                            path="/management/rewards/claimed/archived"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <ArchivedRewards />
                                </ManagerRoutes>
                            }
              />

              // Developers Rewards
              <Route 
                        path="/rewards" 
                        element={
                          <DeveloperRoutes
                          token={cookies.token}
                          role={cookies.role}
                      >
                          {" "}
                        <Rewards />
                        </DeveloperRoutes>
                        } 
              />

              // Developer FAQ
              <Route 
                        path="/FAQ" 
                        element={
                          <DeveloperRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                        <FAQ />
                        </DeveloperRoutes>
                         }
              />

              // Mangers FAQ
              <Route
                            path="/management/faqs"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <ManageFAQ />
                                </ManagerRoutes>
                            }
              />

              // CreateFAQ
              <Route
                            path="/management/manageFaqs/create"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <CreateFAQ />
                                </ManagerRoutes>
                            }
              />

              // UpdateFAQs
              <Route
                            path="/management/manageFaqs/update/:id"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <UpdateFAQs />
                                </ManagerRoutes>
                            }
              />    

              // Repositories
              <Route
                            path="/management/repositories"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <Repositories />
                                </ManagerRoutes>
                            }
              />

              // ManageTrackers
              <Route
                            path="/management/trackers"
                            element={
                              <ManagerRoutes
                              token={cookies.token}
                              role={cookies.role}
                          >
                              {" "}
                            <ManageTrackers />
                            </ManagerRoutes>
                            }
              />

              // CreateTracker
              <Route
                            path="/management/trackers/create"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <CreateTracker />
                                </ManagerRoutes>
                            }
              />  

              // UpdateTracker
              <Route
                            path="/management/trackers/update/:id"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <UpdateTracker />
                                </ManagerRoutes>
                            }
              />

              // ManageProfiles
              <Route
                            path="/profile"
                            element={
                                <ProtectedRoute
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <ManageProfiles />
                                </ProtectedRoute>
                            }
              />

              // UpdateProfile
              <Route
                            path="/profile/update"
                            element={
                                <ProtectedRoute
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <UpdateProfile />
                                </ProtectedRoute>
                            }
              />

              // UpdatePassword
              <Route
                            path="/profile/password"
                            element={
                                <ProtectedRoute
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <UpdatePassword />
                                </ProtectedRoute>
                            }
              />

              // AddQuestion
              <Route 
                            path="/faq/ask"
                            element={
                                <DeveloperRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <AddQuestion />
                                </DeveloperRoutes>
                            }
              />

              // ManageQuestions
              <Route
                            path="/management/manageFaqs/questions"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <ManageQuestions />
                                </ManagerRoutes>
                            }
              />

              // AddQuestions
              <Route
                            path="/management/manageFaqs/questions/add/:id"
                            element={
                                <ManagerRoutes
                                    token={cookies.token}
                                    role={cookies.role}
                                >
                                    {" "}
                                    <AddQuestions />
                                </ManagerRoutes>
                            }
              />

              // UnauthorizedPage
              <Route path="/401" element={<UnauthorizedPage />} />
              
            </Routes>
        </Sidebar>
      )}
      {!cookies.token && (
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<OTP />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route
            path="/forgotpassword"
            element={<ForgotPassword />}
          />
          // RouteError
              <Route path="/404" element={<RouteError />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
