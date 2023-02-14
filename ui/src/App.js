import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/pages/signIn/Register";
import Login from "./components/pages/signIn/Login";
import Dashboard from "./components/pages/Dashboard";

function App() {
    return (
        <div className="bg-gray-900 min-h-screen">
            <BrowserRouter>
                <Routes>
                    <Route element={<Register />} exact path="/register" />
                    <Route element={<Login />} exact path="/login" />
                    <Route element={<Dashboard />} exact path="/dashboard" />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
