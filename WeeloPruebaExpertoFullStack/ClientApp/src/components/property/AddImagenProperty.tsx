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
          const image:AddImaenPropertyStore.ImageET = {
            enable :true,
            file: file,
            fileurl :'',
            IdProperty: this.props.idProperty
          }
          this.props.requestAddImage(image);       
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
              {this.props.images && this.props.images.map((img: AddImaenPropertyStore.ImageET) =>  (
                <tr key={img.fileurl ? img.fileurl : img.file['lastModified']}>
                    <td><img style={{width:100}} src={img.fileurl ? img.fileurl : URL.createObjectURL(img.file)}/></td>
                    <td><input type="checkbox" value='1' /></td>
                    <td><Link className='btn btn-weelo btn-sm' to={`/removeImage/`}>Remove</Link></td>
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