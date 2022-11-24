import React from "react";
import { Button, Card } from "react-bootstrap";

const Project = (props) => {
  return (
    <Card className="project">
      <Card.Header>{props.project.projectName}</Card.Header>
      <Card.Body>
        <Card.Text>{props.project.projectDescription}</Card.Text>
        <Button variant="primary">Generate code</Button>
      </Card.Body>
    </Card>
  );
};

export default Project;
