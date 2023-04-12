import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoutes";
import ManagerRoutes from "./routes/ManagerRoutes";
import DeveloperRoutes from "./routes/DeveloperRoutes";
import UnauthorizedPage from "./components/pages/401/UnauthorizedPage";
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
                        <Route path="/" element={<DeveloperDashboard />} />
                        <Route
                            path="/management"
                            element={<ManagerDashboard />}
                        />
                        <Route path="/history" element={<History />} />

                        <Route
                            path="/management/repositories/rating"
                            element={<PullRequestRating />}
                        />
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
                        <Route path="/rewards" element={<Rewards />} />
                        <Route path="/FAQ" 
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
                    <Route path="/401" element={<UnauthorizedPage />} />
                </Routes>
            )}
        </BrowserRouter>
    );
};

export default App;
