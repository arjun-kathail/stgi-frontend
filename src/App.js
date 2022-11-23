import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Profile from "./components/Profile/Profile";
import GoogleLoginButton from "./components/GoogleLoginButton";
function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </Router>
      <GoogleLoginButton></GoogleLoginButton>
    </div>
  );
}

export default App;
