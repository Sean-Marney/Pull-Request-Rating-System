import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/SidebarData";
import Dashboard from "../src/routes/Dashboard";
import "./App.css";
import Achievements from "./routes/Achievements";
import FAQ from "./routes/FAQ";
import History from "./routes/History";
import TrackProgress from "./routes/TrackProgress";
import Merge from "./routes/Merge";
import Register from "./components/pages/signIn/Register";
import Login from "./components/pages/signIn/Login";
import ManageRewards from "./components/ManageRewardsPage/ManageRewards";
import CreateReward from "./components/ManageRewardsPage/CreateRewardForm";
import UpdateReward from "./components/ManageRewardsPage/UpdateRewardForm";
import Rewards from "./components/RewardsPage/Rewards";
import ManagerHelp from "./routes/ManagerHelp";
import ProtectedRoute from "./routes/ProtectedRoutes";
import { useCookies } from "react-cookie";

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    return (
        <BrowserRouter>
            <Sidebar removeCookie={removeCookie}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/Achievements" element={<Achievements />} />
                    <Route path="/FAQ" element={<FAQ />} />
                    <Route path="/History" element={<History />} />
                    <Route path="/TrackProgress" element={<TrackProgress />} />
                    <Route path="/Merge" element={<Merge />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
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
                    <Route path="/ManagerHelp" element={<ManagerHelp />} />
                </Routes>
            </Sidebar>
        </BrowserRouter>
    );
};

export default App;
