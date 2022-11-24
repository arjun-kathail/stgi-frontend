import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useLocation } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState();
  const location = useLocation();
  useEffect(() => {
    setUser(location.state);
  }, [location.state]);
  return (
    <>
      {user && (
        <div className="pf-container">
          <div className="pf-wrapper shadow">
            <Card style={{ width: "20rem" }}>
              <div className="pic--wrap">
                <Card.Img
                  style={{ padding: "3rem" }}
                  referrerPolicy="no-referrer"
                  variant="top"
                  id="profileImage"
                  src={
                    user.imageUrl
                      ? user.imageUrl
                      : "https://img.icons8.com/doodle/48/000000/user.png"
                  }
                />
              </div>
              <Card.Body>
                <Card.Title>Name: {user.name}</Card.Title>
                <Card.Title>Email: {user.email}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};
export default Profile;
