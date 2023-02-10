import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import History from "./components/PullRequestHistory/PullRequestHistory";

function App() {
    return (
        <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/history" element={<History />} />
          </Routes>
        </BrowserRouter>
      </div>
  
    );
}

export default App;
