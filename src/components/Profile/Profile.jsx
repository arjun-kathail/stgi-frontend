import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useLocation, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState();
  const [projects, setProjects] = useState([]);
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setUser(location.state);
    setProjects([
      {
        projectName: "Project 1",
        projectId: "1",
        projectDescription: "Lorem ipsum lorem ipsum this is lorem ipsum",
      },
      {
        projectName: "Project 2",
        projectId: "2",
        projectDescription: "Lorem ipsum lorem ipsum this is lorem ipsum",
      },
      {
        projectName: "Project 3",
        projectId: "3",
        projectDescription: "Lorem ipsum lorem ipsum this is lorem ipsum",
      },
      {
        projectName: "Project 4",
        projectId: "4",
        projectDescription: "Lorem ipsum lorem ipsum this is lorem ipsum",
      },
    ]);
  }, [location.state]);
  return (
    <>
      {user && (
        <Row>
          <Col xs={12} lg={4}>
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
          </Col>
          <Col xs={12} lg={8}>
            <div className="pf-container">
              <div className="projects">
                <Form.Control
                  type="email"
                  placeholder="Search"
                  onChange={(e) => setSearchText(e.target.value)}
                />
                {projects
                  .filter((project) =>
                    project.projectName
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
                  .map((project) => (
                    <Card className="project">
                      <Card.Header>{project.projectName}</Card.Header>
                      <Card.Body>
                        <Card.Text>{project.projectDescription}</Card.Text>
                        <Button
                          onClick={() =>
                            navigate("/executor", {
                              state: {
                                user: user,
                                selectedProject: project,
                              },
                            })
                          }
                        >
                          Execute code
                        </Button>
                      </Card.Body>
                    </Card>
                  ))}
                {projects.length === 0 && <h1>No projects to show!</h1>}
              </div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};
export default Profile;
