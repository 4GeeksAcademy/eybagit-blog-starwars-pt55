import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AppRoutes from "./routes.jsx";

const App = () => (
  <Router>
    <Navbar />
    <div className="container mt-5">
      <AppRoutes />
    </div>
  </Router>
);

export default App;
