import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UnitPage from "./pages/UnitPage";
import OOPBasicsPage from "./pages/OOPBasicsPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/unit/:unitId" element={<UnitPage />} />
          <Route path="/oop-basics" element={<OOPBasicsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
