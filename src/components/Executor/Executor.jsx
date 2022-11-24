import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./Executor.css";

const Executor = (props) => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state) navigate("/");
    setUser(location.state.user);
    setSelectedProject(
      location.state.selectedProject ? location.state.selectedProject : ""
    );
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
  }, []);
  return (
    <Row>
      <Col lg={4} xs={12}>
        <div className="projects">
          <Form.Control
            style={{ marginTop: "20px" }}
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
                    variant={
                      project.projectId === selectedProject.projectId
                        ? "dark"
                        : "primary"
                    }
                    onClick={() => setSelectedProject(project)}
                  >
                    Execute code
                  </Button>
                </Card.Body>
              </Card>
            ))}
          {projects.length === 0 && (
            <h1 style={{ color: "white" }}>No projects to show!</h1>
          )}
        </div>
      </Col>
      <Col xs={12} lg={4}>
        <div style={{ margin: "20px 10px" }}>
          <h3 style={{ color: "white", margin: "25px 0" }}>
            {selectedProject?.projectName?.length > 0
              ? "Selected mapping: " + selectedProject.projectName
              : "Select a Project to execute"}
          </h3>
          <Form.Control as="textarea" placeholder="Source JSON" />
        </div>
      </Col>
      <Col xs={12} lg={4}>
        <fieldset disabled style={{ margin: "84px 10px" }}>
          <Form.Control
            id="disabledTextInput"
            as="textarea"
            placeholder="Target JSON"
          />
        </fieldset>
      </Col>
    </Row>
  );
};

export default Executor;
