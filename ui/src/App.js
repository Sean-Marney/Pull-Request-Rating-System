import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import ManageRewards from "./components/ManageRewardsPage/ManageRewards";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/management/rewards" element={<ManageRewards />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
