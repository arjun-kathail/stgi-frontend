import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useLocation } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState();
  const [projects, setProjects] = useState();
  const location = useLocation();
  useEffect(() => {
    setUser(location.state);
    setProjects([
      {
        projectName: "Project 1",
        projectDescription: "Lorem ipsum lorem ipsum this is lorem ipsum",
      },
      {
        projectName: "Project 2",
        projectDescription: "Lorem ipsum lorem ipsum this is lorem ipsum",
      },
      {
        projectName: "Project 3",
        projectDescription: "Lorem ipsum lorem ipsum this is lorem ipsum",
      },
      {
        projectName: "Project 4",
        projectDescription: "Lorem ipsum lorem ipsum this is lorem ipsum",
      },
    ]);
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
          <div className="projects">
            {projects.map((project) => (
              <Card className="project">
                <Card.Header>{project.projectName}</Card.Header>
                <Card.Body>
                  <Card.Text>{project.projectDescription}</Card.Text>
                  <Button variant="primary">Generate code</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default Profile;
