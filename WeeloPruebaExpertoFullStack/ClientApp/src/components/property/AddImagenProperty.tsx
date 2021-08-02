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
import { AuthRequestFormInfo, AuthRequestInfo, executeReq } from "../../common/Request";

type ImagenAddPropertyProps = AddImaenPropertyStore.AddImagenPropertyState &
  typeof AddImaenPropertyStore.actionCreators &
  RouteComponentProps<{ index: string }>;

interface IState {
  idProperty: number;
}

class AddImagenProperty extends React.PureComponent<ImagenAddPropertyProps> {
  state: Readonly<IState> = {
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
          /* var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function(e) {
              var img = $('#image_preview');
              img.attr('src', this.result);
          } */
          this.props.requestAddImage(file);       
      }
      e.target.value='';
    }    
  };

  public submitLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if(this.props.images){
      this.props.requestSaveImages(this.props.images)      
    }  
  };

  public handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  private loadData() {
    const index = parseInt(this.props.match.params.index);
    this.props.requestLoadImages(index);
  }

  public render() {
    return (
      <React.Fragment>
        <h1>Add images property</h1>
        <br />
        <Form className="margin-2">
          <FormGroup>
            <Label for="exampleFile">File</Label>
            <Input
              type="file"
              name="file"
              id="exampleFile"
              accept="image/*"
              multiple
              onChange={this.onFileChange}
            />
            <FormText color="muted">
              Please select the images for the prperty
            </FormText>
          </FormGroup>         
        </Form>

        <div className="margin-2">
          <h1 className="TitlePropertiesImages">Property list</h1>
          <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
              <tr>
                <th>Image</th>
                <th style={{width:100}}>Enable</th>
                <th style={{width:100}}>Options</th>
              </tr>
            </thead>
            <tbody>
              {this.props.images && this.props.images.map((img: any) =>  (
                <tr key={img['lastModified']}>
                    <td><img style={{width:100}} src={URL.createObjectURL(img)}/></td>
                    <td><input type="checkbox" value='1' /></td>
                    <td><Link className='btn btn-weelo btn-sm' to={`/removeImage/`+img['name']}>Remove</Link></td>
                </tr>)
              )}
            </tbody>
          </table>

          <Row form className="row-reverse">
            <Col md={3}>
              <Button type="button" onClick={this.submitLogin} className="btn btn-weelo">
                Save
              </Button>
            </Col>
          </Row>

        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.addImages,
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