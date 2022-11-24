import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./CustomNavbar.module.css";
import GoogleLoginButton from "./GoogleLoginButton";

const CustomNavbar = (props) => {
  const navigate = useNavigate();
  return (
    <div className={classes.body}>
      <div className={classes.imageContainer}>
        <img
          style={{ height: 35 }}
          src={require("../images/logo.jpg")}
          alt="not found"
        />
      </div>
      <div className={classes.navLinks}>
        <p
          className={classes.navText}
          onClick={() => {
            console.log("dsfvsd");
          }}
        >
          Generator
        </p>
        <p className={classes.navText} onClick={() => {}}>
          Executor
        </p>
        {props.user && (
          <p
            className={classes.navText}
            onClick={() => navigate("/profile", { state: props.user })}
          >
            Profile
          </p>
        )}
      </div>
      <div className={classes.loginButton}>
        <GoogleLoginButton user={props.user} setUser={props.setUser} />
      </div>
    </div>
  );
};
export default CustomNavbar;
