import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/SidebarData";
import Dashboard from "../src/components/Dashboard/Dashboard";
import PullRequestHistory from "./components/PullRequestHistory/PullRequestHistory";
import Register from "./components/pages/signIn/Register";
import Login from "./components/pages/signIn/Login";
import ManageRewards from "./components/ManageRewardsPage/ManageRewards";
import CreateReward from "./components/ManageRewardsPage/CreateRewardForm";
import UpdateReward from "./components/ManageRewardsPage/UpdateRewardForm";
import ManageUsers from "./components/ManageUsersPage/ManageUsers";
import CreateUser from "./components/ManageUsersPage/CreateUserForm";
import UpdateUser from "./components/ManageUsersPage/UpdateUserForm";
import Rewards from "./components/RewardsPage/Rewards";
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
                    <Route path="/history" element={<PullRequestHistory />} />
                    <Route path="/management/users" element={<ManageUsers />} />
                    <Route
                        path="/management/users/create"
                        element={<CreateUser />}
                    />
                    <Route
                        path="/management/users/update/:id"
                        element={<UpdateUser />}
                    />
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
