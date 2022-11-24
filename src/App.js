import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import { useState } from "react";
import { Home } from "./components/Home";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Executor from "./components/Executor/Executor";
import CustomNavbar from "./components/CustomNavbar/CustomNavbar";

function App() {
  const [user, setUser] = useState();
  const loggedInRoutes = (
    <>
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/executor" element={<Executor />} />
    </>
  );
  return (
    <div className="App">
      <Router>
        <CustomNavbar user={user} setUser={setUser} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          {user && loggedInRoutes}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
