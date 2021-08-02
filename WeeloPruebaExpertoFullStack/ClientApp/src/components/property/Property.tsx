import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../store";
import * as PropertyStore from "../../store/PropertyStore";
import { PropertyET } from "../../store/PropertyStore";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Property.css";
import { Link } from "react-router-dom";

type PropertyProps = PropertyStore.PropertyState &
  typeof PropertyStore.actionCreators &
  RouteComponentProps;

interface IState {
  Name: string;
  Address: string;
  Price: number;
  CodeInternal: string;
  Year: number;
  IdOwner: number;
}

class Property extends React.PureComponent<PropertyProps> {
  state: Readonly<IState> = {
    Name: "",
    Address: "",
    Price: 0,
    CodeInternal: "",
    Year: 0,
    IdOwner: 0,
  };

  public componentDidMount() {
    this.loadData();
  }

  constructor(props: PropertyProps) {
    super(props);
  }

  public buttonOptions = {
    text: "Register Property",
    type: "success",
    useSubmitBehavior: true,
  };

  public submitLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (
      this.state.Name.trim() === "" ||
      this.state.Address.trim() === "" ||
      this.state.Price === 0 ||
      this.state.CodeInternal === "" ||
      this.state.IdOwner === 0 ||
      this.state.Year === 0
    ) {
      return;
    }
    let property: PropertyET = {
      address: this.state.Address,
      codeInternal: this.state.CodeInternal,
      idOwner: this.state.IdOwner,
      name: this.state.Name,
      price: this.state.Price,
      year: this.state.Year,
      idProperty: 0,
    };
    this.props.requestCreateProperty(property);

    if (this.props.success) {
      this.clearData();
    }
  };

  public handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  private loadData() {
    this.props.requestLoadOwners();
    this.props.requestLoadListProperty(this.props.startDateIndex);
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
        <h1>Create property</h1>
        <br />
        <Form className="margin-2" onSubmit={this.submitLogin}>
          <FormGroup>
            <Label for="exampleAddress">Name</Label>
            <Input
              required
              className="input-login mb-4"
              type="text"
              name="Name"
              placeholder="Enter a Name"
              value={this.state.Name}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleAddress2">Address</Label>
            <Input
              required
              className="input-login"
              type="text"
              name="Address"
              placeholder="Adress"
              value={this.state.Address}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleCity">Owner</Label>
                <Input
                  required
                  type="select"
                  name="IdOwner"
                  id="Owner"
                  value={this.state.IdOwner}
                  onChange={this.handleInputChange}
                >
                  <option key={0} value="0">
                    Select option...
                  </option>

                  {this.props.owners &&
                    this.props.owners.map((owner: PropertyStore.OwnerET) => {
                      return (
                        <option
                          key={owner.idOwner + "_key"}
                          value={owner.idOwner}
                        >
                          {owner.name}
                        </option>
                      );
                    })}
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleCity">Price</Label>
                <Input
                  required
                  className="input-login"
                  type="number"
                  name="Price"
                  placeholder="Price"
                  value={this.state.Price}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleState">Code internal</Label>
                <Input
                  required
                  className="input-login"
                  type="text"
                  name="CodeInternal"
                  placeholder="Code internal"
                  value={this.state.CodeInternal}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleZip">Year</Label>
                <Input
                  required
                  className="input-login"
                  type="number"
                  name="Year"
                  maxLength={4}
                  placeholder="Year"
                  value={this.state.Year}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
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
            <tbody>
              {this.props.listProperty &&
                this.props.listProperty.map((property: PropertyStore.PropertyET) =>  (
                <tr key={property.idProperty}>
                    <td>{property.idProperty}</td>
                    <td>{property.name}</td>
                    <td>{property.address}</td>
                    <td>{property.price}</td>
                    <td>{property.codeInternal}</td>
                    <td>{property.year}</td>
                    <td>{property.idOwner}</td>
                    {/* <td><button className="btn btn-weelo">Add images</button></td> */}
                    <td><Link className='btn btn-weelo btn-sm' to={`/addimages/${property.idProperty}`}>Next</Link></td>

                </tr>
                )
              )}
            </tbody>
          </table>
          {this.renderPagination()}
        </div>
      </React.Fragment>
    );
  }

  private renderPagination() {
    const prevStartDateIndex = this.props.startDateIndex > 0 ? (this.props.startDateIndex || 0) - 5: 0;
    const nextStartDateIndex = (this.props.startDateIndex || 0) + 5;

    return (
      <div className="d-flex justify-content-between">
        <button className='btn btn-outline-secondary btn-sm w-100px' onClick={()=>this.props.requestLoadListProperty(prevStartDateIndex)}>Previous</button>
        {this.props.isLoading && <span>Loading...</span>}
        <button className='btn btn-outline-secondary btn-sm w-100px' onClick={()=>this.props.requestLoadListProperty(nextStartDateIndex)}>Next</button>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.property,
  PropertyStore.actionCreators
)(Property as any);
