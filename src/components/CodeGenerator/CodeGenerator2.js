import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./CodeGenerator.css";
import axios from 'axios';

const allowedExtensions = ["json"];

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const CodeGenerator = () => {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [description, setDescription] = useState("");

    const [sourceJsonButton, setSourceJsonButton] = useState(false);
    const [sourceJSON, setSourceJSON] = useState("");

    const [targetJsonButton, setTargetJsonButton] = useState(false);
    const [targetJSON, setTargetJSON] = useState("");

    const [mappingJsonButton, setMappingJsonButton] = useState(false);
    const [mappingJSON, setMappingJSON] = useState("");

    const [error, setError] = useState("");

    // useEffect(() => {
    //     fileChangeHandler();
    // }, [data]);

    const nameChangeHandler = (e) => {
        setName(e.target.value)
    }

    const emailChangeHandler = (e) => {
        setEmail(e.target.value)
    }

    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value)
    }

    const checkError = (e) => {
        const inputFile = e.target.files[0];

        // Check the file extensions, if it not
        // included in the allowed extensions
        // we show the error
        const fileExtension = inputFile?.type.split("/")[1];
        if (!allowedExtensions.includes(fileExtension)) {
            setError("Please input a json file");
            return;
        }

        if (!inputFile) return setError("Enter a valid file");
    }



    const sourceJsonFileReader = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log(e.target.result);
            setSourceJSON(e.target.result);
        };
    }

    const sourceJsonFileUploadHandler = (e) => {
        setError("");
        // Check if user has entered the file
        if (e.target.files.length) {
            checkError(e);
            sourceJsonFileReader(e);
        }

    };

    const sourceJsonButtonHandler = () => {
        setSourceJsonButton(true);
    }

    const sourceJsonTextChangeHandler = (e) => {
        setSourceJSON(e.target.value);
    }



    const targetJsonFileReader = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log(e.target.result);
            setTargetJSON(e.target.result);
        };
    }

    const targetJsonFileUploadHandler = (e) => {
        setError("");
        // Check if user has entered the file
        if (e.target.files.length) {
            checkError(e);
            targetJsonFileReader(e);
        }

    };

    const targetJsonButtonHandler = () => {
        setTargetJsonButton(true);
    }

    const targetJsonTextChangeHandler = (e) => {
        setTargetJSON(e.target.value);
    }



    const mappingJsonFileReader = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log(e.target.result);
            setMappingJSON(e.target.result);
        };
    }

    const mappingJsonFileUploadHandler = (e) => {
        setError("");
        // Check if user has entered the file
        if (e.target.files.length) {
            checkError(e);
            mappingJsonFileReader(e);
        }

    };

    const mappingJsonButtonHandler = () => {
        setMappingJsonButton(true);
    }

    const mappingJsonTextChangeHandler = (e) => {
        setMappingJSON(e.target.value);
    }


    let res = {};
    
    const submitHandler = () => {
        // console.log(isJsonString(files))
        let sourceJsonData = isJsonString(sourceJSON) ? JSON.parse(sourceJSON) : {};
        let targetJsonData = isJsonString(targetJSON) ? JSON.parse(targetJSON) : {};
        let mappingJsonData = isJsonString(mappingJSON) ? JSON.parse(mappingJSON) : {};

        res["name"]=name;
        res["email"]=email;
        res["description"]=description;
        res["input"]=sourceJsonData;
        res["output"]=targetJsonData;
        res["mapping"]=mappingJsonData;

        console.log(JSON.stringify(res));
        axios.post('https://fc09-14-139-234-179.ngrok.io/generate', { "Accept": "application/json", "Content-Type": "application/json" }, JSON.stringify(res))
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    

    return (
        <>
            {(
                <div className={"box"}>
                    <div className={"formStyle"}>
                        <Form className={"formItems"}>

                            <Form.Control type="text" placeholder="Name" value={name} onChange={nameChangeHandler} />
                            <br></br><br></br>
                            <Form.Control type="text" placeholder="Email" value={email} onChange={emailChangeHandler} />
                            <br></br><br></br>
                            <Form.Control type="text" placeholder="Description" value={description} onChange={descriptionChangeHandler} />
                            <br></br><br></br>
                            
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Enter Source JSON</Form.Label>
                                {/* {console.log(data)} */}
                                <Form.Control as="textarea" rows={6} value={sourceJSON} onChange={sourceJsonTextChangeHandler} />
                            </Form.Group>
                            {sourceJsonButton ? <Form.Group controlId="formFile" className="mb-3" onChange={(e) => { sourceJsonFileUploadHandler(e) }}>
                                <Form.Label></Form.Label>
                                <Form.Control type="file" />
                                {error ? error : ""}
                            </Form.Group> : <Button onClick={sourceJsonButtonHandler}>Upload Source JSON</Button>}
                            <br></br><br></br>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Enter Target JSON</Form.Label>
                                <Form.Control as="textarea" rows={6} value={targetJSON} onChange={targetJsonTextChangeHandler} />
                            </Form.Group>
                            {targetJsonButton ? <Form.Group controlId="formFile" className="mb-3" onChange={(e) => { targetJsonFileUploadHandler(e) }}>
                                <Form.Label></Form.Label>
                                <Form.Control type="file" />
                                {error ? error : ""}
                            </Form.Group> : <Button onClick={targetJsonButtonHandler}>Upload Target JSON</Button>}
                            <br></br><br></br>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Enter Mapping JSON</Form.Label>
                                <Form.Control as="textarea" rows={6} value={mappingJSON} onChange={mappingJsonTextChangeHandler} />
                            </Form.Group>
                            {mappingJsonButton ? <Form.Group controlId="formFile" className="mb-3" onChange={(e) => { mappingJsonFileUploadHandler(e) }}>
                                <Form.Label></Form.Label>
                                <Form.Control type="file" />
                                {error ? error : ""}
                            </Form.Group> : <Button onClick={mappingJsonButtonHandler}>Upload Mapping JSON</Button>}
                            <br></br><br></br>


                            <Button variant="primary" type="button" onClick={submitHandler}>
                                Submit
                            </Button>

                        </Form>
                    </div>
                </div>
            )}
        </>
    );
};
export default CodeGenerator;


