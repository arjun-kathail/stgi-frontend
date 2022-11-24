import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Profile from "./components/Profile/Profile";
import GoogleLoginButton from "./components/GoogleLoginButton";
import CodeGenerator from "./components/CodeGenerator/CodeGenerator2";
function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/codegenerator" element={<CodeGenerator />} />
        </Routes>
      </Router>
      {/* <GoogleLoginButton></GoogleLoginButton> */}
    </div>
  );
}

export default App;
