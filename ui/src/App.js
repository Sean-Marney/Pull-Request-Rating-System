import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/reusable/SidebarData";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import History from "./components/pages/History/History";
import Register from "./components/pages/signIn/Register";
import Login from "./components/pages/signIn/Login";
import ManageRewards from "./components/pages/ManageRewardsPage/ManageRewards";
import ManageUsers from "./components/pages/ManageUsersPage/ManageUsers"
import CreateUser from "./components/pages/ManageUsersPage/CreateUserForm";
import UpdateUser from "./components/pages/ManageUsersPage/UpdateUserForm";
import CreateReward from "./components/pages/ManageRewardsPage/CreateRewardForm";
import UpdateReward from "./components/pages/ManageRewardsPage/UpdateRewardForm";
import Rewards from "./components/pages/RewardsPage/Rewards";
import Repositories from "./components/pages/Repositories/Repositories"
import { useCookies } from "react-cookie";
import ProtectedRoute from "./routes/ProtectedRoutes";
import ManagerHelp from "./components/pages/ManagerHelp/ManagerHelp";

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    return (
        <BrowserRouter>
            {cookies.token && (
            <Sidebar removeCookie={removeCookie} role={cookies.role}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/ManagerHelp" element={<ManagerHelp />} />
                    <Route
                        path="/management/users"
                        element={
                            <ProtectedRoute
                                token={cookies.token}
                                role={cookies.role}
                            >
                                {" "}
                                <ManageUsers />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/management/users/create"
                        element={
                            <ProtectedRoute
                                token={cookies.token}
                                role={cookies.role}
                            >
                                {" "}
                                <CreateUser />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/management/users/update/:id"
                        element={
                            <ProtectedRoute
                                token={cookies.token}
                                role={cookies.role}
                            >
                                {" "}
                                <UpdateUser />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/management/rewards"
                        element={
                            <ProtectedRoute
                                token={cookies.token}
                                role={cookies.role}
                            >
                                {" "}
                                <ManageRewards />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/management/rewards/create"
                        element={
                            <ProtectedRoute
                                token={cookies.token}
                                role={cookies.role}
                            >
                                {" "}
                                <CreateReward />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/management/rewards/update/:id"
                        element={
                            <ProtectedRoute
                                token={cookies.token}
                                role={cookies.role}
                            >
                                {" "}
                                <UpdateReward />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/rewards" element={<Rewards />} />
                    <Route
                        path="/management/repositories"
                        element={
                            <ProtectedRoute
                                token={cookies.token}
                                role={cookies.role}
                            >
                                {" "}
                                <Repositories />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                </Sidebar>
            )}
            {!cookies.token && (
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            )}
        </BrowserRouter>
    );
};

export default App;
