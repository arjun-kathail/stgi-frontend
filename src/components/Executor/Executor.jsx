import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Circles } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Executor.css";

const Executor = (props) => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sourceJSON, setSourceJSON] = useState("Source JSON");
  const [targetJSON, setTargetJSON] = useState("Target JSON");

  const location = useLocation();
  const navigate = useNavigate();
  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const sourceJsonFileReader = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setSourceJSON(e.target.result);
    };
  };

  const sourceJsonFileUploadHandler = (e) => {
    // Check if user has entered the file
    if (e.target.files.length) {
      sourceJsonFileReader(e);
    }
  };

  const sourceJsonButtonHandler = () => {
    if (!isJsonString(sourceJSON)) {
      toast.error("Please upload a valid JSON file!");
      return;
    }
    if (!selectedProject) {
      toast.info("Select a project to execute!");
      return;
    }
    setTargetJSON(sourceJSON);
    toast.success("Conversion successful!");
  };

  const sourceJsonTextChangeHandler = (e) => {
    setSourceJSON(e.target.value);
  };
  useEffect(() => {
    if (!location.state) {
      navigate("/");
      return;
    }

    async function fetchData() {
      const res = await fetch("https://81ae-14-139-234-179.ngrok.io/users", {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ email: "ugoel911@gmail.com" }),
      });
      const data = await res.json();
      setProjects(data);
      setUser(location.state.user);
      setSelectedProject(
        location.state.selectedProject ? location.state.selectedProject : ""
      );
    }
    fetchData();
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
          {projects.length > 0 ? (
            projects
              .filter((project) =>
                project.name.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((project) => (
                <Card className="project">
                  <Card.Header>{project.name}</Card.Header>
                  <Card.Body>
                    <Button
                      variant={
                        project._id === selectedProject._id ? "dark" : "primary"
                      }
                      onClick={() => setSelectedProject(project)}
                    >
                      Execute code
                    </Button>
                  </Card.Body>
                </Card>
              ))
          ) : (
            <>
              <h1 style={{ color: "white" }}>No projects to show!</h1>
              <div style={{ width: "100%", margin: "auto" }}>
                <Circles
                  height="80"
                  width="80"
                  color="rgb(50, 222, 212)"
                  ariaLabel="circles-loading"
                  visible={true}
                />
              </div>
            </>
          )}
        </div>
      </Col>
      <Col xs={12} lg={4}>
        <div style={{ margin: "20px 10px" }}>
          <h3 style={{ color: "white", margin: "25px 0" }}>
            {selectedProject?.name?.length > 0
              ? "Selected mapping: " + selectedProject.name
              : "Select a Project to execute"}
          </h3>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Enter Source JSON</Form.Label>
            <Form.Control
              as="textarea"
              rows={13}
              value={sourceJSON}
              onChange={sourceJsonTextChangeHandler}
            />
          </Form.Group>

          <Form.Group
            controlId="formFile"
            className="mb-3"
            onChange={(e) => {
              sourceJsonFileUploadHandler(e);
            }}
          >
            <Form.Control type="file" />
          </Form.Group>
          <Button onClick={sourceJsonButtonHandler}>Convert JSON</Button>
        </div>
      </Col>
      <Col xs={12} lg={4}>
        <fieldset disabled style={{ margin: "114px 10px" }}>
          <Form.Control
            id="disabledTextInput"
            as="textarea"
            placeholder={targetJSON}
            rows={13}
          />
        </fieldset>
      </Col>
      <ToastContainer />
    </Row>
  );
};

export default Executor;
