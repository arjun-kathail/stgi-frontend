import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";

const Nav = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/" className="nav-links">
            <Navbar.Brand>Hackathon</Navbar.Brand>
          </Link>

          {user ? (
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                variant="secondary"
              >
                <img
                  referrerPolicy="no-referrer"
                  src={
                    user.photoURL
                      ? user.photoURL
                      : "https://img.icons8.com/doodle/48/000000/user.png"
                  }
                  style={{ height: "30px", width: "40px" }}
                  alt="User-icon"
                />{" "}
                Welcome
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark" className="dropdownMenu">
                <Dropdown.Item
                  onClick={() => navigate("/profile", { state: user })}
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item className="logoutDropdown">
                  <GoogleLoginButton setUser={setUser} user={user} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <GoogleLoginButton setUser={setUser} user={user} />
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};
export default Nav;
