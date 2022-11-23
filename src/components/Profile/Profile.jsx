import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser({
      displayName: "Arsh",
      email: "arshk102001@gmail.com",
    });
  }, []);
  return (
    <>
      {user && (
        <div className="pf-container">
          <div className="pf-wrapper shadow">
            <Card style={{ width: "20rem" }}>
              <div className="pic--wrap">
                <Card.Img
                  style={{ padding: "3rem" }}
                  referrerpolicy="no-referrer"
                  variant="top"
                  id="profileImage"
                  src={
                    user.photoURL
                      ? user.photoURL
                      : "https://img.icons8.com/doodle/48/000000/user.png"
                  }
                />
              </div>
              <Card.Body>
                <Card.Title>Name: {user.displayName}</Card.Title>
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
