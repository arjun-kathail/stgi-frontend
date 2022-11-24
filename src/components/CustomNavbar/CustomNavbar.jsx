import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import classes from "./CustomNavbar.module.css";
import GoogleLoginButton from "../GoogleLoginButton";

const CustomNavbar = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar
        className={classes.body}
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
      >
        <Container>
          <Navbar.Brand href="/" className={classes.imageContainer}>
            <img
              style={{ height: 35 }}
              src={require("../../images/logo.jpg")}
              alt="not found"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav style={{ margin: "auto" }} className="me-auto">
              <Nav.Link
                className={classes.navText}
                onClick={() => navigate("/generator")}
              >
                Generator
              </Nav.Link>
              {props.user && (
                <>
                  <Nav.Link
                    className={classes.navText}
                    onClick={() => navigate("/executor", { state: props.user })}
                  >
                    Executor
                  </Nav.Link>
                  <Nav.Link
                    className={classes.navText}
                    onClick={() => navigate("/profile", { state: props.user })}
                  >
                    Profile
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              <Nav.Link className={classes.loginButton}>
                <GoogleLoginButton user={props.user} setUser={props.setUser} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default CustomNavbar;
