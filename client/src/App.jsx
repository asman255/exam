import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Report from "./pages/Report";
import Tester from "./pages/Tester";
// import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Report />} />
          <Route path="/tester" element={<Tester />} />
          <Route path="/tester/:id" element={<Tester />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
