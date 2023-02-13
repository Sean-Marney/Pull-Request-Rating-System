import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/SidebarData';
import Dashboard from './routes/Dashboard';
import './App.css'
import Achievements from "./routes/Achievements";
import FAQ from "./routes/FAQ";
import History from "./routes/History";
import TrackProgress from "./routes/TrackProgress";
import Merge from "./routes/Merge";



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
                </Routes>
            </Sidebar>
        </BrowserRouter>
    );
};

export default App;