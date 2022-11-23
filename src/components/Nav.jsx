import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const Nav = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser({
      displayName: "Arsh",
      email: "arshk102001@gmail.com",
    });
  }, []);
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
                  referrerpolicy="no-referrer"
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
                <Dropdown.Item className="weex" as={Link} to={"/profile"}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item className="logoutDropdown">
                  <Button
                    className="logoutButton"
                    onClick={() => console.log("logout initiated")}
                    buttonstyle="btn--outline"
                  >
                    Logout
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button
              onClick={
                user ? () => console.log("logout") : () => console.log("signin")
              }
            >
              {user ? "Logout" : "Signup / Login"}
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
};
export default Nav;
