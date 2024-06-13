import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Addform from "../components/Addform";
import Listform from "../components/Listform";
import FilterDemo from "../components/dropdown";


const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listform />} />
        <Route path="/add" element={<Addform />} />
        <Route path="/dropdown" element={<FilterDemo />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
