import React, { useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

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
          buttonText="Log out"
          onLogoutSuccess={logOut}
        />
      ) : (
        <GoogleLogin
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
