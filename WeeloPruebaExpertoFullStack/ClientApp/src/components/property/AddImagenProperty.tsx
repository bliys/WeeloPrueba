import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../store";
import * as AddImaenPropertyStore from "../../store/AddImagenPropStore";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import "./Property.css";
import { Link } from "react-router-dom";

type ImagenAddPropertyProps = AddImaenPropertyStore.AddImagenPropertyState &
  typeof AddImaenPropertyStore.actionCreators &
  RouteComponentProps<{ index: string }>;

interface IState {
  images: File[];
  idProperty: number;
}

class AddImagenProperty extends React.PureComponent<ImagenAddPropertyProps> {
  state: Readonly<IState> = {
    images: [],
    idProperty: 0,
  };

  public componentDidMount() {
    this.loadData();
  }

  constructor(props: ImagenAddPropertyProps) {
    super(props);
  }

  public onFileChange = (e: any) => {
    if(e.target.files){
        for (let index = 0; index < e.target.files.length; index++) {
            const file = e.target.files[index];
            this.setState({ images: [...this.state.images, file] });
            this.props.requestAddImage(file);
        }
    }    
  };

  public submitLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    /* if (!this.state.images.length || this.state.idProperty === 0) {
      return;
    } */

    /* const formData = new FormData();

    formData.append(
      "files",
      this.state.images[0],
      this.state.images[0].name
    );

    // Details of the uploaded file
    console.log(this.state.images); */
    
    this.props.requestSaveImages(this.props.images);

    if (this.props.success) {
      this.clearData();
    }
  };

  public handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  private loadData() {
    const index = parseInt(this.props.match.params.index);
    this.props.requestLoadImages(index);
  }

  private clearData() {
    this.setState({
      Name: "",
      Address: "",
      Price: 0,
      CodeInternal: 0,
      Year: 0,
      IdOwner: 0,
    });
  }

  public render() {
    return (
      <React.Fragment>
        <h1>Add images property</h1>
        <br />
        <Form className="margin-2" onSubmit={this.submitLogin}>
          <FormGroup>
            <Label for="exampleFile">File</Label>
            <Input
              type="file"
              name="file"
              id="exampleFile"
              accept="image/png, image/jpeg"
              multiple
              onChange={this.onFileChange}
            />
            <FormText color="muted">
              This is some placeholder block-level help text for the above
              input. It's a bit lighter and easily wraps to a new line.
            </FormText>
          </FormGroup>

          <Row form className="row-reverse">
            <Col md={3}>
              <Button type="submit" className="btn btn-weelo">
                Save
              </Button>
            </Col>
          </Row>
        </Form>

        <div className="margin-2">
          <h1 className="TitlePropertiesImages">Property list</h1>
          <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
              <tr>
                <th>IdProperty</th>
                <th>Name</th>
                <th>Address</th>
                <th>Price</th>
                <th>CodeInternal</th>
                <th>Year</th>
                <th>IdOwner</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.property,
  AddImaenPropertyStore.actionCreators
)(AddImagenProperty as any);

/* import axios from "axios";

import React, { Component } from "react";

class App extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    axios.post("api/uploadfile", formData);
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h1>GeeksforGeeks</h1>
        <h3>File Upload using React!</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>Upload!</button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default App;
 */