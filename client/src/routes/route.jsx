import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Addform from "../components/Addform";
import Listform from "../components/Listform";


const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listform />} />
        <Route path="/add" element={<Addform />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
