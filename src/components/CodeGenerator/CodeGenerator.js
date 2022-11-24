import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Papa from "papaparse";
import "./CodeGenerator.css";

const allowedExtensions = ["csv", "json"];

const CodeGenerator = () => {

    const [uploadButton, setUploadButton] = useState(false);

    // This state will store the parsed data
    const [data, setData] = useState([]);
    // this state will contain the error when correct file extension is not used
    const [error, setError] = useState("");
    // It will store the file uploaded by the user
    const [text, setText] = useState("");

    useEffect(() => {
        fileChangeHandler();
    }, [data]);



    // This function will be called when
    // the file input changes
    const fileUploadHandler = (e) => {
        setError("");
        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];

            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }

            // If input type is correct set the state
            // setFile(inputFile);


            if (!inputFile) return setError("Enter a valid file");

            // Initialize a reader which allows user
            // to read any file or blob.
            const reader = new FileReader();

            // Event listener on reader when the file
            // loads, we parse it and set the data.
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, { header: true });
                const parsedData = csv?.data;
                console.log(parsedData)
                const columns = (parsedData);
                setData(columns);
            };
            console.log(data)
            reader.readAsText(inputFile);
        }

    };


    const uploadJSONHandler = () => {
        setUploadButton(true);
    }

    const fileChangeHandler = () => {
        console.log(data)
        const t =  data.map((key, idx) => {
            console.log(key)
            const r = Object.keys(key).map((row, idx) => {
                console.log(key[row])
                return key[row]
            })
            // console.log(r.toString())
            return r.toString()+"\n"
        })
        let temp="";
        console.log(t);
        t.map((key,idx) => {
            temp=temp+key;
        })
        console.log(temp);
        setText(temp);
        

        // return temp;
    }

    const textareaChangeHandler = (e) => {
        setText(e.target.value);
    }

    return (
        <>
            {(
                <div className={"box"}>
                    <div className={"formStyle"}>
                        <Form className={"formItems"}>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Enter CSV</Form.Label>
                                {/* {console.log(data)} */}
                                <Form.Control as="textarea" rows={6} value={text} onChange={textareaChangeHandler} />
                            </Form.Group>

                            <Button onClick={uploadJSONHandler}>Upload CSV</Button>
                            {uploadButton ? <Form.Group controlId="formFile" className="mb-3" onChange={(e) => { fileUploadHandler(e) }}>
                                <Form.Label></Form.Label>
                                <Form.Control type="file" onChange={fileChangeHandler} />
                                {/* <button onClick={handleParse}>Upload!</button> */}
                                {error ? error : ""}
                            </Form.Group> : <></>}

                            <br></br><br></br>
                            <Button variant="primary" type="submit">
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


// import React from 'react';
// import { post } from 'axios';
// import { useEffect } from 'react';

// const Contact = (props) => {

//     useEffect(() => {
//         window.location.href = 'create-bot-step3';
//     }, []);

//     return (
//         <div>
//             <h2></h2>
//         </div>
//     );
// }

// class CodeGenerator extends React.Component {

//     constructor(props){
//         super(props);
//         this.state = {
//             file: null,
//             formSubmitted: false,
//         };
//         this.onFormSubmit = this.onFormSubmit.bind(this);
//         this.onChange = this.onChange.bind(this);
//         this.fileUpload = this.fileUpload.bind(this);
//     }

//     onFormSubmit(e){
//         e.preventDefault();
//         this.fileUpload(this.state.file).then((response)=>{
//           if(response.status == "200"){
//             this.setState(() => {
//                 return {
//                     formSubmitted: true,
//                 };
//             });
//           }
//         })
//     }

//     fileUpload(file){
//         const url = "http://localhost:8081/user/" + this.props.userID + "/projects/" + this.props.projectID + "/data";
//         const formData = new FormData();
//         formData.append('file',file)
//         const config = {
//             headers: {
//                 Authorization: "Bearer " + this.props.jwt_token,
//             }
//         }
//         // return  post(url, formData, config);
//     }

//     onChange(e) {
//         this.setState({file: e.target.files[0]});
//     }

//     render() {
//         return (
//             <div>
//                 {this.state.formSubmitted ? (
//                     <Contact></Contact>
//                 )
//                 : (
//                     <div className='main'>
//                         <div className='form'>
//                             <form onSubmit={this.onFormSubmit}>
//                                 <div className='fileUpload'>
//                                     <label>
//                                         <span>Upload:</span>
//                                         <input type='file' name='fileUpload' onChange={this.onChange}></input>
//                                     </label>
//                                 </div>
//                                 <div className='help_text'>
//                                     <p>Please note:</p>
//                                     <p>The structure of your json file should be like </p>
//                                     <img src='./images/example.png' alt='image here'></img>
//                                     <p style={{marginTop: '10px'}}>Your JSON file should be less than 5 MB.</p>
//                                     <p>For better results, make sure that the questions belong to a specific domain.</p>
//                                     <p>Number of question answer pairs in the json should be large to get better performance</p>
//                                 </div>
//                                 <button className="button" style={{top: '23px'}}>Next</button>
//                             </form>
//                         </div>
//                         <img src='https://www.ramco.com/hubfs/chatbot.gif' alt='gif here'></img>
//                     </div>
//                 )}
//             </div>
//         );
//     }
// }

// export default CodeGenerator;