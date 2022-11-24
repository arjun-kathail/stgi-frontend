import React, { useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { Button } from "react-bootstrap";

function GoogleLoginButton(props) {
  const clientId =
    "747114995861-mq5jik2m36mp50b1dcb5oi5ilam1nvrp.apps.googleusercontent.com";
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "https://www.googleapis.com/auth/userinfo.profile",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = (res) => {
    props.setUser(res.profileObj);
  };

  const onFailure = (err) => {
    console.log("failed", err);
  };

  const logOut = () => {
    props.setUser(null);
  };

  return (
    <div>
      {props.user ? (
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={logOut}
          render={renderProps => (
            <Button variant="dark" style={{ display: "flex", fontFamily: 'Roboto Mono', cursor: "pointer", background: "white", color: "black", height: "40px", border: "0" }} onClick={renderProps.onClick} >
              <img style={{ height: "22px", margin: "1px 10px 0 0" }} src={require('../images/google-logo.png')} alt="not found" />
              <p style={{ color: "rgb(60, 60, 60)" }}>Logout</p>
            </Button>
          )}
        />
      ) : (
        <GoogleLogin
          render={renderProps => (
            <Button variant="dark" style={{ display: "flex", fontFamily: 'Roboto Mono', cursor: "pointer", background: "white", color: "black", height: "40px", border: "0" }} onClick={renderProps.onClick} >
              <img style={{ height: "22px", margin: "1px 10px 0 0" }} src={require('../images/google-logo.png')} alt="not found" />
              <p style={{ color: "rgb(60, 60, 60)" }}>Login</p>
            </Button>
          )}
          clientId={clientId}
          buttonText="Log In"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
    </div>
  );
}
export default GoogleLoginButton;
