import React from "react";
import classes from './CustomNavbar.module.css';
import GoogleLoginButton from "./GoogleLoginButton";

const CustomNavbar = (props) => {
  return (
    <div className={classes.body}>
      <div className={classes.imageContainer}>
        <img style={{ height: 35 }} src={require('../images/logo.jpg')} alt="not found" />
      </div>
      <div className={classes.navLinks}>
        <p className={classes.navText} onClick={() => { console.log("dsfvsd")}}>Generator</p>
        <p className={classes.navText} onClick={() => {}}>Executor</p>
        <p className={classes.navText} onClick={() => {}}>Profile</p>
      </div>
      <div className={classes.loginButton}>
        <GoogleLoginButton></GoogleLoginButton>
      </div>
    </div>
  );
}
export default CustomNavbar;