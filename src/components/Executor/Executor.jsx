import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Project from "../Project/Project";

const Executor = (props) => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState("");
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state) navigate("/");
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
  }, []);
  return (
    <Row>
      <Col lg={4} xs={12}>
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
              <Project project={project} />
            ))}
          {projects.length === 0 && <h1>No projects to show!</h1>}
        </div>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default Executor;
